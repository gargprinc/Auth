const jwt = require('jsonwebtoken');
const User = require('../models/user');

const protect = async (req, res, next) => {
    let token;
    if(req.headers.authorization){
        token = req.headers.authorization;

    }
    if(!token){
        return res.status(401).json({msg: 'No token, authorization denied'});

    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        next();

    }catch(error){
        return res.status(401).json({message:"Not authorized, token failed"});
    }
}
module.exports = protect;