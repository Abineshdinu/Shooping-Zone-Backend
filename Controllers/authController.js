const catchAsyncError = require("../Middlewares/catchAsyncError");
const User = require("../models/userModel");
const sendEmail = require("../utils/email");
const ErrorHandler = require("../utils/errorHandler");
const Token = require("../utils/jwt");
const crypto = require("crypto");

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
      email: user.email,
      subject: "Shopping-Zone-Password-Recovery",
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} `,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message), 500);
  }
});

exports.resetPassword = catchAsyncError(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordTokenExpire: {
      $gt: Date.now(),
    },
  });

  if (!user) {
    return next(new ErrorHandler("Reset Password is invalid or Expired"));
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("password doesnot match "));
  }
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordTokenExpire = undefined;
  await user.save({ validateBeforeSave: false });
  Token(user, 201, res);
});

// get user profile

exports.getUserProfile = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
});

//change-password

exports.changePassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");
  //check-old-pas

  if (!(await user.isValidPassword(req.body.oldPassword))) {
    return next(new ErrorHandler("Old Password Is Incorrect", 401));
  }
  //new password

  user.password = req.body.password;
  await user.save();
  res.status(200).json({
    success: true,
  });
});

exports.updateProfile = catchAsyncError(async (req, res, next) => {
  const update = {
    name: req.body.name,
    email: req.body.email,
  };
  const user = await User.findByIdAndUpdate(req.user.id, update, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    success: true,
    user,
  });
});

// admin-get-all-users

exports.getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    users,
  });
});

// admin /get-Single-User

exports.getSingleUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler(`User Not Found With this Id`));
  }

  res.status(200).json({
    success: true,
    user,
  });
});

exports.updateUser = catchAsyncError(async (req, res, next) => {
  const update = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };
  const user = await User.findByIdAndUpdate(req.params.id, update, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    success: true,
    message: "Upadted SuccessFully",
  });
});

//admin / delete-user

exports.deleteUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler(`User Not Found ${req.params.id}`));
  }
  await user.deleteOne();
  res.status(200).json({
    success: true,
    message: "User Deleted SuccessFully ",
  });
});
