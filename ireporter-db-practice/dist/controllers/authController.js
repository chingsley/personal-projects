'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _config = require('../db/config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

class AuthController {
  static signup(req, res, next) {
    return _asyncToGenerator(function* () {
      const {
        firstname,
        lastname,
        othernames,
        username,
        phoneNumber,
        email,
        password,
        picture,
        registered,
        adminSecret
      } = req;
      const isAdmin = adminSecret === process.env.ADMIN_SECRET;

      try {
        // Hash password and save user to database
        const hashedPassword = yield _bcrypt2.default.hash(password, 10);
        const dbQuery = `INSERT INTO users(
                firstname,
                lastname,
                othernames,
                username,
                phonenumber,
                email,
                password,
                picture,
                registered,
                is_admin
            ) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`;
        yield _config2.default.query(dbQuery, [firstname, lastname, othernames, username, phoneNumber, email, hashedPassword, picture, registered, isAdmin]);

        req.wantsToSignUp = true;
        return next();
      } catch (error) {
        return res.status(400).json({ error });
      }
    })();
  } // END signup


  static signin(req, res, next) {
    return _asyncToGenerator(function* () {
      const { email, password } = req;
      const response400 = function (message) {
        return res.status(400).json({ status: 400, error: message });
      };

      try {
        const userExists = (yield _config2.default.query('SELECT * FROM users WHERE email=$1', [email])).rowCount;
        if (!userExists) return response400('Invalid email or password');
        const userDetails = (yield _config2.default.query('SELECT * FROM users WHERE email=$1', [email])).rows[0];
        const correctPassword = yield _bcrypt2.default.compare(password, userDetails.password);
        if (!correctPassword) return response400('Invalid email or password');

        // Append important payload to request object
        req.userDetails = userDetails;
        req.userId = userDetails.id;
        req.userName = userDetails.username;
        req.userEmail = userDetails.email;
        req.userStatus = userDetails.is_admin ? 'admin' : 'customer';

        return next();
      } catch (error) {
        return res.status(500).json({
          status: 500,
          error: 'internal server error'
        });
      }
    })();
  } // END signin

} // END AuthController

exports.default = AuthController;