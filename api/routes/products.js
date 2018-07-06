const express = require('express');

//export to app.js
const router = express.Router();

const mongoose = require('mongoose');

const multer = require('multer');

const checkAuth = require('../middleware/check-auth');

const ProductController = require('../controllers/products');
//implement more detail
/*
1. Get file
2.access to file
3.Implement as you like
*/
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./uploads/');
    },
    filename: function(req, file, cb){
        // cb(null, new Date().toISOString()+file.originalname);
        cb(null, file.originalname);

    }
});
/*
implement to upload (const)
*/
const fileFilter = (req,file,cb)=>{
    //reject a file
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ){
    // if(file.mimetype === 'image/png' ){
        cb(null,true);
    }else{
        cb(null,false);
    }
};

const upload = multer({
    storage:storage, 
    limits:{
        fileSize:1024*1024*5 //Accept file 5 MB
    },
    fileFilter:fileFilter
});

//import Schema from another js for use in this file
const Product = require('../models/products');


//Return All Product
router.get('/', ProductController.products_get_all);

//set name of upload match with Client
router.post('/', checkAuth ,upload.single('productImage') ,ProductController.products_create_product);

//GET by id
router.get('/:productID', checkAuth ,ProductController.product_get_product);


//PATCH,PUT for update
router.patch('/:productID', checkAuth ,ProductController.products_update_product);

//DELETE for delete
router.delete('/:productID', checkAuth ,ProductController.products_del_product);
//Write code an exported to the app js for make router
module.exports = router;