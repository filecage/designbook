import webpack from 'webpack';
import { createFsFromVolume, Volume } from 'memfs';
import path from 'path';
import VirtualModulesPlugin from 'webpack-virtual-modules';

export const webpackCompile = async (entrypoint, webpackConfig) => {
    // Entrypoint will be overwritten here
    webpackConfig.entry = entrypoint;
    webpackConfig.output = {
        path: '/dist',
        publicPath: '/public',
        filename: 'compiled.js'
    }

    const fs = createFsFromVolume(new Volume());
    const compiler = webpack(webpackConfig);
    compiler.outputFileSystem = fs;

    return new Promise((resolve, reject) => {
        compiler.run((error, stats) => {
            if (error) return reject(error);

             resolve(fs.readFileSync('/dist/compiled.js', 'utf8'));
        });
    });
};

export default async (fs, webpackConfig, componentRoot, fragment, chunk) => {
    const entry = path.resolve(path.join(componentRoot, fragment.name + '.js'));

    const injectedModules = {};
    injectedModules[entry] = chunk;

    // Rewrite config so we'll find our compiled files again
    const config = {
        entry,
        output: {
            path: '/',
            publicPath: '/static',
            filename: fragment.name + '.js'
        },
        plugins: [
            new VirtualModulesPlugin(injectedModules)
        ]
    };

    const compiler = webpack(Object.assign({}, webpackConfig, config));
    compiler.outputFileSystem = fs;

    return new Promise((resolve, reject) => {
        compiler.run((error, stats) => {
            if (error) return reject(error);

            // TODO: Beautiful log output for stats.compilation.errors and stats.compiliation.warnings
            stats.compilation.errors.forEach(error => {
                console.error('!!! ERROR at JSX compilation !!!');
                console.error(error);
            });

            stats.compilation.warnings.forEach(warning => {
                console.warn(warning);
            });

            resolve();
        })
    });
}