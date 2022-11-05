"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

 class Student extends _sequelize.Model {
  static init(sequelize) {
    super.init({
      name: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [2, 255],
            msg: 'Nome deve ter entre 2 e 255 caracteres',
          },
        },

      },
      surname: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [2, 255],
            msg: '',
          },
        },
      },
      email: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
        unique: {
          msg: 'E-mail must be unique',
        },
        validate: {
          isEmail: {
            msg: 'Invalid E-mail',
          },
        },
      },
      age: {
        type: _sequelize2.default.INTEGER,
        defaultValue: '',
        validate: {
          isInt: {
            msg: 'Age must a integer number',
          },
        },
      },
      weight: {
        type: _sequelize2.default.FLOAT,
        defaultValue: '',
        validate: {
          isFloat: {
            msg: 'Weight must a number',
          },
        },
      },
      height: {
        type: _sequelize2.default.FLOAT,
        defaultValue: '',
        validate: {
          isFloat: {
            msg: 'Height must a number',
          },
        },
      },

    }, {
      sequelize,
    });
    return this;
  }

  static associate(models) {
    this.hasMany(models.Photo, { foreignKey: 'student_id' });
  }
} exports.default = Student;
