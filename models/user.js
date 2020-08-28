let mongoose = require('mongoose');
let crypto = require('crypto');
let jwt = require('jsonwebtoken');



let UserSchema = new mongoose.Schema({
	username: { type: String, lowercase: true, 
		unique: true },
	hash: String,
	salt: String
});



UserSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(32).toString('hex');
  console.log(this.salt)
	this.hash = crypto.pbkdf2Sync(password, this.salt, 
    10000, 64, 'sha512').toString('hex');
  console.log(this.hash)
}

UserSchema.methods.validPassword = function (password) {
  console.log("in functie")
  console.log(password)
  let hash = crypto.pbkdf2Sync(password, this.salt, 
    10000, 64, 'sha512').toString('hex');
  console.log(hash)
  console.log(this.hash)
  console.log(this.salt)
  return this.hash === hash;
}; 

UserSchema.methods.generateJWT = function () {
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate() + 60);
    console.log(this._id.toHexString())
    console.log(process.env)
    return jwt.sign({
        _id: this._id.toHexString(),
        username: this.username,
        exp: parseInt(exp.getTime() / 1000)
    },process.env.HORSE_BACKEND_SECRET);
};

var user = mongoose.model('user', UserSchema);