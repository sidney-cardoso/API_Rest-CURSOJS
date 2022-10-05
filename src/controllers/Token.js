import jwt from 'jsonwebtoken';
import User from '../models/User';

class TokenController {
  async store(req, res) {
    try {
      const { email = '', password = '' } = req.body;

      if (!email || !password) {
        return res.status(401).json({
          errors: ['Invalid credentials'],
        });
      }
      const user = await User.findOne({ where: { email } });
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
      const token = jwt.sign({ id, email }, secret, tokenExpiration);

      return res.json({ token, user: {name: user.name, id, email} });
    } catch (error) {
      return res.status(400).json(error.errors.map(err => err.message));
    }
  }
}

export default new TokenController();
