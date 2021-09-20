const appRouter = require("express").Router();




const index = require('../controllers/index.controller');
const checkValue = require('./../middlewares/checkvalue');
const refreshController = require('../controllers/refreshToken.controller');

appRouter.get('/middleware/:id', checkValue, index);

const userRouter = require("./userRoutes");
appRouter.use("/", userRouter);

appRouter.post('/refresh-token', refreshController.refresh);

const {jonDemo} = require('../controllers/demo.controller');
appRouter.post('/demo-jon', jonDemo);

module.exports = appRouter;
//console.log('index routes...........', router);