const mongoose = require('mongoose');
const Order = require('../models/orders');
const Product = require('../models/products');

exports.orders_get_all = (req,res,next)=>{
    Order.find()
    .select('product quantity _id')
    //Populate and choose some field
    // .populate('productID')
    .populate('productID','name')
    .exec()
    .then(docs =>{
        res.status(200).json({
            count:docs.length,
            order:docs.map(doc =>{
                return {
                    _id:doc._id,
                    product:doc.productID,
                    quantity:doc.quantity,
                    request:{
                        type:'GET',
                        url:'http://localhost:8080/orders/'+doc._id
                    }
                }
            })

        });
    })
    .catch(err => {
        res.status(500).json({
            error:err
        });
    });
    // res.status(200).json({
    //     message:'GET from /orders'
    // });
};


exports.orders_create_order = (req,res,next)=>{
    Product.findById(req.body.productID)
    .then(product => {
        if(!product){
            return res.status(404).json({
                message:'Product Not Found'
            });
        }
        const order = new Order({
            _id:mongoose.Types.ObjectId(),
            quantity:req.body.quantity,
            productID: req.body.productID
        });
        return order.save();
    })
    .then(result => {
            console.log(result);
            res.status(201).json({
                message:'Order stored',
                createdOrder:{
                    _id:result._id,
                    product:result.product,
                    quantity:result.quantity
                },
                request:{
                    type:'GET',
                    url:'http://localhost:8080/orders/'+result._id
                }
            });
        })
    .catch(err => {
            console.log(err);
            res.status(500).json({
                error:err
            });
        });

//if not match not show to console
    // const order = new Order({
    //     _id:mongoose.Types.ObjectId(),
    //     quantity:req.body.quantity,
    //     productID: req.body.productID
    // });
    // order
    // .save()
    // .then(result => {
    //     console.log(result);
    //     res.status(201).json({
    //         message:'Order stored',
    //         createdOrder:{
    //             _id:result._id,
    //             product:result.product,
    //             quantity:result.quantity
    //         },
    //         request:{
    //             type:'GET',
    //             url:'http://localhost:8080/orders/'+result._id
    //         }
    //     });
    // })
    // .catch(err => {
    //     console.log(err);
    //     res.status(500).json({
    //         error:err
    //     });
    // });
    // const order = {
    //     productID: req.body.productID,
    //     quantity: req.body.quantity
    // }
    // res.status(201).json({
    //     message:'Orders was created',
    //     order: order
    // });

};

exports.orders_get_order = (req,res,next)=>{
    Order.findById(req.params.orderID)
    .populate('productID')
    .exec()
    .then(order => {
        if(!order){
            return res.status(404).json({
                message:'Order Not Found',
            });
        }
        res.status(200).json({
            order:order,
            request:{
                type:'GET',
                url:'http://localhost:8080/orders/'
            }
        });
    })
    .catch(err => {
        res.status(500).json({
            error:err
        });
    });
    // const orderID = req.params.orderID;
    // res.status(200).json({
    //     message: 'GET from /orders by ID',
    //     id:orderID
    // });
};

exports.orders_del_order = (req,res,next)=>{
    Order.remove({ _id:req.params.orderID})
    .exec()
    .then(result => {
        res.status(200).json({
            message:'Order deleted',
            request:{
                type:'POST',
                url:'http://localhost:8080/orders',
                body:{
                    productID:'ID',
                    quantity:'Number'
                }
            }
        });
    })
    .catch(err => {
        res.status(500).json({
            error:err
        });
    });
    // const orderID = req.params.orderID;
    // res.status(200).json({
    //     message: 'DELETE order from /orders by ID',
    //     id:orderID
    // });
};