const userRouter = require('express').Router();

const{createUser, loginUser, getAllUsers} = require('../controllers/user.controller');
const {isUserValidated_2, isValiLloginCredentials} = require('../validators/user.validator');

const authenticateToken = require('./../middlewares/auth');

//userRouter.post('/user/register', isUserValidated_2, createUser);
userRouter.post('/user/register', createUser);

//userRouter.post('/user/login',isValiLloginCredentials, loginUser);
userRouter.post('/user/login', loginUser);
userRouter.get('/user/list',authenticateToken, getAllUsers);


module.exports=userRouter;
//console.log('user routes...........', router);