const express = require('express');
const trackers = require('./trackerRoutes');
const users = require('./userRoutes');
const router = express.Router();

router.use('/trackers', trackers);
router.use('/users', users)

module.exports = router;