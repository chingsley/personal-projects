import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';

import authRouter from './routes/authRouter';
/** add more routers */

dotenv.config();
const app = express();

app.use(morgan('dev'));

// Enable CORS
app.use(cors());


// Enable the service of html templates
app.use(express.static('ui'));

// Configure body-pars
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// route to uploaded images
app.use('/uploads', express.static('uploads'));

// Auth routes
app.use('/api/v1/auth', authRouter);

/** add more routes */


/** handle unknown routes in my server */
app.all('*', (req, res) => {
  res.status(404).json({
    status: 404,
    error: 'the specified route cannot be found on this server',
  });
});

/** start the server */
app.listen(process.env.PORT, () => {
  console.log(`server running on port ${process.env.PORT} ...`);
});

export default app;
