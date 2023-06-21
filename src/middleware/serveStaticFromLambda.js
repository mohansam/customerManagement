const { getMimeType } = require('../util/getMimeTypes');
const { getFilePath } = require('../util/filePath');
const { getContent } = require('../util/getContent');

const DEFAULT_DOCUMENT = 'index.html';

const serveStatic = (options = { root: '' }) => {
    const staticFun = async (c, next) => {
        if (c.finalized) {
            await next();
            return;
        }
        const url = new URL(c.req.url);
        const filename = decodeURI(url.pathname);
        const path = getFilePath({ filename, root: options.root, defaultDocument: DEFAULT_DOCUMENT });
        const content = getContent(path);
        if (content) {
            const mimeType = getMimeType(path);
            if (mimeType) {
                c.header('Content-Type', mimeType);
            }
            // eslint-disable-next-line consistent-return
            return c.body(content);
        }
        console.warn(`Static file: ${path} is not found`);
        await next();
        // eslint-disable-next-line no-useless-return
        return;
    };
    return staticFun;
};

module.exports = { serveStatic };
