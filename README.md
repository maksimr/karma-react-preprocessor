# karma-react-preprocessor

[![Build Status](https://travis-ci.org/maksimr/karma-react-preprocessor.png?branch=master)](https://travis-ci.org/maksimr/karma-react-preprocessor)

> Preprocessor for react jsx files

## Installation

The easiest way is to keep `karma-react-preprocessor` as a devDependency in your `package.json`.
```json
{
  "devDependencies": {
    "karma": "~0.10",
    "karma-react-preprocessor": "~0.1"
  }
}
```

You can simple do it by:
```bash
npm install karma-react-preprocessor --save-dev
```

## Configuration
Following code shows the default configuration...
```js
// karma.conf.js
module.exports = function(config) {
  config.set({
    preprocessors: {
      '**/*.jsx': ['react']
    }
  });
};
```

By default preprocessor transform extension from jsx to js.
You can change it by:
```js
// karma.conf.js
module.exports = function(config) {
  config.set({
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
```

You can enable ES6 features by setting harmony option to true:
```js
// karma.conf.js
module.exports = function(config) {
  config.set({
    preprocessors: {
      '**/*.jsx': ['react']
    },
    reactPreprocessor: {
        harmony: true
    }
  });
};
```

You can look at karma.conf.js how example

For more information on Karma see the [homepage].

[homepage]: http://karma-runner.github.com
