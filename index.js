'use strict';

module.exports = {
    utils: require('./utils'),
    config: require('./config'),
    cookies: require('./cookies'),
    vars: require('./reqVars'),
    aws: (modules) => {
        let r = {};
        if (!modules) {
            modules = ['init', 'ssm'];
        }
        if (typeof modules === 'string') {
            modules = modules.split(/[ ;,]/g);
        }
        modules.forEach((_m) => {
            r[_m] = require('./aws/' + _m);
        });
        return r;
    }
};
