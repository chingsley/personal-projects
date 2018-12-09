'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _validator = require('../validators/validator');

var _validator2 = _interopRequireDefault(_validator);

var _config = require('../db/config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

class Inspect {
  static signup(req, res, next) {
    return _asyncToGenerator(function* () {
      const response400 = function (message) {
        return res.status(400).json({ status: 400, error: message });
      };
      const {
        firstname,
        lastname,
        othernames,
        username,
        phoneNumber,
        email,
        password,
        confirmPassword,
        adminSecret
      } = req.body;

      const requiredFields = [firstname, lastname, username, phoneNumber, email, password, confirmPassword];
      const missingFields = requiredFields.map(function (field, index) {
        const keys = {
          0: 'firstname',
          1: 'lastname',
          2: 'username',
          3: 'phoneNumber',
          4: 'email',
          5: 'password',
          6: 'confirmPassword'
        };
        return field === undefined || field === '' ? keys[index] : null;
      }).filter(function (field) {
        return field !== null;
      }).join(', ');

      if (!firstname || !lastname || !phoneNumber || !email || !password || !confirmPassword || !username) {
        return response400(`values are required for the following fields: ${missingFields}`);
      }

      if (!_validator2.default.isValidName(firstname)) return response400('invalid first name. First name must be a minimum of 2 characters');
      if (!_validator2.default.isValidName(lastname)) return response400('invalid last name. Last name must be a minimum of 2 characters');
      if (_validator2.default.customValidateEmail(email).error) {
        return response400(_validator2.default.customValidateEmail(email).message);
      }
      if (!_validator2.default.isMatchingPasswords(password, confirmPassword)) return response400('the two passwords do not match');
      if (!_validator2.default.isValidPhoneNumber(phoneNumber)) return response400('Invalid phone number. Phone number cannot contain characters, and must be less than 16 digits long');
      if (_validator2.default.isPasswordTooShort(password)) return response400('Invalid password. Password should have a minimum of 6 characters');

      try {
        const userExists = (yield _config2.default.query('SELECT * FROM users WHERE email=$1', [email.toString().trim()])).rowCount;
        if (userExists) return response400(`${email.toString().trim()} has been taken. Please choose another email`);
      } catch (error) {
        return response400(`${error}`); // keep an eye on this line
      }
      req.firstname = firstname.toString().trim();
      req.lastname = lastname.toString().trim();
      req.othernames = othernames || null;
      req.username = username || 'unspecified';
      req.phoneNumber = phoneNumber.toString().trim();
      req.email = email.toString().trim();
      req.password = password.toString().trim();
      req.picture = req.file ? req.file.path : 'uploads/default_profile_pic.png';
      req.registered = (0, _moment2.default)(new Date());
      req.adminSecret = adminSecret ? adminSecret.toString().trim() : null;

      return next();
    })();
  } // END signup


  static signin(req, res, next) {
    const { email, password } = req.body;
    console.log(email, password);
    if (!email || email === '' || !password) {
      return res.status(400).json({
        status: 400,
        error: 'valid email and password are required'
      });
    }

    if (_validator2.default.customValidateEmail(email).error || _validator2.default.isPasswordTooShort(password)) {
      return res.status(400).json({
        status: 400,
        error: 'email or password not properly formatted'
      });
    }

    req.email = email.toString().trim();
    req.password = password.toString().trim();
    return next();
  } // END signin


} // END Inspect

exports.default = Inspect;