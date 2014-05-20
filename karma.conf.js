module.exports = function(config) {
    config.set({
        files: [
            'test/*.jsx',
            'test/*.js',
        ],
        plugins: [
            'karma-*',
            require('./index.js')
        ],
        preprocessors: {
            '**/*.jsx': ['react']
        },
        reactPreprocessor: {
            transformPath: function(path) {
                return path.replace(/\.jsx$/, '.js');
            }
        }
    });
};
