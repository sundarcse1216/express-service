const router = require('express').Router();
const {
    deleteAllTrades,
    saveTrades,
    getAllTrades,
    getTradeByUserId,
    getTradeByTimeRange,
    getMinAndMaxPriceOfTrade
} = require('./trade');

router.delete('/erase', async (req, res) => {
    await deleteAllTrades(req, res);
});

router.post('/', async (req, res) => {
    await saveTrades(req, res);
});

router.get('/', async (req, res) => {
    await getAllTrades(req, res);
});

router.get('/users/:userID', async (req, res) => {
    await getTradeByUserId(req, res);
});

router.get('/stocks/:stocks/trades', async (req, res) => {
    await getTradeByTimeRange(req, res);
});

router.get('/stocks/:stocks/price', async (req, res) => {
    await getMinAndMaxPriceOfTrade(req, res);
});

module.exports = router;