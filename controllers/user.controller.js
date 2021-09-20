/*
    CRUD operations ( create, read, update and delete )
*/
console.log('--- user controller included ---');
const bcrypt = require('bcrypt');

const { DEBUG_MODE, REFRESH_SECRET } = require('../config');
const { isUserValidated_2, isValiLloginCredentials } = require('./../validators/user.validator');
const CustomErrorHandler = require('../services/CustomErrorHandler');
const JwtService = require('../services/JwtService');
const logger = require('../utils/logger');
const UserModel = require('../models/user');
const RefreshToken = require('../models/refreshToken');

// console.log('JWT_SECRET = ', JWT_SECRET);

// logger.info('error', 'sssssssssss');
// logger.info('test', 'testing......');
// logger.info("127.0.0.1 - there's no place like home");

/*
    create operation
    Register User
*/



const createUser = async (req, res, next) => {

    //console.log('--------',req);
    try {
        isUserValidated_2(req, res, next);
    }
    catch (err) {
        //console.log('err===', err);
        return next(err);
    }

    /**********
     * 
    try {
        const {error} = isUserValidated(req.body);
        if(error){
            return next(error);
        }
    }catch(err) {
        return next(err);
    }
    */

    const { role, name, email, address, password } = req.body; // destructuring body obj
    const hashedPassword = await bcrypt.hash(password, 10);
    //console.log(hashedPassword);
    const userData = new UserModel({
        role,
        name,
        email,
        address,
        password: hashedPassword
    });
    try {
        const result = await userData.save();
        //console.log(result);
    } catch (err) {
        //console.log('Catched Error = ', err);
        if (DEBUG_MODE == 'true') {
            return next(err); // call errorHandler app level middleware / service 
        }
        return next(CustomErrorHandler.serverError());
    }

    res.json({ message: 'You have Successfully Registered' });

    //return res.status(200).send({message: 'welcoe to createUser Function'});
}

/*
    read operation
    login User
*/

const loginUser = async (req, res, next) => {
    /******** Validation */

    /********
    const Joi = require('joi');
    console.log('--------', req.body);
    
    const loginSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    });
    const { error } = loginSchema.validate(req.body);

    if (error) {
        return next(error);
    }
    */

    /******** Validation */
    try {
        isValiLloginCredentials(req, res, next);
    } catch (err) {
        //console.log('Catched Error = ', err);
        if (DEBUG_MODE == 'true') {
            return next(err); // call errorHandler app level middleware / service 
        }
        return next(CustomErrorHandler.serverError());
    }
    /********* check user in DB */
    let loggedInUser;
    try {
        loggedInUser = await UserModel.findOne({ email: req.body.email });
        if (!loggedInUser) {
            return next(CustomErrorHandler.wrongCredentials());
        }
        //--console.log(req.body.password);
        //--console.log(user.password);
        // compare the password
        const match = await bcrypt.compare(req.body.password, loggedInUser.password);
        if (!match) {
            return next(CustomErrorHandler.wrongCredentials());
        }
        // Toekn
        const access_token = JwtService.sign({ _id: loggedInUser._id, role: loggedInUser.role });
        const refresh_token = JwtService.sign({ _id: loggedInUser._id, role: loggedInUser.role }, '1y', REFRESH_SECRET);
        // database whitelist
        //await RefreshToken.create({userId:loggedInUser._id, token: refresh_token });
        /***Update or Insert upsert: true  */
        RefreshToken.findOneAndUpdate(
            { userId: loggedInUser._id }, // find a document with that filter
            { userId: loggedInUser._id, token: refresh_token }, // document to insert when nothing was found
            { upsert: true, new: true, runValidators: true }, // options
            function (err, doc) { // callback
                if (err) {
                    // handle error
                } else {
                    // handle document
                }
            }
        );
        return res.json({ access_token, refresh_token });
    } catch (err) {
        //console.log('Catched Error = ', err);
        if (DEBUG_MODE == 'true') {
            return next(err); // call errorHandler app level middleware / service 
        }
        return next(CustomErrorHandler.serverError());

    }

    //res.json({ message: 'Login Successfully' });
}


/*
    read operation from entire table/collection
    Function getAllUsers
*/

const getAllUsers = async (req, res, next) => {
    let UsersList;
    try {
        console.log('--- getAllUsers ---');
        UsersList = await UserModel.find({});//when fail its goes to catch
        //console.log(UsersList);
        if (UsersList.length == 0) {
            return next(CustomErrorHandler.notFound());
        }

    } catch (err) {
        console.log('Catched Error = ', err);
        // return res.status(404).send({message:err.message});
        //logger.info(`${req.url} ${err}`);

        if (DEBUG_MODE == 'true') {
            return next(err); // call errorHandler app level middleware / service 
        }
        return next(CustomErrorHandler.serverError());
    }
    return res.status(200).json({ data: UsersList });
}

/*
    Function updateUser
*/

const updateUser = (req, res, next) => {
    console.log('--- updateUser ---');
}


/******************
 *  Util Functions
 */
function isUserValidated(reqBody) {
    // To removing the backward slashes and the double quotes
    const validatorOptions = {
        errors: {
            wrap: {
                label: ''
            }
        }
    };
    const { error } = userValidator.validate(reqBody, validatorOptions);
    return { error };
}


module.exports = { createUser, loginUser, getAllUsers }