const { readFileSync } = require('fs');

const lambdaCache = {};

const getContent = (path) => {
    if (lambdaCache[path]) return lambdaCache[path].data;
    try {
        const data = readFileSync(path, 'utf-8');
        lambdaCache[path] = { data };
        return data;
    } catch (err) {
        console.error(err);
        lambdaCache[path] = { data: '' };
        return '';
    }
};

module.exports = { getContent };
