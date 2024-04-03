const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    email: {
      type: String,
    },
    gender: {
      type: String,
    },
    role: {
      type: String,
    },
    phone: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    }
  },
);


const Member = mongoose.model('Member', memberSchema);
module.exports = Member;