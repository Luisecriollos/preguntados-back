const { Schema, model } = require('mongoose');

const validateEmail = function (email) {
  var re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;
  return re.test(email);
};

const UserSchema = new Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: 'Email address is required',
    validate: [validateEmail, 'Invalid email address'],
  },
  name: {
    type: String,
    required: true,
  },
  hi_score_classic: {
    time_left: {
      type: Number,
      default: 0,
    },
    score: {
      type: Number,
      default: 0,
    },
  },
  hi_score_rush: {
    time_left: {
      type: Number,
      default: 0,
    },
    score: {
      type: Number,
      default: 0,
    },
  },
});

module.exports = model('Users', UserSchema);
