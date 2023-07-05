const AppError = require('../utils/appError');

const handleCastErrorDB = (err) => {
  console.log(err.isOperational);
  console.log('Good!');
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.keyValue.name;
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError('Invalid token. Please login again!', 401);

const handleJWTExpireError = () => {
  return new AppError('Your token is expired. Please login again!', 401);
};

const sendErrorProd = (err, res) => {
  //Operational, trusted error: send message to client

  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

    //Programming or other unknown error: don't leak error details
  } else {
    // 1) Log error
    console.error('ERROR🔥', err);

    //2) Send generic error
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    });
  }
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

module.exports = function (err, req, res, next) {
  err.statusCode = err.statusCode || 500; //500 means internal server error
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    // console.log(err);
    let error = JSON.parse(JSON.stringify(err));
    // console.log(error);÷
    // console.log(error.name);
    if (error.name === 'CastError') {
      error = handleCastErrorDB(error);
    }
    //duplication value using error.code
    if (error.code === 11000) {
      error = handleDuplicateFieldsDB(error);
    }
    if (error.name === 'ValidationError') {
      error = handleValidationErrorDB(error);
    }
    if (error.name === 'JsonWebTokenError') {
      error = handleJWTError();
    }
    if (error.name === 'TokenExpiredError') {
      error = handleJWTExpireError();
    }

    sendErrorProd(error, res);
    // sendErrorProd(err, res);
  }
};

// module.exports = (err, req, res, next) => {
//   // console.log(err.stack);
//   err.statusCode = err.statusCode || 500; //500 means internal server error
//   err.status = err.status || 'error';

//   if (process.env.NODE_ENV === 'development') {
//     sendErrorDev(err, res);
//   } else if (process.env.NODE_ENV === 'production') {
//     console.log('hello hello');
//     // console.log(err);
//     let error = JSON.parse(JSON.stringify(err));
//     console.log(error);
//     // console.log(error.name);
//     if (error.name === 'CastError') {
//       error = handleCastErrorDB(error);
//     }
//     //duplication value using error.code
//     if (error.code === 11000) {
//       error = handleDuplicateFieldsDB(error);
//     }
//     if (error.name === 'ValidationError') {
//       error = handleValidationErrorDB(error);
//     }
//     if ((error.name = 'JsonWebTokenError')) {
//       error = handleJWTError();
//     }
//     if ((error.name = 'TokenExpiredError')) {
//       error = handleJWTExpireError();
//     }

//     sendErrorProd(error, res);
//     // sendErrorProd(err, res);
//   }
// };
