const express = require('express');
const { getDiscountCodes, saveDiscountCode } = require('../controllers/discountController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, getDiscountCodes);
router.post('/save', authMiddleware, saveDiscountCode);

module.exports = router;
