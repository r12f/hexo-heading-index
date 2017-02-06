'use strict';

var assert = require('assert');
var headingStyleParser = require('../lib/heading-style-parser');

describe('Testing user heading style definition parser', function() {
    it('#Single level 0-start number heading', function() {
        var style = "{0}";
        var expected = [{ prefix: '', suffix: '', style: '0', format: null, padding: 0 }];
        assert.deepStrictEqual(headingStyleParser.parse(style), expected);
    });

    it('#Single level 0-start hex number heading', function() {
        var style = "{0:x}";
        var expected = [{ prefix: '', suffix: '', style: '0', format: 'x', padding: 0 }];
        assert.deepStrictEqual(headingStyleParser.parse(style), expected);
    });

    it('#Single level number heading', function() {
        var style = "{1}";
        var expected = [{ prefix: '', suffix: '', style: '1', format: null, padding: 0 }];
        assert.deepStrictEqual(headingStyleParser.parse(style), expected);
    });

    it('#Single level hex number heading', function() {
        var style = "{1:x}";
        var expected = [{ prefix: '', suffix: '', style: '1', format: 'x', padding: 0 }];
        assert.deepStrictEqual(headingStyleParser.parse(style), expected);
    });

    it('#Single level alphabet heading', function() {
        var style = "{a}";
        var expected = [{ prefix: '', suffix: '', style: 'a', format: null, padding: 0 }];
        assert.deepStrictEqual(headingStyleParser.parse(style), expected);
    });

    it('#Single level 0-start number heading with prefix', function() {
        var style = "0x{0}";
        var expected = [{ prefix: '0x', suffix: '', style: '0', format: null, padding: 0 }];
        assert.deepStrictEqual(headingStyleParser.parse(style), expected);
    });

    it('#Single level 0-start number heading with suffix', function() {
        var style = "{0}!";
        var expected = [{ prefix: '', suffix: '!', style: '0', format: null, padding: 0 }];
        assert.deepStrictEqual(headingStyleParser.parse(style), expected);
    });

    it('#2 levels headings', function() {
        var style = "{a} {i}";
        var expected = [
            { prefix: '', suffix: '', style: 'a', format: null, padding: 0 },
            { prefix: '', suffix: '', style: 'i', format: null, padding: 0 }
        ];
        assert.deepStrictEqual(headingStyleParser.parse(style), expected);
    });

    it('#3 levels headings', function() {
        var style = "{a} {i} {0}";
        var expected = [
            { prefix: '', suffix: '', style: 'a', format: null, padding: 0 },
            { prefix: '', suffix: '', style: 'i', format: null, padding: 0 },
            { prefix: '', suffix: '', style: '0', format: null, padding: 0 }
        ];
        assert.deepStrictEqual(headingStyleParser.parse(style), expected);
    });

    it('#4 levels headings', function() {
        var style = "{a} {i} {0} {1}";
        var expected = [
            { prefix: '', suffix: '', style: 'a', format: null, padding: 0 },
            { prefix: '', suffix: '', style: 'i', format: null, padding: 0 },
            { prefix: '', suffix: '', style: '0', format: null, padding: 0 },
            { prefix: '', suffix: '', style: '1', format: null, padding: 0 }
        ];
        assert.deepStrictEqual(headingStyleParser.parse(style), expected);
    });

    it('#5 levels headings', function() {
        var style = "{a} {i} {0} {1} {A}";
        var expected = [
            { prefix: '', suffix: '', style: 'a', format: null, padding: 0 },
            { prefix: '', suffix: '', style: 'i', format: null, padding: 0 },
            { prefix: '', suffix: '', style: '0', format: null, padding: 0 },
            { prefix: '', suffix: '', style: '1', format: null, padding: 0 },
            { prefix: '', suffix: '', style: 'A', format: null, padding: 0 }
        ];
        assert.deepStrictEqual(headingStyleParser.parse(style), expected);
    });

    it('#6 levels headings', function() {
        var style = "{a} {i} {0} {1} {A} {I}";
        var expected = [
            { prefix: '', suffix: '', style: 'a', format: null, padding: 0 },
            { prefix: '', suffix: '', style: 'i', format: null, padding: 0 },
            { prefix: '', suffix: '', style: '0', format: null, padding: 0 },
            { prefix: '', suffix: '', style: '1', format: null, padding: 0 },
            { prefix: '', suffix: '', style: 'A', format: null, padding: 0 },
            { prefix: '', suffix: '', style: 'I', format: null, padding: 0 }
        ];
        assert.deepStrictEqual(headingStyleParser.parse(style), expected);
    });

    it('#Complex headings', function() {
        var style = "0x{0:x:2} 0x{1:x:1} {a}) {i}. ={A}= {{{I}}}";
        var expected = [
            { prefix: '0x', suffix: '', style: '0', format: 'x', padding: 2 },
            { prefix: '0x', suffix: '', style: '1', format: 'x', padding: 1 },
            { prefix: '', suffix: ')', style: 'a', format: null, padding: 0 },
            { prefix: '', suffix: '.', style: 'i', format: null, padding: 0 },
            { prefix: '=', suffix: '=', style: 'A', format: null, padding: 0 },
            { prefix: '{', suffix: '}', style: 'I', format: null, padding: 0 }
        ];
        assert.deepStrictEqual(headingStyleParser.parse(style), expected);
    });

    it('#Invalid start brace in headings 1', function() {
        var style = "{{0}";
        var expected = [{ prefix: '{0}', suffix: '', style: null, format: null, padding: 0 }];
        assert.deepStrictEqual(headingStyleParser.parse(style), expected);
    });

    it('#Invalid start brace in headings 2', function() {
        var style = "{{{{0}";
        var expected = [{ prefix: '{{0}', suffix: '', style: null, format: null, padding: 0 }];
        assert.deepStrictEqual(headingStyleParser.parse(style), expected);
    });

    it('#Invalid start brace in headings 3', function() {
        var style = "{{{";
        var expected = [{ prefix: '{{', suffix: '', style: null, format: null, padding: 0 }];
        assert.deepStrictEqual(headingStyleParser.parse(style), expected);
    });

    it('#Invalid start brace in headings 4', function() {
        var style = "{{{}";
        var expected = [{ prefix: '{', suffix: '', style: "", format: null, padding: 0 }];
        assert.deepStrictEqual(headingStyleParser.parse(style), expected);
    });

    it('#Invalid end brace in headings 1', function() {
        var style = "{0}}";
        var expected = [{ prefix: '{0}', suffix: '', style: null, format: null, padding: 0 }];
        assert.deepStrictEqual(headingStyleParser.parse(style), expected);
    });

    it('#Invalid end brace in headings 2', function() {
        var style = "{0}}}}";
        var expected = [{ prefix: '{0}}', suffix: '', style: null, format: null, padding: 0 }];
        assert.deepStrictEqual(headingStyleParser.parse(style), expected);
    });

    it('#Invalid end brace in headings 3', function() {
        var style = "}}}";
        var expected = [{ prefix: '}}', suffix: '', style: null, format: null, padding: 0 }];
        assert.deepStrictEqual(headingStyleParser.parse(style), expected);
    });

    it('#Invalid end brace in headings 4', function() {
        var style = "{}}}";
        var expected = [{ prefix: '', suffix: '}', style: "", format: null, padding: 0 }];
        assert.deepStrictEqual(headingStyleParser.parse(style), expected);
    });

    it('#Invalid brace in headings 1', function() {
        var style = "}{";
        var expected = [{ prefix: '}{', suffix: '', style: null, format: null, padding: 0 }];
        assert.deepStrictEqual(headingStyleParser.parse(style), expected);
    });

    it('#Invalid brace in headings 2', function() {
        var style = "}{}";
        var expected = [{ prefix: '}', suffix: '', style: '', format: null, padding: 0 }];
        assert.deepStrictEqual(headingStyleParser.parse(style), expected);
    });
});
