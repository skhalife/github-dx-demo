const { v4: uuidv4 } = require('uuid');

// Define test users
// Note: These are not real users, and are only used for testing purposes
// {
//   id: uuidv4(),
//   name: 'first last',
//   emoji: '👦',
// }

let users = [
  {
    id: uuidv4(),
    name: 'Bramble Fright',
    emoji: '👻',
  },
  {
    id: uuidv4(),
    name: 'Sylvie Scream',
    emoji: '🎃',
  },
  {
    id: uuidv4(),
    name: 'Eve Eerie',
    emoji: '🧙',
  },
];

module.exports = {
  users,
};
