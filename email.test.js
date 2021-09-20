
/**************************
 * https://www.geeksforgeeks.org/javascript-spread-operator/
 */ 


// let req_file="hello.jpg";
// let user1 = {
//   name: 'Jen',
//   age: 22,
//   ...(req_file && { image: req_file })
// };
//console.log(user1);


// const user1 = {
//   name: 'Jen',
//   age: 22,
// };
// const user2={...user1,address:"delhi"}
// console.log(user2);


// const user1 = {
//   name: 'Jen',
//   age: 22,
//   ...{address:"delhi"}
// };
// console.log(user1);

/*****************************
  Logical AND (&&)
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND
*/

let a = 1;
let b=2;
console.log(b &&  a);
let d = (a &&  b );

console.log(d);


// ///--- https://mailtrap.io/blog/nodemailer-gmail/

// const nodemailer = require('nodemailer');
// const transporter = nodemailer.createTransport({
//   host: 'smtp.gmail.com',
//   port: 465,
//   secure: false, // use SSL
//   service: 'gmail',
//   auth: {
//     user: 'ebuddy900@gmail.com',
//     pass: 'ixfqyhyehijnurrb', //Bajpai@001
//   },
// });
// transporter.verify().then(console.log).catch(console.error);

// transporter.sendMail({
//     from: '"ebuddy" <ebuddy900@gmail.com>', // sender address
//     to: "bajpai.mahendra@gmail.com,mahendra.bajpai@nownow.ng", // list of receivers
//     subject: " nodemailer Test✔", // Subject line
//     text: "There is a new article. It's about sending emails, check it out!", // plain text body
//     html: "<b>There is a new article. It's about sending emails, check it out!</b>", // html body
//   }).then(info => {
//     console.log({info});
//   }).catch(console.error);