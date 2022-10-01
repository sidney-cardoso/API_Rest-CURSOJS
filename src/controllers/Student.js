import Student from '../models/Student';

class StudentController {
  async index(req, res) {
    try {
      const students = await Student.findAll();
      return res.json(students);
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map(e => e.message),
      });
    }
  }

  async store(req, res) {
    try {
      const student = await Student.create(req.body);

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

      const student = await Student.findByPk(id);
      if (!student) {
        return res.status(400).json({
          errors: ['Student not exists'],
        });
      }
      const {
        name, surname, email, age,
      } = student;

      return res.json({
        id, name, surname, email, age,
      });
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

      const student = await Student.findByPk(id);
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

      const student = await Student.findByPk(id);
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

export default new StudentController();
