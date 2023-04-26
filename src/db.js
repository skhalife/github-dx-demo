// db.js
// Export database connection using sequelize

const Sequelize = require('sequelize');

// Create connection to sqlite db
const db = new Sequelize({
  dialect: 'sqlite',
  storage: 'users.sqlite',
});

// Export connection
module.exports = db;
