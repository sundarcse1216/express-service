const router = require('express').Router();
const hello = require('./module');
const trades = require('./module/trades');

router.use('/', hello);

router.use('/trades', trades);

module.exports = router;