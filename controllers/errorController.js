const sendErrorDev = (err,res) => {
    res.status(err.statusCode).json({
        statusCode: err.statusCode,
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    });
};
const sendErrorProd = (err,res) => {
    console.error('ERROR', err);

    if (err.isOperational) {
        res.status(err.statusCode).json({
            message: err.message,
            status: err.status
        });
    } else {
        res.status(err.statusCode).json({
            message:'Error: please try again or contact web administrator.',
            status: 'error'
        });
    }
};
module.exports = (err,req,res,next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    if (process.env.node_env === 'development') {
        sendErrorDev(err, res);
    } else if (process.env.node_env === 'production') {
        sendErrorProd(err, res);
    }
}