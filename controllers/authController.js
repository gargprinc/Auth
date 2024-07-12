const User = require("../models/user");
const jwt = require('jsonwebtoken');

const generateToken = (id)=> {
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"30d"});
};

exports.register = async (req, res) => {
    const {name,email,password} = req.body;
    try{
        const user = await User.create({name,email,password});
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role:user.role,
            token: generateToken(user._id)
        });

    }catch(err){
res.status(400).json({message:err.message});
    }
}

exports.login = async (req, res) => {
    const {email,password} = req.body;

    try{
     
    const user = await User.findOne({email});
    if(user&& (await user.matchPassword(password))){
    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role:user.role,
        token: generateToken(user._id)
    })
    }else{
        res.status(401).json({message:"invalid email or password"});

    }
    }catch(err){
res.status(400).json({message:err.message});
    }
};


