/**
 * @desc Simple preprocessor file to run JSX over our source
 * and test files using react-tools when they're required
 */
var ReactPreprocessor = function(args, config, logger) {
    var log = logger.create('preprocessor.react');
    config = config || {};

    var transformPath = args.transformPath || config.transformPath || function(filepath) {
        return filepath.replace(/\.jsx$/, '.js');
    };

    return function(content, file, done) {
        log.debug('Processing "%s".', file.originalPath);
        file.path = transformPath(file.originalPath);

        done(require('react-tools').transform(content));
    };
};

ReactPreprocessor.$inject = ['args', 'config.reactPreprocessor', 'logger'];

module.exports = {
    'preprocessor:react': ['factory', ReactPreprocessor]
};
