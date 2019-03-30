const httpSuccessResponse = async (message) => {
    return {code: 200, status: 'Success', message: message};
};

const httpCreatedResponse = (message) => {
    return {code: 201, status: 'Success', message: message + ' inserted successfully.'};
};

const httpNoContentResponse = async (message = []) => {
    return {code: 404, status: 'No content available', message: message};
};

const httpValidationErrorResponse = (message) => {
    return {code: 400, status: 'Input validation error', message: message}
};

const httpInternalErrorResponse = async (message) => {
    return {code: 500, status: 'Internal server error', message: message}
};

const httpDataBaseErrorResponse = async (message) => {
    return {code: 503, status: 'Service Unavailable', message: message}
};

module.exports = {
    httpSuccessResponse,
    httpCreatedResponse,
    httpNoContentResponse,
    httpValidationErrorResponse,
    httpInternalErrorResponse,
    httpDataBaseErrorResponse
};