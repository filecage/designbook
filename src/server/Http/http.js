import fastify from 'fastify';
import path from 'path';

function matchMime(document) {
    const extension = path.parse(document).ext;
    switch (extension.toLowerCase()) {
        case '.html':
            return 'text/html';

        default:
            return 'text/plain';
    }
}

/**
 * @param {DocContainer} docContainer
 * @returns {Promise<void>}
 */
export default async docContainer => {
    const http = fastify({logger: true});

    docContainer.docs.forEach(doc => {
        http.get('/docs/' + doc.route + '/*', async (request, response) => {
            let requestedDocument = request.url.substr(6 + doc.route.length);
            if (requestedDocument === '/') {
                requestedDocument = '/index.html';
            }

            return response.header('Content-Type', matchMime(requestedDocument))
                .send(doc.fs.readFileSync(requestedDocument));
        });
    });

    http.get('/docs/*', async (request, response) => {
        const requestedDocument = request.url.substr(5);

        try {
            return response
                .header('Content-Type', 'text/html')
                .send(fs.readFileSync('/designbook' + requestedDocument));
        } catch (e) {
            return e.message;
        }
    });

    // Run the server!
    const start = async () => {
        try {
            await http.listen(3000)
        } catch (err) {
            http.log.error(err);
            process.exit(1);
        }
    }

    return start();
}