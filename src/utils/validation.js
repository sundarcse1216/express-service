const joi = require('joi');

const doValidation = (object, schema) => {
    let message = false;
    const validation = joi.validate(object, schema, {abortEarly: false});
    if (validation && validation.error) {
        message = validation.error.details.map(detail => detail.message).join(', ');
    }
    return message;
};

module.exports = {doValidation};