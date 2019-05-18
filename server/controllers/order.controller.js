const Order = require('../models/order');
const orderCtrl = {};

orderCtrl.getOrders = async (req, res, next) => {
    const orders = await Order.find();
    res.json(orders);
};

orderCtrl.createOrder = async (req, res, next) => {
    console.log(req.json);
    console.log(req.params);
    console.log(req.body);
    const order = new Order({
        id: req.body._id,
        date: req.body.date,
        status: req.body.status,
        cart: req.body.cart
    });
    await order.save();
    res.json({status: 'Order created'});
    
};

orderCtrl.getOrder = async (req, res, next) => {
    const { id } = req.params;
    const order = await Order.findById(id);
    res.json(order);
};

orderCtrl.editOrder = async (req, res, next) => {
    const { id } = req.params;
    const order = {
        date: req.body.date,
        status: req.body.status,
        cart: req.body.cart
    };
    await Order.findByIdAndUpdate(id, {$set: order}, {new: true});
    res.json({status: 'Order Updated'});
};


module.exports = orderCtrl;