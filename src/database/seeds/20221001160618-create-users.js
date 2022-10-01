const bcryptjs = require('bcryptjs');

module.exports = {
  up: async (queryInterface) => queryInterface.bulkInsert(
    'users',
    [
      {
        name: 'John Doe',
        email: 'john@email.com',
        password_hash: await bcryptjs.hash('12345', 10),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Bob Doe',
        email: 'bob@email.com',
        password_hash: await bcryptjs.hash('81234uy89124unb23', 10),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Mark Doe',
        email: 'mark@email.com',
        password_hash: await bcryptjs.hash('password', 10),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ],
    {},
  ),

  down: () => {},
};
