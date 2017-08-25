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

*the project does not depend on aws-sdk directly.  
so, if you use aws functions - install sdk in your project

    npm install --save aws-sdk 