import pool from '../db/config';
import emailChecker from './emailChecker';

class Validator {
  static customValidateEmail(email) {
    return emailChecker.verifyEmail(email.toString().trim());
  }

  static regxValidateEmail(email) {
    const re = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/ig;
    return re.test(email.trim().toLowerCase());
  }

  static isPasswordTooShort(password) {
    return password.toString().trim().length < 6;
  }

  static isMatchingPasswords(password, confirmPassword) {
    return password.toString().trim() === confirmPassword.toString().trim();
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
}// END Validator

export default Validator;
