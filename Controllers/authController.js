const catchAsyncError = require("../Middlewares/catchAsyncError");
const User = require("../models/userModel");
const sendEmail = require("../utils/email");
const ErrorHandler = require("../utils/errorHandler");
const Token = require("../utils/jwt");

exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password, avatar } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar,
  });

  Token(user, 201, res);
});

exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please a Email or password", 400));
  }

  //finding user from the database
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Please a  valid Email or password", 401));
  }

  if (!(await user.isValidPassword(password))) {
    return next(new ErrorHandler("Please a  valid Email or password", 401));
  }

  Token(user, 201, res);
});

exports.logoutUser = (req, res, next) => {
  res
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .status(200)
    .json({
      success: true,
      message: "Loggedout",
    });
};

exports.forgotPassword = catchAsyncError(async (req, res, net) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler("user not found", 404));
  }

  const resetToken = user.getResetToken();
  user.save({ validateBeforeSave: false });

  //create reset url

  const resetUrl = `${req.protocol}.//${req.get(
    "host"
  )}/api/reset/password/${resetToken}`;

  const message = `the url has been sent\n\n
 ${resetUrl} \n\n please ignore it if you have not requested.`;

  try {
    sendEmail({
      email:user.email,
      subject:"Shopping-Zone-Password-Recovery",
      message
    });

    res.status(200).json({
      success:true,
      message:`Email sent to ${user.email} `
    })
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message), 500);
  }
});
