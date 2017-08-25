# Install

    npm install --save https://github.com/andrewpavlov/js.shared.git
    
## Using

    const config = require('js.shared').config;
    const utils = require('js.shared').utils;
    const aws = require('js.shared').aws('init ssm');
    
    config.init();
    
    let useAWS = config.get('aws.use');
    if (!utils.empty(useAWS)) {
        aws.init({
            region: config.get('aws.region');
        })
    }

