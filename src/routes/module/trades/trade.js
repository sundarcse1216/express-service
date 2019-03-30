const dateformat = require('dateformat');
const LOGGER = require('../../../utils/logger')(__filename);
const {doValidation} = require('../../../utils/validation');
const {tradesBodySchema} = require('./validation');
const {
    httpValidationErrorResponse,
    httpInternalErrorResponse,
    httpCreatedResponse,
    httpDataBaseErrorResponse,
    httpSuccessResponse,
    httpNoContentResponse
} = require('../../../utils/HttpResponse');
const {
    doDeleteTrades,
    doInsertTrades,
    doGetAllTrades,
    doGetByTradeUserId,
    doGetTradeByTimeRange,
    doGetMinAndMaxPriceOfTrade
} = require('./query');

const deleteAllTrades = async (req, res) => {
    let response = null;
    await doDeleteTrades(req.body).then(async result => {
        if (result) {
            response = await httpSuccessResponse('Trades deleted successfully.');
        } else {
            response = await httpDataBaseErrorResponse('Error while insert.');
        }
        res.status(200).json(response);
    }).catch(async err => {
        LOGGER.error('Exception occurred while delete trades : ' + err, err.stack);
        response = await httpInternalErrorResponse('Exception occurred while delete trades.');
        res.status(200).json(response);
    });
};

const saveTrades = async (req, res) => {
    let response = null;
    try {
        const message = await doValidation(req.body, tradesBodySchema);
        if (message) response = await httpValidationErrorResponse(message);
    } catch (ex) {
        LOGGER.error('Exception occurred while validate Trades: ' + ex, ex.stack);
        response = await httpInternalErrorResponse(ex);
    }

    if (response == null) {
        let options = {timeZone: "America/New_York"};
        estTime = new Date().toLocaleString("en-US", options);
        const format = dateformat(estTime, 'yyyy-mm-dd HH:MM:ss');
        req.body.timestamp = format;
        await doInsertTrades(req.body).then(async result => {
            if (result) {
                response = await httpCreatedResponse('Trade');
            } else {
                response = await httpDataBaseErrorResponse('Error while insert.');
            }
            res.status(200).json(response);
        }).catch(async err => {
            LOGGER.error('Exception occurred while insert trade : ' + err, err.stack);
            response = await httpInternalErrorResponse('Exception occurred while insert trade.');
            res.status(200).json(response);
        });
    } else {
        res.status(200).json(response);
    }
};

const getAllTrades = async (req, res) => {
    let response = null;
    await doGetAllTrades().then(async result => {
        if (result) {
            response = await httpSuccessResponse(result);
        } else {
            response = await httpDataBaseErrorResponse('Error while get all trades.');
        }
        res.status(200).json(response);
    }).catch(async err => {
        LOGGER.error('Exception occurred while get all trades : ' + err, err.stack);
        response = await httpInternalErrorResponse('Exception occurred while get all trades.');
        res.status(200).json(response);
    });
};

const getTradeByUserId = async (req, res) => {
    let response = null;
    const userID = req.params.userID;
    await doGetByTradeUserId(userID).then(async result => {
        if (result) {
            response = await httpSuccessResponse(result);
        } else {
            response = await httpNoContentResponse('No trades available for given useId.');
        }
        res.status(200).json(response);
    }).catch(async err => {
        LOGGER.error('Exception occurred while get trades : ' + err, err.stack);
        response = await httpInternalErrorResponse('Exception occurred while get trades.');
        res.status(200).json(response);
    });
};

const getTradeByTimeRange = async (req, res) => {
    let response = null;
    const stocks = req.params.stocks;
    await doGetTradeByTimeRange(req).then(async result => {
        if (result) {
            response = await httpSuccessResponse(result);
        } else {
            response = await httpNoContentResponse('There are no trades in the given date range.');
        }
        res.status(200).json(response);
    }).catch(async err => {
        LOGGER.error('Exception occurred while get trades : ' + err, err.stack);
        response = await httpInternalErrorResponse('Exception occurred while get trades.');
        res.status(200).json(response);
    });
};

const getMinAndMaxPriceOfTrade = async (req, res) => {
    let response = null;
    const stocks = req.params.stocks;
    await doGetMinAndMaxPriceOfTrade(req).then(async result => {
        if (result) {
            response = await httpSuccessResponse(result);
        } else {
            response = await httpNoContentResponse('There are no trades in the given date range.');
        }
        res.status(200).json(response);
    }).catch(async err => {
        LOGGER.error('Exception occurred while get trades : ' + err, err.stack);
        response = await httpInternalErrorResponse('Exception occurred while get trades.');
        res.status(200).json(response);
    });
};

module.exports = {
    deleteAllTrades,
    saveTrades,
    getAllTrades,
    getTradeByUserId,
    getTradeByTimeRange,
    getMinAndMaxPriceOfTrade
};