const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const AppError = require('./server/utils/appError');
const globalErrorHandler = require('./server/controllers/errorController');
const userRouter = require('./server/routes/userRoutes');

dotenv.config({ path: './config.env' });

//call the express js
const app = express();
app.use(express.json());
app.use(cors());

//Enable CORS
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connection successful!');
  });

app.use('/portfolio/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

const port = process.env.port || 3000;
app.listen(port, () => {
  console.log(process.env.NODE_ENV);
  console.log(`App running on port ${port}`);
});
