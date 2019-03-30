const joi = require('joi');

const userSchema = joi.object().keys({
    id: joi.number().required(),
    name: joi.string().required()
});

const tradesBodySchema = joi.object().keys({
    type: joi.string().valid(['buy', 'sell']).required(),
    user: userSchema.required(),
    symbol: joi.string().required(),
    shares: joi.number().min(10).max(30).required(),
    price: joi.number().min(130.42).max(195.65).required()
});

module.exports = {tradesBodySchema};
