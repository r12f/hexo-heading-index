'use strict';

(function() {
    // The user heading style is a list with each element formatted as "<prefix>{style:format:padding}<suffix>" and connected with ' '.
    // For example: 0x{0:x:2} 0x{0:x:1}
    function parseUserHeadingStyles(rawUserHeadingStyles) {
        var userHeadingStyles = rawUserHeadingStyles.split(' ').reduce((styles, rawStyle) => {
            var style = parseUserHeadingStyle(rawStyle);
            styles.push(style);
            return styles;
        }, []);

        return userHeadingStyles;
    }

    function parseUserHeadingStyle(rawStyle) {
        var style = { prefix: '', suffix: '', style: null, format: null, padding: 0 };

        var styleBracedPartStartIndex = -1;
        var styleBracedPartEndIndex = -1;

        var startBraceSeqStartIndex = -1;
        var startBraceSeqEndIndex = -1;
        var endBraceSeqStartIndex = -1;
        var endBraceSeqEndIndex = -1;

        for (var i = 0; i < rawStyle.length; ++i) {
            if (rawStyle[i] !== '{') {
                if (startBraceSeqEndIndex !== -1) {
                    if ((startBraceSeqEndIndex - startBraceSeqStartIndex + 1) % 2 === 1) {
                        if (styleBracedPartStartIndex !== -1) {
                            throw "Multiple brace start in a single heading style have been found.";
                        }
                        styleBracedPartStartIndex = startBraceSeqEndIndex;
                    }
                    startBraceSeqStartIndex = -1;
                    startBraceSeqEndIndex = -1;
                }
            }

            if (rawStyle[i] !== '}') {
                if (endBraceSeqEndIndex !== -1) {
                    if ((endBraceSeqEndIndex - endBraceSeqStartIndex + 1) % 2 === 1) {
                        if (styleBracedPartEndIndex !== -1) {
                            throw "Multiple brace end in a single heading style have been found";
                        }
                        styleBracedPartEndIndex = endBraceSeqStartIndex;
                    }
                    endBraceSeqStartIndex = -1;
                    endBraceSeqEndIndex = -1;
                }
            }

            switch (rawStyle[i]) {
                case '{':
                    if (startBraceSeqStartIndex === -1) {
                        startBraceSeqStartIndex = i;
                    }
                    startBraceSeqEndIndex = i;
                    break;
                case '}':
                    if (endBraceSeqStartIndex === -1) {
                        endBraceSeqStartIndex = i;
                    }
                    endBraceSeqEndIndex = i;
                    break;
            }
        }

        // If we ends with the end brace, we need to check it again.
        if (endBraceSeqEndIndex !== -1) {
            if ((endBraceSeqEndIndex - endBraceSeqStartIndex + 1) % 2 === 1) {
                styleBracedPartEndIndex = endBraceSeqStartIndex;
            }
        }

        // No end has been found or no start has been found.
        if (styleBracedPartStartIndex === -1 || styleBracedPartEndIndex === -1) {
            // If we didn't find the braced part, return the rawStyle as prefix.
            style.prefix = rawStyle.replace(/{{/g, '{').replace(/}}/g, '}');
            return style;
        }

        // Style found, parse it and treat everything else as prefix and suffix.
        parseUserHeadingStyleBracedPart(style, rawStyle.slice(styleBracedPartStartIndex + 1, styleBracedPartEndIndex));

        if (styleBracedPartStartIndex > 0) {
            style.prefix = rawStyle.slice(0, styleBracedPartStartIndex).replace(/{{/g, '{').replace(/}}/g, '}');
        }
        style.suffix = rawStyle.slice(styleBracedPartEndIndex + 1).replace(/{{/g, '{').replace(/}}/g, '}');

        return style;
    }

    function parseUserHeadingStyleBracedPart(style, part) {
        var bracedPartElements = part.split(':');
        style.style = bracedPartElements[0];
        style.format = bracedPartElements.length >= 2 ? bracedPartElements[1] : null;
        style.padding = bracedPartElements.length >= 3 ? parseInt(bracedPartElements[2]) : 0;
    }

    module.exports = {
        'parse' : parseUserHeadingStyles
    };
})();
