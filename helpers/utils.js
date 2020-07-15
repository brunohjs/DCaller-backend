const httpStatus = require('http-status-codes');

module.exports = {
    sendResponse: (statusCode, data, message) => {
        return {
            statusCode,
            error: statusCode >= 400,
            message: message ? message : httpStatus.getStatusText(statusCode),
            data: data ? data : null
        }
    }
}