const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose').default;

main()
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/todo');
}

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    list: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "List",
    }],
    stats: {
        streak: { type: Number, default: 0 },
        lastCompletedDate: { type: Date }
    }
});

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', UserSchema);
