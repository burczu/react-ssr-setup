const paths = require('../paths');

module.exports = {
    extensions: ['.js', '.mjs', '.json', '.jsx', '.css', '.ts', '.tsx'],
    modules: paths.resolveModules,
};
