'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = require('../db/config');

var _config2 = _interopRequireDefault(_config);

var _emailChecker = require('./emailChecker');

var _emailChecker2 = _interopRequireDefault(_emailChecker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Validator {
  static customValidateEmail(email) {
    return _emailChecker2.default.verifyEmail(email.toString().trim());
  }

  static regxValidateEmail(email) {
    const re = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/ig;
    return re.test(email.trim().toLowerCase());
  }

  static isPasswordTooShort(password) {
    return password.trim().length < 6;
  }

  static isMatchingPasswords(password, confirmPassword) {
    return password.trim() === confirmPassword.trim();
  }

  static isValidName(name) {
    return name.toString().trim().length >= 2;
  }

  static isValidPhoneNumber(phoneNumber) {
    const number = phoneNumber.toString().trim();
    const arr = number.split('');
    if (arr.length > 15) return false;
    for (let i = 0; i < arr.length; i += 1) {
      if (Number.isNaN(Number(arr[i])) && arr[i] !== ' ' && arr[i] !== '+' && arr[i] !== '-') {
        return false;
      }
    }
    return true;
  }
} // END Validator

exports.default = Validator;