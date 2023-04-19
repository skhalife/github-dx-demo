const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

let { users } = require('./users');

router.post('/users', (req, res) => {
  let { name } = req.body;
  let id = req.body.id || uuidv4();
  let emoji = req.body.emoji || '👋';

  let user = { id, name, emoji };

  users.push(user);
  res.status(201).json(user);
});

router.get('/users', (req, res) => {
  res.json(users);
});

router.get('/users/:id', (req, res) => {
  let { id } = req.params;
  let user = users.find((user) => user.id === id);
  if (!user) {
    res.status(404).send('User not found');
  } else {
    res.json(user);
  }
});

router.put('/users/:id', (req, res) => {
  let { id } = req.params;
  let { name } = req.body;
  let userIndex = users.findIndex((user) => user.id === id);
  if (userIndex === -1) {
    res.status(404).send('User not found');
  } else {
    let user = { id, name };
    users[userIndex] = user;
    res.json(user);
  }
});

router.delete('/users/:id', (req, res) => {
  let { id } = req.params;
  let userIndex = users.findIndex((user) => user.id === id);
  if (userIndex === -1) {
    res.status(404).send('User not found');
  } else {
    users.splice(userIndex, 1);
    res.sendStatus(204);
  }
});

module.exports = router;
