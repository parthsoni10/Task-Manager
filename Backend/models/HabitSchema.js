const mongoose = require("mongoose");

const HabitSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  duration: {
    type: Number, // 7, 15, 30
    required: true
  },

  startDate: {
    type: Date,
    default: Date.now
  },

  progress: [
    {
      date: Date,
      completed: {
        type: Boolean,
        default: false
      }
    }
  ],

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model("Habit", HabitSchema);