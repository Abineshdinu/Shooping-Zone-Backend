const sendToken = (user, statusCode, res) => {
  //creating jwttoken
  const token = user.getJwtToken();

  res.status(statusCode).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendToken;
