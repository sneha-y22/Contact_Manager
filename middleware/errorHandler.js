const {constants} = require ("../constants")
const errorHandler = (err,req,res,next) =>{
    if (res.headersSent) {
        return next(err);
    }

    const statusCode = res.statusCode ? res.statusCode : 500;

    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({
                title:"Validation Failed", 
                message: err.message, 
                stackTrace: err.stack
            });
            break;
        case constants.NOT_FOUND:
            res.json({
                title:"Not Found", 
                message: err.message, 
                stackTrace: err.stack
            });
            break;
        case constants.UNAUTHORIZED:
            res.json({
                title:"Unauthorized", 
                message: err.message, 
                stackTrace: err.stack
            });
            break;
        case constants.FORBIDDEN:
            res.json({
                title:"Forbidden", 
                message: err.message, 
                stackTrace: err.stack
            });
            break;
        default:
            console.log("No error!!  All good :)");
            break;
    }
};

module.exports = errorHandler;