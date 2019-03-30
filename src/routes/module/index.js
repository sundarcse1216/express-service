const router = require('express').Router();
const LOGGER = require('../../utils/logger')(__filename);

router.get('/', (req, res) => {
    LOGGER.info('Hello World!');
    return res.json({code: 200, status: 'Success', message: 'Hello world!'});
});

module.exports = router;