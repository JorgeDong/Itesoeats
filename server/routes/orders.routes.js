const express = require('express');
const router = express.Router();

const order = require('../controllers/order.controller');

router.get('/', order.getOrders);
router.post('/', order.createOrder);
router.get('/:id', order.getOrder);
router.put('/:id', order.editOrder);

module.exports = router;