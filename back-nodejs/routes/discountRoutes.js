const express = require('express');
const { getDiscountCodes } = require('../controllers/discountController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, getDiscountCodes);

module.exports = router;