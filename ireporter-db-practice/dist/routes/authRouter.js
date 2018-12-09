'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _inspector = require('../middleware/inspector');

var _inspector2 = _interopRequireDefault(_inspector);

var _authController = require('../controllers/authController');

var _authController2 = _interopRequireDefault(_authController);

var _authHandler = require('../middleware/authHandler');

var _authHandler2 = _interopRequireDefault(_authHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = new _express.Router();

const storage = _multer2.default.diskStorage({
  destination(req, file, callback) {
    callback(null, './uploads');
  },
  filename(req, file, callback) {
    callback(null, file.originalname);
  }
});

const fileFilter = (req, file, callback) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    callback(null, true); // accept the file
  } else {
    callback(null, false); // reject the file: don't save the file, but do not throw an error
  }
};

const upload = (0, _multer2.default)({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter
});

router.post('/signup', upload.single('picture'), _inspector2.default.signup, _authController2.default.signup, _authController2.default.signin, _authHandler2.default.generateAuthToken);
router.post('/login', upload.none(), _inspector2.default.signin, _authController2.default.signin, _authHandler2.default.generateAuthToken);

exports.default = router;