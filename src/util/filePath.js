const { join, resolve } = require('path');

const getFilePath = (options) => {
    let { filename } = options;
    const { root, defaultDocument } = options;
    if (filename === '/') filename = `${defaultDocument}`;
    filename = filename.replace(/^\.?\//, '');
    return join(resolve(root), filename);
};

module.exports = { getFilePath };
