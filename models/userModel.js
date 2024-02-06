const mongoose = require("mongoose");
const validator = require("validator");
const bcyrpt = require("bcrypt")
const jwt = require("jsonwebtoken")
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Name"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter Valid Email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Password"],
    maxLength: [6, "Password Cannot Exceed 6 Characters"],
    select: false
  },
  avatar: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },

  resetPasswordToken: String,
  resetPasswordTokenExpire: Date,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});
userSchema.pre('save',async function(next){
  this.password =  await bcyrpt.hash(this.password,10)
})

userSchema.methods.getJwtToken = function(){
  return jwt.sign({id: this.id},process.env.JWT_SECRET,{
    expiresIn:process.env.JWT_EXPIRES_TIME 
  })
}

userSchema.methods.isValidPassword = async function(enteredpassword){
return await bcyrpt.compare(enteredpassword,this.password)
}

let model = mongoose.model('User',userSchema);
module.exports = model;
