const express = require('express');
const errorhandler = require('errorhandler');
const cors = require('cors');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const LOGGER = require('./utils/logger')(__filename);
const routes = require('./routes');

const app = express();
app.use(cors());
const isProduction = process.env.NODE_ENV === 'production';
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
}));
app.use(routes);

if (!isProduction) {
    app.use(errorhandler());
}

if (!isProduction) {
    app.use(function (err, req, res, next) {
        console.log(err.stack);

        res.status(err.status || 500);

        res.json({
            'errors': {
                message: err.message,
                error: err
            }
        });
    });
}

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        'errors': {
            message: err.message,
            error: {}
        }
    });
});

process.addListener('uncaughtException', function (err, stack) {
    LOGGER.error('------------------------');
    LOGGER.error('Exception: ' + err);
    LOGGER.error(err.stack);
    LOGGER.error('------------------------');
});

module.exports = app;