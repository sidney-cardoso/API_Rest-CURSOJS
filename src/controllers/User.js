import User from '../models/User';

class UserController {
  async store(req, res) {
    try {
      const newUser = await User.create(req.body);
      return res.json(newUser);
    } catch (error) {
      return res.status(400).json({
        errors: error.errors.map(err => err.message),
      });
    }
  }

  // Index
  async index(req, res) {
    try {
      const user = await User.findAll();
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
      const user = await User.findByPk(req.params.id);
      return res.json(user);
    } catch (error) {
      return res.status(400).json({
        errors: error.errors.map(err => err.message),
      });
    }
  }

  // Update
  async update(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['id not sent'],
        });
      }

      const user = await User.findByPk(id);

      if (!user) {
        return res.status(400).json({
          errors: ['User not found'],
        });
      }

      const newData = await user.update(req.body);

      return res.json(newData);
    } catch (error) {
      return res.status(400).json({
        errors: error.errors.map(err => err.message),
      });
    }
  }

  // Delete
  async delete(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['id not sent'],
        });
      }

      const user = await User.findByPk(id);

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

export default new UserController();
