"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

class UserController {
  async store(req, res) {
    try {
      const newUser = await _User2.default.create(req.body);
      const { id, name, email } = newUser;
      return res.json({ id, name, email });
    } catch (error) {
      return res.status(400).json({
        errors: error.errors.map(err => err.message),
      });
    }
  }

  // Index
  async index(req, res) {
    try {
      const user = await _User2.default.findAll({ attributes: ['id', 'name', 'email'] });
      return res.json(user);
    } catch (error) {
      return res.status(400).json({
        errors: error.errors.map(err => err.message),
      });
    }
  }

  // Show
  async show(req, res) {
    try {
      const user = await _User2.default.findByPk(req.params.id);
      const { id, name, email } = user;
      return res.json({ id, name, email });
    } catch (error) {
      return res.status(400).json({
        errors: error.errors.map(err => err.message),
      });
    }
  }

  // Update
  async update(req, res) {
    try {
      const user = await _User2.default.findByPk(req.userId);

      if (!user) {
        return res.status(400).json({
          errors: ['User not found'],
        });
      }

      const newData = await user.update(req.body);
      const { id, name, email } = newData;

      return res.json({ id, name, email });
    } catch (error) {
      return res.status(400).json({
        errors: error.errors.map(err => err.message),
      });
    }
  }

  // Delete
  async delete(req, res) {
    try {
      const user = await _User2.default.findByPk(req.userId);

      if (!user) {
        return res.status(400).json({
          errors: ['User not found'],
        });
      }

      await user.destroy();

      return res.json({
        success: ['User successfully deleted'],
      });
    } catch (error) {
      return res.status(400).json({
        errors: error.errors.map(err => err.message),
      });
    }
  }
}

exports. default = new UserController();
