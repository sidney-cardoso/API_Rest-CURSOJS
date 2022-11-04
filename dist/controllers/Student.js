"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Student = require('../models/Student'); var _Student2 = _interopRequireDefault(_Student);
var _Photo = require('../models/Photo'); var _Photo2 = _interopRequireDefault(_Photo);

class StudentController {
  async index(req, res) {
    try {
      const students = await _Student2.default.findAll({
        attributes: ['id', 'name', 'surname', 'email', 'age', 'weight', 'height'],
        order: [['id', 'DESC'], [_Photo2.default, 'id', 'DESC']],
        include: {
          model: _Photo2.default,
          attributes: ['url', 'filename'],
        },
      });
      return res.json(students);
    } catch (err) {
      return res.status(400).json({
        error: [err.code],
      });
    }
  }

  async store(req, res) {
    try {
      const student = await _Student2.default.create(req.body);

      return res.json(student);
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map(e => e.message),
      });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['Id not found'],
        });
      }

      const student = await _Student2.default.findByPk(id, {
        attributes: ['id', 'name', 'surname', 'email', 'age', 'weight', 'height'],
        order: [['id', 'DESC'], [_Photo2.default, 'id', 'DESC']],
        include: {
          model: _Photo2.default,
          attributes: ['url', 'filename'],
        },
      });

      if (!student) {
        return res.status(400).json({
          errors: ["Student don't exists"],
        });
      }

      return res.json(student);
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map(error => error.message),
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['Id not found'],
        });
      }

      const student = await _Student2.default.findByPk(id);
      if (!student) {
        return res.status(400).json({
          errors: ['Student not exists'],
        });
      }
      const updatedStudent = await student.update(req.body);

      const {
        name, surname, email, age,
      } = updatedStudent;

      return res.status(200).json({
        id, name, surname, email, age,
      });
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map(error => error.message),
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['Id not found'],
        });
      }

      const student = await _Student2.default.findByPk(id);
      if (!student) {
        return res.status(400).json({
          errors: ['Student not exists'],
        });
      }
      await student.destroy();

      return res.status(200).json({
        success: ['Student successfully deleted'],
      });
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map(error => error.message),
      });
    }
  }
}

exports. default = new StudentController();
