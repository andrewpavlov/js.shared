'use strict';

var utils = {
    /**
     * @name get
     * @param   {Object}        obj  The source object
     * @param   {String|Object} path Value path
     * @param   {*=}            def  The default value
     * @returns {*}
     * It return a value located by path in object
     * Otherwise it returns default
     * @description
     * Returns value in object by path
     * @example
     * <pre>
     * var obj = {
     *  'key1': {
     *   'key1-1': 'val-1'
     *  }
     * }
     * utils.get(obj, 'key1.key1-1');
     * out: 'val-1'
     * utils.get(obj, 'key1.key1-2', 'def-val');
     * out: 'def-val'
     * utils.get(obj, ['key2', 'key1-1'], 'def-val');
     * out: 'def-val'
     * </pre>
     */
    get: function (obj, path, def) {
        if (!path) {
            return utils.isset(obj) ? obj : def;
        }
        var propPath = typeof path === 'string' ? path.split(/[\.]/) : path,
            pInfo = obj || {},
            endLoop = propPath.length - 1;
        for (var loop = 0; loop < endLoop; loop++) {
            var prop = propPath[loop];
            if (!utils.isset(pInfo[prop])) {
                return def;
            }
            pInfo = pInfo[prop];
        }
        var fin = propPath[loop];
        return typeof pInfo[fin] === 'undefined' ? def : pInfo[fin];
    },

    /**
     * @name set
     * @param   {Object}        obj   The source object
     * @param   {String|Object} path  Value path
     * @param   {*}             value The value
     * @returns {Object} self
     * @description
     * It sets the value to the specified path in object
     * @example
     * <pre>
     * var obj = {};
     * utils.set(obj, 'key1.key1-1', 'val-1');
     * out:
     * var obj = {
     *  'key1': {
     *   'key1-1': 'val-1'
     *  }
     * }
     * </pre>
     */
    set: function (obj, path, value) {
        var propPath = typeof path === 'string' ? path.split(/[\.]/) : path;
        var pInfo = obj;
        for (var loop = 0; loop < propPath.length - 1; loop++) {
            var prop = propPath[loop];
            if (!utils.isset(pInfo[prop])) {
                pInfo[prop] = {};
            }
            pInfo = pInfo[prop];
        }
        pInfo[propPath[loop]] = value;
        return obj;
    },

    /**
     * @name empty
     * @param   {*}     val The value to check
     * @param   {*=}    def The default value
     * @returns {*}
     * In case def is defined it return val or def
     * Otherwise it returns true or false
     * @description
     * Check whether val is empty
     */
    empty: function (val, def) {
        var ret = false;
        if (!utils.isset(val)) {
            ret = true;
        } else if (!val) {
            ret = true;
        } else if (typeof val.length !== 'undefined') {
            if (!val.length) {
                ret = true;
            }
        } else if (typeof val === 'object') {
            ret = true;
            angular.forEach(val, function () {
                ret = false;
            });
        }
        if (typeof def !== 'undefined') {
            if (ret) {
                ret = def;
            } else {
                ret = val;
            }
        }
        return ret;
    },

    /**
     * @name isset
     * @param   {*}     val The value to check
     * @param   {*=}    def The default value
     * @returns {*}
     * In case def is defined it return val or def
     * Otherwise it returns true or false
     * @description
     * Check whether val is defined
     */
    isset: function (val, def) {
        if (typeof def !== 'undefined') {
            if ((typeof val === 'undefined') || (val === null)) {
                return def;
            }
            return val;
        }
        return !((typeof val === 'undefined') || (val === null));
    },

    /**
     * @name clear
     * @param {Object} obj Object
     * @description
     * Deletes all object's properties
     */
    clear: function (obj) {
        if (obj) {
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    delete obj[prop];
                }
            }
        }
    },

    /**
     * @name tickCount
     * @returns {Number}    Returns current time stamps in ms
     * @description
     * Gets current time stamp
     */
    tickCount: function () {
        var dt = new Date();
        return dt.getTime();
    },

    /**
     * @name uniqueId
     * @param   {String=}   prefix Prefix
     * @returns {String}    Unique identifier string
     * @description
     * Generates unique identifier
     */
    uniqueId: function (prefix) {
        prefix = utils.isset(prefix, '');
        return prefix + utils.tickCount() + Math.floor(Math.random() * Math.pow(10, 10));
    },

    /**
     * @name random
     * @param {Number}  min Min result value
     * @param {Number}  max Max result value
     * @returns {Number}
     * Random number
     * @description
     * Generates random value between max and min
     */
    random: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    /**
     * @name validEmail
     * @param   {String} email String to check
     * @returns {String}
     * Input string if valid otherwise null
     * @description
     * Check whether the specified string if valid email string
     */
    validEmail: function (email) {
        if (utils.empty(email)) {
            return null;
        }
        email = utils.trim(email);
        //var reg = /^([A-Za-z0-9_'\.\-])+\@([A-Za-z0-9_\.\-])+\.([A-Za-z]{2,4})$/;
        var reg1 = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (reg1.test(email)) {
            return email;
        }
        var reg2 = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (reg2.test(email)) {
            return email;
        }
        return null;
    },

    /**
     * @name validUrl
     * @param   {String} url String to check
     * @returns {String}
     * Input string if valid otherwise null
     * @description
     * Check whether the specified string if valid url string
     */
    validUrl: function (url) {
        if (utils.empty(url)) {
            return null;
        }
        url = utils.trim(url);
        var reg = /(file|ftp|http|https):\/\/(\w+:?\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@\-\/]))?/;
        return reg.test(url) === false ? null : url;
    },

    /**
     * @name validFilename
     * @param   {String}    fname String to check
     * @param   {Boolean=}  trim  Trim output string (true by default)
     * @returns {String}
     * Input string if valid otherwise null
     * @description
     * Check whether the specified string if valid filename string
     */
    validFilename: function (fname, trim) {
        if (utils.empty(fname)) {
            return null;
        }
        trim = utils.isset(trim, true);
        if (trim) {
            fname = utils.trim(fname);
        }
        if (utils.empty(fname)) {
            return null;
        }
        var reg = /[\\\/\:\*\?\"\<\>\|]/;
        return reg.test(fname) ? null : fname;
    },

    /**
     * @name trimLeft
     * @param   {String}    str The input string.
     * @param   {String=}   chr You can also specify the characters you want to strip.
     * @returns {String}
     * Returns the modified string.
     * @description
     * This function returns a string with whitespace stripped from the beginning of str.
     */
    trimLeft: function (str, chr) {
        chr = chr || '\\s';
        return str.replace(new RegExp('^[' + chr + ']+', 'g'), '');
    },

    /**
     * @name trimRight
     * @param   {String}    str The input string.
     * @param   {String=}   chr You can also specify the characters you want to strip.
     * @returns {String}
     * Returns the modified string.
     * @description
     * This function returns a string with whitespace stripped from the end of str.
     */
    trimRight: function (str, chr) {
        chr = chr || '\\s';
        return str.replace(new RegExp('[' + chr + ']+$', 'g'), '');
    },

    /**
     * @name trim
     * @param   {String}    str The string that will be trimmed.
     * @param   {String=}   chr You can also specify the characters you want to strip.
     * @returns {String}
     * Returns the modified string.
     * @description
     * This function returns a string with whitespace stripped from the beginning and end of str.
     */
    trim: function (str, chr) {
        return utils.trimLeft(utils.trimRight(str, chr), chr);
    },

    /**
     * @name appendSubString
     * @param {String}      str             The source string
     * @param {String}      pattern         The string to append
     * @param {String=}     separator       The string separator (space by default)
     * @param {Boolean=}    caseSens        Case sensitive comparison
     * @returns {String}
     * Returns the modified string.
     * @description
     * Checks whether the specified word (pattern) is in sentence and appends it if not.
     */
    appendSubString: function (str, pattern, separator, caseSens) {
        if (!utils.isset(str)) {
            str = '';
        }
        if (utils.empty(pattern)) {
            return str;
        }
        caseSens = utils.isset(caseSens, true);
        separator = utils.isset(separator, ' ');
        var x = separator + str + separator;
        var reSeparator = separator.replace(/([\[\^\$\.\|\?\*\+\(\)])/g, '\\$1');
        var re = reSeparator + pattern + reSeparator;
        var reg = new RegExp(re, !caseSens ? 'i' : '');
        if (!reg.test(x)) {
            if (str.length) {
                str += separator;
            }
            str += pattern;
        }
        return str;
    },

    /**
     * @name removeSubString
     * @param {String}      str             The source string
     * @param {String}      pattern         The string to remove
     * @param {String=}     separator       The string separator (space by default)
     * @param {Boolean=}    caseSens  Case sensitive comparison
     * @returns {String}
     * Returns the modified string.
     * @description
     * Checks whether the specified word (pattern) is in sentence and removes it if yes.
     */
    removeSubString: function (str, pattern, separator, caseSens) {
        if (utils.empty(str) || utils.empty(pattern)) {
            return str;
        }
        caseSens = utils.isset(caseSens, true);
        separator = utils.isset(separator, ' ');
        var x = separator + str + separator;
        var reSeparator = separator.replace(/([\[\^\$\.\|\?\*\+\(\)])/g, '\\$1');
        var re = reSeparator + pattern + reSeparator;
        var reg = new RegExp(re, !caseSens ? 'i' : '');
        str = x.replace(reg, separator);
        str = str.substr(1, str.length - 2);
        return str;
    },

    /**
     * @name strRepeat
     * @param {String}  str     The string to be repeated.
     * @param {Number}  num     Number of time the input string should be repeated.
     * @param {Number}  length  Max length of the result
     * @returns {String}
     * Returns the repeated string.
     * @description
     * Returns input string repeated num times.
     */
    strRepeat: function (str, num, length) {
        var ret = '';
        num = utils.isset(num, -1);
        length = utils.isset(length, -1);
        if (num !== -1) {
            for (var loop = 0; loop < num; loop++) {
                ret += str;
            }
        } else if (length !== -1) {
            while (ret.length < length) {
                ret += str;
            }
        }
        if (length !== -1) {
            ret = ret.substr(0, length);
        }
        return ret;
    },

    /**
     * @name strPad
     * @param {String}  input       The input string.
     * @param {Number}  padLength   If the value of pad_length is negative, less than, or equal to the length of the input string, no padding takes place, and input will be returned.
     * @param {String}  padString   Pad string (space by default)
     * @param {String}  padType     'STR_PAD_LEFT'/'STR_PAD_RIGHT'/'STR_PAD_BOTH'(default)
     * @returns {String}
     * Returns the padded string.
     * @description
     * This functions returns the input string padded on the left,
     * the right, or both sides to the specified padding length.
     * If the optional argument pad_string is not supplied,
     * the input is padded with spaces, otherwise it is padded
     * with characters from pad_string up to the limit.
     */
    strPad: function (input, padLength, padString, padType) {
        input = utils.mixedTo(input, 'str');
        padString = utils.isset(padString, ' ');
        padType = utils.isset(padType, 'STR_PAD_RIGHT');
        if (['STR_PAD_LEFT', 'STR_PAD_RIGHT', 'STR_PAD_BOTH'].indexOf(padType) === -1) {
            padType = 'STR_PAD_RIGHT';
        }
        var padToGo = padLength - input.length;
        if (padToGo > 0) {
            if (padType === 'STR_PAD_LEFT') {
                input = utils.strRepeat(padString, -1, padToGo) + input;
            }
            else if (padType === 'STR_PAD_RIGHT') {
                input = input + utils.strRepeat(padString, -1, padToGo);
            }
            else if (padType === 'STR_PAD_BOTH') {
                var half = utils.strRepeat(padString, -1, Math.ceil(padToGo / 2));
                input = half + input + half;
                input = input.substr(0, padLength);
            }
        }
        return input;
    },

    /**
     * @name endsWith
     * @param   {String} str Input string.
     * @param   {String} suffix Suffix to check input string for.
     * @returns {Object} True if input string ends with specified suffix.
     * @description
     * Returns true if string ends with a specific suffix.
     */
    endsWith: function (str, suffix) {
        if (str && suffix && typeof str === 'string' && typeof suffix === 'string') {
            return str.indexOf(suffix, str.length - suffix.length) !== -1;
        }
        return false;
    },

    /**
     * @name mixedTo
     * @param {*}       val         The value to convert
     * @param {String}  type        The result type
     * @param {Object=} opts        Options
     * @returns {*}
     * The converted value
     * @description
     * This functions converts the input value to
     * the specified type with the specified options
     */
    mixedTo: function (val, type, opts) {
        var ret = val;
        if (type.match(/^b/i)) {
            // Boolean
            if (typeof val === 'string' && val.match(/^(0|of|f|n)/i)) {
                ret = false;
            } else {
                ret = !utils.empty(val);
            }
        } else if (type.match(/^f/i)) {
            // Float
            ret = parseFloat(val);
            if (isNaN(ret)) {
                ret = typeof val === 'boolean' && val ? 1 : 0;
            }
        } else if (type.match(/^i/i)) {
            // Integer
            ret = parseInt(val);
            if (isNaN(ret)) {
                ret = typeof val === 'boolean' && val ? 1 : 0;
            }

        } else if (type.match(/^price/i)) {
            // Price
            ret = String(Math.round(utils.mixedTo(val, 'f') * 100) / 100);
            var dot = ret.indexOf('.');
            if (dot === -1) {
                ret += '.00';
            } else {
                ret = utils.strPad(ret, dot + 3, '0', 'STR_PAD_RIGHT');
            }
        } else if (type.match(/(str|htm|url)/i)) {
            // String
            if (typeof val === 'boolean') {
                ret = val ? 'true' : 'false';
            } else if (!utils.isset(val)) {
                ret = '';
            } else if (typeof val.join !== 'undefined') {
                var sep = utils.get(opts, 'sep', ', ');
                ret = val.join(sep);
            } else if (typeof val === 'object') {
                ret = JSON.stringify(val);
            } else {
                ret = String(val);
            }
            // if (type.match(/url/i)) {
            //     ret = encodeURIComponent(ret);
            // }
            // utils.isset(val)
            // else if (val) {
            //     ret = String(val);
            //     if (type.match(/htm/i)) {
            //         ret = htmlspecialchars(ret, 'ENT_COMPAT');
            //     }
            // } else {
            //     ret = '';
            // }
        }

        return ret;
    },

    /**
     * @name mobileBrowser
     * @description
     * Checks whether the current browser is a mobile browser
     * @returns {Boolean}
     * true - if mobile browser
     */
    mobileBrowser: function () {
        var s = navigator.userAgent || navigator.vendor || window.opera;
        return s.match(/android|blackberry|mobile|iPhone|iPad|iPod|mobile.+firefox|opera m(ob|in)i|phone/i);
    },

    /**
     * @name arrMove
     * @methodOf Array
     * @param {Array}   arr     Array
     * @param {Number}  from    Source position
     * @param {String}  to      Destination position
     * @returns {Array}
     * Self object
     * @description
     * Moves array element
     */
    arrMove: function (arr, from, to) {
        while (from < 0) {
            from += arr.length;
        }
        while (to < 0) {
            to += arr.length;
        }
        if (to >= arr.length) {
            var k = to - arr.length;
            while ((k--) + 1) {
                arr.push(undefined);
            }
        }
        arr.splice(to, 0, arr.splice(from, 1)[0]);
        return arr;
    },

    /**
     * @name arrRemove
     * @methodOf Array
     * @param {Array}   arr     Array
     * @param {Number}  idx     Position
     * @returns {Array}
     * Self object
     * @description
     * Removes the specified array element
     */
    arrRemove: function (arr, idx) {
        return arr.splice(idx, 1);
    },

    /**
     * @name dateFormat
     * @param {Date}    dt      Date object
     * @param {String=} format  Output format (m/d/Y by default)
     * @returns {String}
     * Formatted date
     * @description
     * Formats date
     */
    dateFormat: function (dt, format) {
        if (!format) { // the default date format to use - can be customized to the current locale
            format = 'm/d/Y';
        }
        var MONTH_NAMES = [
            'January', 'February', 'March', 'April', 'May', 'June', 'July',
            'August', 'September', 'October', 'November', 'December',
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var DAY_NAMES = [
            'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
            'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'
        ];
        format = format + '';
        var result = '';
        var iFormat = 0;
        var c = '';
        var token = '';
        var y = dt.getFullYear().toString();
        var M = dt.getMonth() + 1;
        var d = dt.getDate();
        var E = dt.getDay();
        var H = dt.getHours();
        var m = dt.getMinutes();
        var s = dt.getSeconds();
        // var yyyy, yy, MMM, MM, dd, hh, h, mm, ss, ampm, HH, H, KK, K, kk, k;
        // Convert real this parts into formatted versions
        var value = {};
        //if (y.length < 4) {y=''+(y-0+1900);}
        value['Y'] = y.toString();
        value['y'] = y.substring(2);
        value['n'] = M;
        value['m'] = utils.strPad(M, 2, '0', 'STR_PAD_LEFT');
        value['F'] = MONTH_NAMES[M - 1];
        value['M'] = MONTH_NAMES[M + 11];
        value['j'] = d;
        value['d'] = utils.strPad(d, 2, '0', 'STR_PAD_LEFT');
        value['D'] = DAY_NAMES[E + 7];
        value['l'] = DAY_NAMES[E];
        value['G'] = H;
        value['H'] = utils.strPad(H, 2, '0', 'STR_PAD_LEFT');
        if (H === 0) {
            value['g'] = 12;
        }
        else if (H > 12) {
            value['g'] = H - 12;
        }
        else {
            value['g'] = H;
        }
        value['h'] = utils.strPad(value['g'], 2, '0', 'STR_PAD_LEFT');
        if (H > 11) {
            value['a'] = 'pm';
            value['A'] = 'PM';
        }
        else {
            value['a'] = 'am';
            value['A'] = 'AM';
        }
        value['i'] = utils.strPad(m, 2, '0', 'STR_PAD_LEFT');
        value['s'] = utils.strPad(s, 2, '0', 'STR_PAD_LEFT');
        //construct the result string
        while (iFormat < format.length) {
            c = format.charAt(iFormat);
            token = '';
            while ((format.charAt(iFormat) === c) && (iFormat < format.length)) {
                token += format.charAt(iFormat++);
            }
            if (value[token] !== null) {
                result = result + value[token];
            }
            else {
                result = result + token;
            }
        }
        return result;
    }
};

// Array Move
if (typeof Array.prototype.move === 'undefined') {
    Array.prototype.move = function (from, to) {
        return utils.arrMove(this, from, to);
    };
}

// Array Remove
if (typeof Array.prototype.remove === 'undefined') {
    Array.prototype.remove = function (idx) {
        return utils.arrRemove(this, idx);
    };
}

// dateFormat
if (typeof Date.prototype.dateFormat === 'undefined') {
    Date.prototype.dateFormat = function (format) {
        return utils.dateFormat(this, format);
    };
}

/*
 * using in NodeJS
 * var utils = require('./js.shared/utils.js');
 * ...
 * var t = utils.tickCount();
 * ...
 */
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = utils;
}
