const express = require('express');
const trackerController = require('../Controllers/Trackers.js');
const router = express.Router();

router.get('/', trackerController.getAllTrackers);
router.post('/user', trackerController.getTrackersByUser);
router.post('/stat/all', trackerController.getSingleTrackersAllUsers)
router.post('/stat/:id', trackerController.getSingleTrackerSingleUser)

module.exports = router;
