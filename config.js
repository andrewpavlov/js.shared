'use strict';

var extend = require('extend');

var utils = require('./utils');
var fileConf = null;
var appConf = null;

exports.init = initConfig;
exports.get = get;
exports.getInt = getInt;
exports.getT = getT;

/**
 * @name get
 * @param {String|Array}    parameter   Parameter name (e.g. 'mysql.host' or ['mysql', 'host'])
 * @param {*=}              def         Default value
 * @returns {*}
 * The specified parameter value
 * @description
 * Returns the specified parameter value
 */
function get(parameter, def) {
    var ret = {};
    var v1 = utils.get(fileConf, parameter, def);
    var v2 = utils.get(appConf, parameter);
    if (!utils.isset(v2)) {
        return v1;
    }
    extend(true, ret, {
        x: v1
    }, {
        x: v2
    });
    return ret.x;
}

/**
 * @name getT
 * @param {String|Array}    parameter
 * @param {String}  type    Value type
 * @param {*=}      def     Default value
 * @returns {*}
 * The specified parameter value
 * @description
 * Returns the specified parameter value
 */
function getT(parameter, type, def) {
    var ret = get(parameter, def);
    return utils.mixedTo(ret, type);
}

/**
 * @name getInt
 * @param {String|Array}    parameter
 * @param {*=}      def     Default value
 * @returns {*}
 * The specified parameter value
 * @description
 * Returns the specified parameter value
 */
function getInt(parameter, def) {
    return getT(parameter, 'i', def);
}

/**
 * @name initConfig
 * @param {object=} conf initial configuration
 * @description
 * Initializes configuration
 */
function initConfig(conf) {
    if (!fileConf) {
        fileConf = {};
    }
    if (conf) {
        extend(true, fileConf, conf);
    }
    if (!appConf) {
        appConf = {};
        var m;
        process.argv.forEach(function (val) {
            if (m = val.match(/^--([^-]+)-([^=]+)=?(.*)$/)) {
                utils.set(appConf, [m[1], m[2]], m[3] || true);
            }
        });
        for (var key in process.env) {
            if (process.env.hasOwnProperty(key)) {
                if (m = key.match(/^([^-]+)-(.+)$/)) {
                    utils.set(appConf, [m[1], m[2]], process.env[key] || true);
                }
            }
        }
    }
}
