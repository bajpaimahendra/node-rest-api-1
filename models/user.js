const mongoose = require('mongoose');
const Schema = mongoose.Schema;

autoIncrement = require('mongoose-auto-increment');
//console.log('connection variable comming from wheee ?? >>>>>>>>>>', connection);
//autoIncrement.initialize(connection);
autoIncrement.initialize(mongoose.connection);


const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    address: { type: String },
    password: { type: String, required: true },
    role: { type: String, default: 'customer' },
}, { timestamps: true });

userSchema.plugin(autoIncrement.plugin, 'User');

// userSchema.plugin(autoIncrement.plugin, {
//     model: 'User',
//     field: 'userId',
//     startAt: 100,
//     incrementBy: 1
// });

const User = mongoose.model('User', userSchema);
module.exports = User;
