const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
    try{
        //1.get token from header
        const token = req.headers.authorization.split(" ")[1];
        // console.log(token);
        //2.send token to jwt.verify for check Auth
        const decoded = jwt.verify(token,process.env.JWT_KEY);
        req.userData = decoded;
        next();
    }catch(error){
        return res.status(401).json({
            message:'Auth failed'
        });
    }

};