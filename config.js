//Config variables

var enviroments = {};

enviroments.staging = {
    'httpPort':6060,
    'envName' : 'staging'
};

enviroments.production = {
    'httpPort': 6090,
    'envName' : 'production'
};
var currentEnviroment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// Check if enviorment exists, default staging;
var enviromentToExport = typeof(enviroments[currentEnviroment]) == 'object' ? enviroments[currentEnviroment] : enviroments.staging;

//Export module
module.exports = enviromentToExport;
