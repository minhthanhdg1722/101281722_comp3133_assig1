const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please Enter Your User Name'],
        trim: true,
        unique: [true, "This user name has existed"]
    },
    firstname: {
        type: String,
        required: [true, 'Please Enter Your First Name'],
        trim: true,
        lowercase: true
    },
    lastname: {
        type: String,
        required: [true, 'Please Enter Your Last Name'],
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Please Enter Your Password'],
        minlength: 6,
        validate: function(value) {
            passwordRegex = /^[A-Za-z0-9#$&_]+$/
            return passwordRegex.test(value);}
    },
    type: {
        type: String
    },
    token: {
        type: String
    },
    email: {
        type: String,
        required: true,
        trim: true,
        validate: function(value) {
          var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
          return emailRegex.test(value);
        }
      }
})

module.exports = mongoose.model("User", UserSchema);

