const { DEBUG_MODE } =require('../config');
const { ValidationError } =require('joi');
const CustomErrorHandler =require('../services/CustomErrorHandler');
///---error-handling functions MUST have four arguments instead of three – err, req, res, next.
const errorHandler = (err, req, res, next) => {
   let statusCode = 500;
    let data = {
        message: 'Internal server error',
        ...(DEBUG_MODE === 'true' && { originalError: err.message })
        //...(DEBUG_MODE === 'true' &&  thisLine(err) )
    }

    if (err instanceof ValidationError) {
        statusCode = 422;
        data = {
            message: err.message
        }
    }

    if (err instanceof CustomErrorHandler) {
        statusCode = err.status;
        data = {
            message: err.message
        }
    }
    
    // console.log('>> = ', thisLine(err));
    // console.log(">> ", Error.stackTraceLimit);
    // console.log(">> ", err.message);
    // console.log(">> ", err.stack);
    return res.status(statusCode).json(data);
}

/*
    Parse Error
*/

function thisLine(err) {
    //console.log('====================', err);
    console.log('*****************',err.name,'************');
    if(err.name =='Error'||err.name =='TypeError'|| err.name =='ReferenceError'){
        //console.log('jmd..........',err.message);
        //const e = new Error();
        const regex = /\((.*):(\d+):(\d+)\)$/
        //const match = regex.exec(e.stack.split("\n")[1]);
        const match = regex.exec(err.stack.split("\n")[1]);
        return {
        errorName:err.name,    
        originalError: err.message,
        filepath: match[1],
        line: match[2],
        column: match[3]
        };
    }else{
        return {
            errorName:err.name, 
            originalError: err.message,
            };
    }
  }

module.exports=errorHandler;