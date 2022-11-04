"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

class TokenController {
  async store(req, res) {
    try {
      const { email = '', password = '' } = req.body;

      if (!email || !password) {
        return res.status(401).json({
          errors: ['Invalid credentials'],
        });
      }
      const user = await _User2.default.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({
          errors: ['User not found'],
        });
      }

      if (!(await user.passwordIsValid(password))) {
        return res.status(401).json({
          errors: ['Invalid password'],
        });
      }
      const { id } = user;
      const secret = process.env.TOKEN_SECRET;
      const tokenExpiration = {
        expiresIn: process.env.TOKEN_EXPIRATION,
      };
      const token = _jsonwebtoken2.default.sign({ id, email }, secret, tokenExpiration);

      return res.json({ token, user: { name: user.name, id, email } });
    } catch (error) {
      return res.status(400).json(error.errors.map(err => err.message));
    }
  }
}

exports. default = new TokenController();
