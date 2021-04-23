const express = require('express');
const multer = require('multer');

const upload = multer();
// controllers
const { getFoodList, addFood } = require('../controllers/food_controller');
// router
const router = express.Router();

router.route('/').post(upload.none(), getFoodList);
router.route('/file').post(addFood);

module.exports = router;
