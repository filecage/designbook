import path from 'path';
import Subcompiler from "../Subcompiler.js";
import webpackCompile from './webpack-compile.js';
import {encode} from 'html-entities';

export default class JSXCompiler extends Subcompiler {
    #sourcesRoot;
    #webpackConfig;

    constructor (sourcesRoot, webpackConfig) {
        super();
        this.#sourcesRoot = sourcesRoot;
        this.#webpackConfig = webpackConfig;
    }

    /**
     * @param fs
     * @param {Component} component
     * @param {Fragment} fragment
     * @returns {Promise<unknown>}
     */
    async compile(fs, component, fragment) {
        const {prerequisites, jsx} = this.splitContent(fragment.content);
        const componentRoot = path.join(this.#sourcesRoot, component.rootPath);

        await webpackCompile(fs, this.#webpackConfig, componentRoot, fragment, this.assemble(fragment.type, prerequisites, jsx));

        fs.writeFileSync('/' + fragment.name + '.html', `<div id="app"></div> <script src="${fragment.name}.js"></script>`);

        return `
<h2>Usage</h2>
<pre><code>${encode(jsx)}</code></pre>
<h2>Example</h2>
<iframe src="${fragment.name}.html"></iframe>
`;
    }

    isApplicable(fragment) {
        return fragment.type.toLowerCase() === 'jsx';
    }

    splitContent (content) {
        const split = content.split('//---');
        if (split.length === 0) {
            return null;
        }

        return {
            prerequisites: split.length === 2 ? split[0].trim() : '',
            jsx: split.length === 2 ? split[1].trim() : split[0].trim()
        };
    }

    assemble (type, prerequisites, jsx) {
        return `
// required to render the example
import React from 'react';
import ReactDOM from 'react-dom';

// imported prerequisites
${prerequisites}

// jsx code wrapped in ReactDOM
ReactDOM.render(${jsx}, document.querySelector('#app'));
        `;


    }

}