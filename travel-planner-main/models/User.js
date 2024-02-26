const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  activities: {
    type: Array,
    required: false,
  },
  hotels: {
    type: Array,
    required: false,
  },
  flights: {
    type: Array,
    required: false,
  },
  savingGoal: {
    type: Number,
    required: false
  }
});

module.exports = User = mongoose.model("users", UserSchema);
