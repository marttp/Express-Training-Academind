const mongoose = require('mongoose');
const Product = require('../models/products');

exports.products_get_all = (req,res,next)=>{
    // res.status(200).json({
    //     message:'Handling GET from /products'
    // });
    Product.find()
    .select('name price _id productImage')
    .exec()
    .then(docs => {
        // console.log(docs);
        const response = {
            count: docs.length,
            products: docs.map(doc => {
                return {
                    name : doc.name,
                    price: doc.price,
                    _id: doc._id,
                    productImage:doc.productImage,
                    request:{
                        type:'GET',
                        url:'http://localhost:8080/products/'+doc._id
                    }
                }
            })
        };
        // if(docs.length>=0){
            res.status(200).json(response);
        // }else{
        //     res.status(404).json({
        //         message: "No entry found"
        //     });
        // }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
};


exports.products_create_product = (req,res,next)=>{
    // console.log(req.file);
    // const product = {
    //     name: req.body.name,
    //     price: req.body.price
    // };
///Passed JS and throw obj to constructor from schema
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path
    });
    product
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message:'Created products successfully',
                createProduct: {
                    name:result.name,
                    price:result.price,
                    _id: result._id,
                    request: {
                        type:'POST',
                        url:'http://localhost:8080/products/'+result._id
                    }

                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error:err
            });
        });
};

exports.product_get_product = (req,res,next)=>{
    const id = req.params.productID;
    // if(id === 'special'){
    //     res.status(200).json({
    //         message:'You discover the special ID',
    //         id:id
    //     });
    // }
    // else {
    //     res.status(200).json({
    //         message: 'You passed some ID'
    //     });
    // }
    Product.findById(id)
    .select('name price _id productImage')
    .exec()
    .then( doc => {
        console.log('From database '+doc);
        if(doc){
            res.status(200).json({
                product:doc,
                request:{
                    type:'GET',
                    description:'GET ALL PRODUCT',
                    url:'http://localhost:8080/products'
                }
            });
        }else{
            res.status(404).json({message : 'No valid entry found'});
        }

    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error:err});
    }
    );
};

exports.products_update_product = (req,res,next)=>{
    const id = req.params.productID;
    // res.status(200).json({
    //     message:'Update product!',
    //     id:id
    // });
    const updateOps = {};

    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }

    Product.update({ _id : id }, { $set:updateOps})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message:"Product Updated",
            request:{
                type:'GET',
                url:'http://localhost:8080/'+id
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
    // Product.update({ _id : id }, { $set:{
    //     name: req.body.newName,
    //     price:req.body.newPrice
    // }});
};


exports.products_del_product = (req,res,next)=>{
    const id = req.params.productID;
    // res.status(200).json({
    //     message:'Delete product',
    //     id:id
    // });
    Product.remove({ _id : id })
    .exec()
    .then(result => {
        res.status(200).json({
            message:'Product Delete',
            request:{
                type:'POST',
                url:'http//localhost:8080/products',
                body: { name: 'String', price: 'Number'}
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err
        });
    });
};