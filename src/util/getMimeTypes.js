const { lookup } = require('mime-types');

const getMimeType = (path) => lookup(path);

module.exports = { getMimeType };
