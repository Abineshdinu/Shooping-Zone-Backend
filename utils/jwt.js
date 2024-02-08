const sendToken = (user, statusCode, res) => {
  //creating jwttoken
  const token = user.getJwtToken();


  //setting cookies

  const options = {
    expires: new Date(Date.now () + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
    ),
    httpOnly:true,
  }

  res.status(statusCode)
  res.cookie('token',token,options)
  .json({
    success: true,
    user,
    token,

  });
};

module.exports = sendToken;
