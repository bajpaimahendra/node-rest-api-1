const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
  name: String,
  age: Number
});

const addressSchema = Schema({
  address: String,
  personId: [{ type: Schema.Types.ObjectId, ref: 'Person' }]
});

const Address = mongoose.model('Address', addressSchema);
const Person = mongoose.model('Person', userSchema);
module.exports={Address,Person};