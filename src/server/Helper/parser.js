import {promises as fs} from 'fs';
import path from 'path';
import crypto from 'crypto';
import MarkdownIt from 'markdown-it';
import Renderer from 'markdown-it/lib/renderer.js';
import Fragment from '../Fragment.js';
import Component from '../Component.js';

const md = MarkdownIt();
const renderer = new Renderer();

function transformTokens (tokens) {
    return tokens.map(token => {
        if (token.type !== 'fence' || token.tag !== 'code') {
            return renderer.render([token]);
        }

        const hash = crypto.createHash('sha1').update(token.content).digest('hex');

        return new Fragment(token.info, hash, token.content);
    });
}

export const parse = async file => {
    const fileparts = path.parse(file.replace(/\\/, '/'));
    const contents = await fs.readFile(file);
    const tokens = md.parse(contents.toString());

    return new Component(fileparts.name, fileparts.dir, transformTokens(tokens));
}