var chai = require('chai');
var proxyquire = require('proxyquire');
var expect = chai.expect;
var ReactPreprocessor = require("../../index.js")['preprocessor:react'][1];
var FileMock = function(originalPath) {
    this.originalPath = originalPath;
    this.path = originalPath;
};
var LoggerMock = function() {
    this.create = function() {
        return {
            debug: function() {}
        };
    };
};
var ReactToolsMock = {
    transform: function(content, options) {
        this.options = options;
    }
};

describe('hello-message', function() {
    beforeEach(function() {
        this.preprocessor = new ReactPreprocessor({}, {}, new LoggerMock());
    });

    it('should export preprocessor', function() {
        expect(ReactPreprocessor).to.be.a('function');
    });

    it('should transform react file', function() {
        var file = new FileMock('test.jsx');

        this.preprocessor('/** @jsx React.DOM */ <div>Test</div>;', file, function(content) {
            expect(content).to.be.equal('/** @jsx React.DOM */ React.createElement("div", null, "Test");');
        });
    });

    it('should replace extension jsx on js by default', function() {
        var file = new FileMock('test.jsx');

        this.preprocessor('', file, function() {});

        expect(file.path).to.be.equal('test.js');
    });

    it('should use custom function for transform path', function() {
        var file = new FileMock('test.jsx');
        this.preprocessor = new ReactPreprocessor({}, {
            transformPath: function(path) {
                return path.replace(/\.jsx$/, '.ext');
            }
        }, new LoggerMock());

        this.preprocessor('', file, function() {});

        expect(file.path).to.be.equal('test.ext');
    });

    it('should allow to pass harmony option', function() {
        var file = new FileMock('test.jsx');
        this.preprocessor = new ReactPreprocessor({}, {
            harmony: true,
        }, new LoggerMock());

        this.preprocessor('<div onClick={e => alert(e)} />', file, function(content) {
            expect(content).to.be.equal('React.createElement("div", {onClick: (function(e)  {return alert(e);})})');
        });
    });

    it('should pass options object to react-tools', function() {
        var expectedOptions = {
            harmony: true,
            es6module: true
        };
        var file = new FileMock('test.jsx');
        var ReactPreprocessor = proxyquire("../../index.js", {
            'react-tools': ReactToolsMock
        })['preprocessor:react'][1];

        this.preprocessor = new ReactPreprocessor({}, expectedOptions, new LoggerMock());

        this.preprocessor('<div onClick={e => alert(e)} />', file, function() {
            expect(ReactToolsMock.options).to.be.equal(expectedOptions);
        });
    });
});
