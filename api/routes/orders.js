const express = require('express');
const router = express.Router();
//Use in controller
// const mongoose = require('mongoose');

// const Order = require('../models/orders');
// const Product = require('../models/products');


const checkAuth = require('../middleware/check-auth');


//controller
const OrderController = require('../controllers/orders');

router.get('/',checkAuth, OrderController.orders_get_all);

///If don't have product ID can't create order
router.post('/', checkAuth ,OrderController.orders_create_order);

router.get('/:orderID', checkAuth , OrderController.orders_get_order);

router.delete('/:orderID', checkAuth ,OrderController.orders_del_order);


module.exports = router;