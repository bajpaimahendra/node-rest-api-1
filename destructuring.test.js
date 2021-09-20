
/****************************************
 * require function returns the module.exports object
 */

const config = require('../config');
//console.log('config obj >>> ', config);
console.log('application port >>> ', config.APP_PORT);


/***************************************
 * destructuring of retured object
 */

const { APP_PORT, DEBUG_MODE, REFRESH_SECRET } = require('../config');

console.log('APP_PORT >>> ', APP_PORT);

/***************************************************************************** 
 * ****************************************************************************
*/
const obj = {
    name: "Bajpai",
    age: 37,
    id: 1
}

//simple destructuring
const { name, id } = obj;
console.log("name ", name);
console.log("id ", id);

//using different names for the properties
const { name: myName, age: myAge } = obj;
console.log("myName", myName);
console.log("myAge", myAge);

