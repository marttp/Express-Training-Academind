const http = require('http');

//import from app.js
const app = require('./app');


const port = process.env.PORT || 8080;


//now. throw your const app in this createServer to create Middleware
//for interact another page,fucntion,app
const server = http.createServer(app);


server.listen(port);