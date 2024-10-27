const express = require('express');
const userController = require('../Controllers/Users');
const router = express.Router();

router.get('/', userController.getAllUsers);
router.post('/search', userController.getUserByDataType);

module.exports = router;