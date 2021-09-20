
//const {DB_URL} =require('./index')
const mongoose = require('mongoose');
console.log('--- db.js included---');
function dbConnect() {
  console.log('DB_URL =', DB_URL);

  // mongoose.connect(`DB_URL`,
  // {useNewUrlParser: true,
  //   useUnifiedTopology: true,
  //   useCreateIndex: true, },
  // ()=>{console.log('connected to db',DB_URL)},
  // (err)=>{console.log(`not connected`)}
  // );

  mongoose.connect(DB_URL);
  var db = connection = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function callback() {
    console.log("Connected");
  });
  //console.log(connection);
return connection;
}
//dbConnect();
/********* exportin function  dbConnect*/
module.exports = dbConnect;