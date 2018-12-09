'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

_dotenv2.default.config();

class AuthHandler {
  static generateAuthToken(req, res) {
    return _asyncToGenerator(function* () {
      const {
        userDetails, userId, userName, userEmail, userStatus
      } = req;
      const token = _jsonwebtoken2.default.sign({
        userId,
        userName,
        userEmail,
        userStatus
      }, process.env.JWT_SECRET);

      const statusCode = req.wantsToSignUp ? 201 : 200;
      res.status(statusCode).json({
        status: statusCode,
        data: [{
          token: token,
          user: {
            id: userDetails.id,
            firstname: userDetails.firstname,
            lastname: userDetails.lastname,
            othernames: userDetails.othernames || 'not specified',
            email: userDetails.email,
            phoneNumber: userDetails.phonenumber,
            username: userDetails.username,
            registered: userDetails.registered,
            isAdmin: userDetails.is_admin,
            picture: `http://localhost:${process.env.PORT}/${userDetails.picture}`
          }
        }]
      });
    })();
  } // END generateAuthToken

  static authorize(req, res, next) {
    const token = req.header('x-auth');

    try {
      const decoded = _jsonwebtoken2.default.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.userId;
      req.userName = decoded.userName;
      req.userEmail = decoded.userEmail;
      req.userStatus = decoded.userStatus;
      return next();
    } catch (error) {
      return res.status(401).json({
        status: 401,
        error: 'you must be logged in to use this route'
      });
    }
  } // END authorize

  static authorizeAdmin(req, res, next) {
    if (req.userStatus !== 'admin') {
      return res.status(403).json({
        status: 403,
        error: 'Auth error. Only admin can access this route'
      });
    }
    return next();
  } // end static authorizeAdmin
} // end class AuthHandler

exports.default = AuthHandler;