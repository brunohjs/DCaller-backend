const httpStatus = require('http-status-codes');
const constants = require('./constants');

module.exports = {
    sendResponse: (statusCode, data, message) => {
        return {
            statusCode,
            error: statusCode >= 400,
            message: message ? message : httpStatus.getStatusText(statusCode),
            data: data ? data : null
        }
    },

    logs: (message, method, type) => {
        let time = new Date().toISOString().substring(0, 19);
        type = constants.logStatus.includes(type) ? type.toUpperCase() : 'NONE';
        console.log(`[${type}][${method}][${time}] ${message}`)
    }
}