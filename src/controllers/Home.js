import Student from '../models/Student';

class HomeController {
  async index(req, res) {
    try {
      const newStudent = await Student.create({
        name: 'Ana',
        surname: 'Mariana',
        email: 'anamariana@email.com',
        age: 12,
        weight: 59.3,
        height: 1.43,

      });

      res.json(newStudent);
    } catch (error) {
      console.error(error);
    }
  }
}

export default new HomeController();
