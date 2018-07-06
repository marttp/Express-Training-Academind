const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//Middleware for application/////////////////////////////////////////////////
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/users');



mongoose.connect(
//    'mongodb+srv://marttp:957852456@fashionshop-hye31.mongodb.net/test',
    'mongodb+srv://marttp:'+process.env.MONGO_ATLAS_PW+'@fashionshop-hye31.mongodb.net/fashion-shop',
    {
        useMongoClient:true
    }
);

mongoose.Promise = global.Promise;
//////////////////////////////////////////////////////
app.use(morgan('dev'));
//parse incoming request
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


//Handling CORS error different client and server
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// app.use((req,res,next)=>{
//     res.header('Access-Control-Allow-Origin','*');
//     res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization');
//     if(req.method ==='OPTIONS'){
//         res.header('Access-Control-Allow-Method','PUT, POST, PATCH, DELETE, GET');
//         return res.status(200).json({});
//     }
// });
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Make Route////////////////////////////////////////////////////////////////
app.use('/products',productRoutes);
app.use('/orders',orderRoutes);
app.use('/users',userRoutes);
//Make public
app.use('/uploads',express.static('uploads'));


//next (use for move request to next Middleware)/////////////////////////////

app.use((req,res,next)=>{
    const error = new Error('Not found');
    error.status = 404;
    next(error);
    //throw value to function it have a argument = value
});


app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message:error.message
        }
    });
});
/*app.use((req,res,next)=>{
    //You can identify code and write header with json format
    res.status(200).json({
        message : 'Hello World'        
    });

});
*/


//export to server.js for use in application
module.exports = app;