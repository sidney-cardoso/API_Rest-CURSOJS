"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);
var _path = require('path');
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);
// import helmet from 'helmet';
// import { delay } from 'express-delay';

var _home = require('./routes/home'); var _home2 = _interopRequireDefault(_home);
var _user = require('./routes/user'); var _user2 = _interopRequireDefault(_user);
var _token = require('./routes/token'); var _token2 = _interopRequireDefault(_token);
var _student = require('./routes/student'); var _student2 = _interopRequireDefault(_student);
var _photo = require('./routes/photo'); var _photo2 = _interopRequireDefault(_photo);

require('./database');

_dotenv2.default.config();

const whiteList = ['http://localhost:5173'];

const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

class App {
  constructor() {
    this.app = _express2.default.call(void 0, );
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(_cors2.default.call(void 0, corsOptions));
    // this.app.use(helmet());
    // this.app.use(delay(2000));
    this.app.use(_express2.default.urlencoded({ extended: true }));
    this.app.use(_express2.default.json());
    this.app.use(
      '/images/',
      _express2.default.static(_path.resolve.call(void 0, __dirname, '..', 'uploads', 'images')),
    );
  }

  routes() {
    this.app.use('/', _home2.default);
    this.app.use('/users/', _user2.default);
    this.app.use('/tokens/', _token2.default);
    this.app.use('/students/', _student2.default);
    this.app.use('/photos/', _photo2.default);
  }
}

exports. default = new App().app;
