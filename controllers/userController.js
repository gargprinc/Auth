const User = require("../models/user");



exports.getUsers = async (req, res)=> {
    try{
        const users = await User.find();
        res.json(users);
    }catch(err){
        res.status(500).json({message:err.message});
    }
};


exports.getUserById = async(req, res)=> {
    try{
        const users = await User.findById(req.params.id);
        if(users){
            res.json(users)
        }else{
            res.status(404).json({message:"User not found"})
        }
    }catch(err){
        res.status(500).json({message:err.message});
    }
};

exports.updateUser = async(req, res)=> {
    try{
        const user = await User.findById(req.params.id);
        if(user){
    user.name = req.body.name;
    user.email = req.body.email;
    if(req.body.password){
        user.password = req.body.password;
    }
    await user.save();
    res.json(user)
        }else{
            res.status(404).json({message:"User not found"})
        }
    }catch(err){
        res.status(500).json({message:err.message});
    }
};



exports.deleteUser = async(req, res)=> {
    try{
        const user = await User.findById(req.params.id);
        if(user){

    await User.deleteOne();
    res.json({message:"User has been removed"})
        }else{
            res.status(404).json({message:"User not found"})
        }
    }catch(err){
        res.status(500).json({message:err.message});
    }
    
};