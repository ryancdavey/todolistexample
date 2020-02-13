var mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
  todos: {
    type: Array
  }

});

User.pre('save', function(next) {
  // Check if document is new or a new password has been set
  if (this.isNew || this.isModified('password')) {
  // Saving reference to this because of changing scopes
  const document = this;
  bcrypt.hash(document.password, saltRounds,
    function(err, hashedPassword) {
    if (err) {
      next(err);
    }
    else {
      document.password = hashedPassword;
      next();
    }
  });
  } else {
    next();
  }
});

var User = mongoose.model('User', UserSchema);
module.exports = User;