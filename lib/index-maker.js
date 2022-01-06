'use strict';

module.exports = {
    makeNumberIndex : function (num, format, padding) {
        var index = '';

        switch (format) {
            case 'x':
                index = num.toString(16);
                break;
            case 'X':
                index = num.toString(16).toUpperCase();
                break;
            default:
                index = num.toString();
        }

        var indexLength = index.length;
        if (indexLength < padding) {
            var indexPadding = '0'.repeat(padding - indexLength);
            index = indexPadding + index;
        }

        return index;
    },

    // JavaScript Roman Numeral Converter (Thanks to Steven Levithan @slevithan)
    // http://blog.stevenlevithan.com/archives/javascript-roman-numeral-converter
    makeRomanNumeralIndex : function (num, uppercase) {
        var	digits = String(+num).split(""),
        key = ["","c","cc","ccc","cd","d","dc","dcc","dccc","cm",
        "","x","xx","xxx","xl","l","lx","lxx","lxxx","xc",
        "","i","ii","iii","iv","v","vi","vii","viii","ix"],
        roman = "",
        i = 3;
        while (i--)
            roman = (key[+digits.pop() + (i * 10)] || "") + roman;

        var index = Array(+digits.join("") + 1).join("m") + roman;
        return uppercase ? index.toUpperCase() : index;
    },

    makeLetterIndex : function (num, uppercase) {
        var letters = "abcdefghijklmnopqrstuvwxyz";
        if (num >= 26) {
            num = 25;
        }

        var index = letters.slice(num, num + 1);
        return uppercase ? index.toUpperCase() : index;
    }
};

