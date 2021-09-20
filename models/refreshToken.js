const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const refreshTokenSchema = new Schema({
    userId: { type: Number, required: true, unique: true },
    token: { type: String, unique: true },
}, { timestamps: false });

const RefreshToken = mongoose.model('RefreshToken', refreshTokenSchema);
module.exports = RefreshToken;
