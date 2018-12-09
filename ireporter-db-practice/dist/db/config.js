'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _pg = require('pg');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

const env = process.env.NODE_ENV || 'development';

// I don't need this for test, it is done in package.json.
// This is used only when I want to access the test database directly from postman
// const env = 'test';

const pool = env === 'test' ? new _pg.Pool({ connectionString: process.env.TEST_DATABASE_URL }) : new _pg.Pool({ connectionString: process.env.DATABASE_URL });

exports.default = pool;