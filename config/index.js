const dotenv = require('dotenv');
const path = require('path');

// let currentWorkingDir = process.cwd();
// console.log('currentWorkingDir >>> ', currentWorkingDir);
// let currentDir = __dirname;
// console.log('currentDir        >>> ', currentDir);

let currentFileDir = path.dirname(__filename);
//console.log('currentDirOfFile   >>>', currentFileDir);

let envPath = path.join(currentFileDir, '../.env');
//console.log('envPath           >>> ', envPath);

try {
    const result = dotenv.config({ path: envPath });
    //console.log('result = ', result);
    if (result.error) {
        throw result.error
    }
} catch (err) {
    console.log('error on config/index = ', err);
}

//console.log('process.env = ', process.env);


/*********** destructuring .env */
module.exports = {
    DEBUG_MODE,
    APP_PORT,
    APP_URL,
    DB_URL,
    JWT_SECRET
} = process.env
