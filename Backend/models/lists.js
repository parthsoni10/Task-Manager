const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema({
    title: String,
    body: String,

    completed: {
        type: Boolean,
        default: false
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    completedAt: {
        type: Date
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

module.exports = mongoose.model('List', ListSchema);