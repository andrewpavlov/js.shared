'use strict';

var utils = require('./utils');

module.exports.get = getVar;

/**
 * @name getVar
 * @param {Object}  req     Request object
 * @param {String}  name    Request parameter name
 * @param {Object=} opts    Options
 * @returns {*}
 * The request parameter
 * @description
 * This functions returns the specified request parameter
 */
function getVar(req, name, opts) {
    var ret = utils.get(req, ['params', name]);
    if (!utils.isset(ret)) {
        // req.method === 'GET'
        ret = utils.get(req, ['query', name]);
    }
    if (!utils.isset(ret)) {
        // req.method === 'POST'
        ret = utils.get(req, ['body', name]);
    }
    return ret;
}
