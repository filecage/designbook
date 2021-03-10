import webpackConfig from './example-app/webpack-local.js';
import {createFsFromVolume, Volume} from 'memfs';
import {collectComponentDocs} from './src/server/Helper/collector.js';
import {parse} from './src/server/Helper/parser.js';
import http from './src/server/Http/http.js';
import Compiler from './src/server/Compiler/Compiler.js';
import JSXCompiler from './src/server/Compiler/JSX/JSXCompiler.js';
import assemble from './src/server/Helper/assemble.js';
import Doc from './src/server/Doc.js';
import DocContainer from './src/server/DocContainer.js';

const files = await collectComponentDocs('./example-app');
const docs = [];
for (const file of files) {
    const fs = createFsFromVolume(new Volume());
    const component = await parse(file);
    const compiler = new Compiler(fs, new JSXCompiler('./', webpackConfig));

    fs.writeFileSync('/index.html', await assemble(compiler, component));

    docs.push(new Doc(component, fs));
}

http(new DocContainer(...docs));

