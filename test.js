/* load app configurations */
const {APP_PORT} = require('./config/');
const logger = require('./utils/logger');
const express = require('express');
const app = express();

console.log('jmd...');

/* load Application level middleware2222222 */
//---make them available in the req.body of the request’s route handling middleware.
app.use(express.json());
app.use(express.urlencoded({extended:false}));

const dbConnect = require('./config/db'); 
var db_connection =  dbConnect();
//console.log('connection >> ==========================',db_connection);
console.log('come here 111111-----');

/* load our API routes */
const appRouter = require('./routes');


//********** App level middleware : log each request and response with request time and response time */


app.use((req, res, next) => {
    //console.log('come here 222222-----');
    logger.info(req.body);
    let oldSend = res.send;
    res.send = function (data) {
      logger.info(JSON.parse(data));
      oldSend.apply(res, arguments);
    }
 
    next();
  })

  app.use('/apis', appRouter);


//   app.use('/',(req, res) => {
//       res.status(404).json({message:'Not found'});
   
// });
//   app.use((req, res, next) => {
//     const err = new Error();
//     err.status = 404;
//     next(err);
// });


// app.use((err, req, res, next) => {
//     console.log(err);
    
//     const status = err.status || 500;
// 	console.log(err.message);
//    // res.status(status).json({ error: { message: err.message } });
//    res.status(404).json({message:'Not found'});
    
// });

/* load Application level middleware */
const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler); 

//console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaa');

/* establish http server connection */
app.listen(APP_PORT, ()=>{
    console.log(`Server is running at ${APP_PORT}`);
});


