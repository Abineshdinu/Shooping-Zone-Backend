const catchAsyncError = require ('../Middlewares/catchAsyncError');
const User = require ('../models/userModel');

exports.registerUser=catchAsyncError(async (req,res,next) =>{
    const{name,email,password,avatar} = req.body
  const user = await User.create({
        name,
        email,
        password,
        avatar,
    })
    res.status(200).json({
        success:true,
        user
    })


})

