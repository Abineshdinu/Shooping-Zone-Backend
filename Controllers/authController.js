const catchAsyncError = require("../Middlewares/catchAsyncError");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler")
const Token = require("../utils/jwt")

exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password, avatar } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar,
  });

  Token(user,201,res)
});

exports.loginUser = catchAsyncError(async(req,res,next) => {
    const {email,password} = req.body

    if(!email || !password){
        return next( new ErrorHandler('Please a Email or password',400))
    }

    //finding user from the database 
   const user = await User.findOne({email}).select ("+password")

   if(!user){
    return next( new ErrorHandler('Please a  valid Email or password',401))
   }

   if(!await user.isValidPassword(password)){
    return next( new ErrorHandler('Please a  valid Email or password',401))
   }

   Token(user,201,res)
})
