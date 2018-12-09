'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _authRouter = require('./routes/authRouter');

var _authRouter2 = _interopRequireDefault(_authRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** add more routers */

_dotenv2.default.config();
const app = (0, _express2.default)();

app.use((0, _morgan2.default)('dev'));

// Enable CORS
app.use((0, _cors2.default)());

// Enable the service of html templates
app.use(_express2.default.static('ui'));

// Configure body-pars
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));

// route to uploaded images
app.use('/uploads', _express2.default.static('uploads'));

// Auth routes
app.use('/api/v1/auth', _authRouter2.default);

/** add more routes */

/** handle unknown routes in my server */
app.all('*', (req, res) => {
  res.status(404).json({
    status: 404,
    error: 'the specified route cannot be found on this server'
  });
});

/** start the server */
app.listen(process.env.PORT, () => {
  console.log(`server running on port ${process.env.PORT} ...`);
});

exports.default = app;