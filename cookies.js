'use strict';

const utils = require('./utils');

module.exports.get = cookieGet;
module.exports.set = cookieSet;
module.exports.clear = cookieClear;

/**
 * @name cookieGet
 * @param {Object}  req  Request
 * @param {String}  name Cookie name
 * @param {String=} def  default value
 * @returns {String} Cookie value
 * @description
 * Gets cookie
 */
function cookieGet(req, name, def) {
    return utils.get(req.signedCookie, name, utils.get(req.cookies, name, def));
}

/**
 * @name cookieSet
 * @param {Object}  res  Response
 * @param {String}  name Cookie name
 * @param {String}  val  Cookie value
 * @param {Object=} opts Cookie options (see node js cookie for details)
 * @description
 * Sets cookie
 */
function cookieSet(res, name, val, opts) {
    opts = _defOpts(opts);
    res.cookie(name, val, opts);
}

/**
 * @name cookieSet
 * @param {Object}  res  Response
 * @param {String}  name Cookie name
 * @param {Object=} opts Options
 * @description
 * Removes the specified cookie
 */
function cookieClear(res, name, opts) {
    opts = _defOpts(opts);
    res.clearCookie(name, opts);
}

/**
 * @name _defOpts
 * @param {Object}  opts  Cookie options
 * @returns {Object} Cookie options
 * @description
 * Returns default cookie options based on input
 */
function _defOpts(opts) {
    if (!opts) {
        opts = {};
    }
    if (!utils.isset(opts.httpOnly)) {
        opts.httpOnly = true;
    }
    if (!utils.isset(opts.secure)) {
        opts.secure = false;
    }
    if (!utils.isset(opts.signed)) {
        opts.signed = false;
    }
    return opts;
}
