import glob from 'glob';
import path from 'path';

export const collectComponentDocs = async componentRootPath => {
    return new Promise((resolve, reject) => {
        glob(path.join(componentRootPath, '**/*.md'), (error, files) => {
            if (error) return reject(error);
            resolve(files);
        });
    });
};