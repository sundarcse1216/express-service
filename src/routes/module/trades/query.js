const {getClient, closeClient, DB, getNextSequence} = require('../../../utils/db');
const LOGGER = require('../../../utils/logger')(__filename);

const collection = 'trades';

const doDeleteTrades = () => {
    return new Promise(async (resolve, reject) => {
        await getClient().then(async client => {
            let db = client.db(DB);
            db.collection(collection).deleteMany({}).then(async result => {
                if (result.n !== 0) {
                    LOGGER.info('Trades deleted successfully.');
                    resolve(true);
                } else {
                    resolve(false);
                }
                await closeClient(client);
            })
        }).catch(err => reject(err));
    });

};

const doInsertTrades = (trades) => {
    return new Promise(async (resolve, reject) => {
        await getClient().then(async client => {
            let db = client.db(DB);

            await getNextSequence(db, collection).then(id => {
                trades._id = id;
            });

            db.collection(collection).insertOne(trades).then(async result => {
                if (result.n !== 0) {
                    LOGGER.info('Trades inserted successfully.');
                    resolve(true);
                } else {
                    resolve(false);
                }
            });
            await closeClient(client);
        }).catch(err => reject(err));
    });
};

const doGetAllTrades = () => {
    return new Promise(async (resolve, reject) => {
        await getClient().then(async client => {
            let db = client.db(DB);
            let cursor = db.collection(collection).find({});
            cursor.toArray(async (err, data) => {
                if (!err) {
                    LOGGER.info("data : " + JSON.stringify(data));
                    resolve(data);
                } else {
                    reject(err);
                }
            });
            await closeClient(client);
        }).catch(err => reject(err));
    });
};

const doGetByTradeUserId = (userId) => {
    return new Promise(async (resolve, reject) => {
        await getClient().then(async client => {
            let db = client.db(DB);
            let cursor = db.collection(collection).findOne({'user.id': userId}).then(result => {
                if (result !== undefined) {
                    LOGGER.info("data : " + JSON.stringify(result));
                    resolve(result);
                } else {
                    resolve(false);
                }
            });
            await closeClient(client);
        }).catch(err => reject(err));
    });
};

const doGetTradeByTimeRange = (req) => {
    const stockSymbol = req.params.stocks;
    const type = req.query.type;
    const startDate = req.query.start;
    const endDate = req.query.end;
    console.log("type : " + type);
    console.log("symbol : " + stockSymbol);
    return new Promise(async (resolve, reject) => {
        await getClient().then(async client => {
            let db = client.db(DB);
            let cursor = db.collection(collection).find({
                $and: [{symbol: stockSymbol},
                    {type: type},
                    {timestamp: {$gt: startDate, $lt: endDate}}
                ]
            });
            cursor.toArray(async (err, data) => {
                if (!err) {
                    LOGGER.info("data : " + JSON.stringify(data));
                    resolve(data);
                } else {
                    reject(err);
                }
            });
            await closeClient(client);
        }).catch(err => reject(err));
    });
};

const doGetMinAndMaxPriceOfTrade = (req) => {
    const stockSymbol = req.params.stocks;
    const type = req.query.type;
    const startDate = req.query.start;
    const endDate = req.query.end;
    console.log("type : " + type);
    console.log("symbol : " + stockSymbol);
    return new Promise(async (resolve, reject) => {
        await getClient().then(async client => {
            let db = client.db(DB);
            let cursor = db.collection(collection).aggregate([
                {
                    "$match": {
                        $and: [{symbol: stockSymbol},
                            {timestamp: {$gt: startDate, $lt: endDate}}
                        ]
                    },
                },
                {
                    "$group": {
                        _id: {symbol: "$symbol"},
                        highest: {$max: "$price"},
                        lowest: {$min: "$price"}
                    }
                }]
            );
            cursor.toArray(async (err, data) => {
                if (!err) {

                    data[0].symbol = data[0]._id.symbol;
                    delete data[0]._id;
                    LOGGER.info("data : " + JSON.stringify(data));
                    resolve(data);
                } else {
                    reject(err);
                }
            });
            await closeClient(client);
        }).catch(err => reject(err));
    });
};

module.exports = {
    doDeleteTrades,
    doInsertTrades,
    doGetAllTrades,
    doGetByTradeUserId,
    doGetTradeByTimeRange,
    doGetMinAndMaxPriceOfTrade
};