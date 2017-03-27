const router = require('express').Router();
const log = require('bole')('todos/router');

import { findAll } from './model';

router.get('/todos', (req, res) => {
  log.info('GET /todos');

  findAll()
    .then(todos => {
      res.json(todos);
    })
    .catch(error => {
      log.error('failed to findAll', error);
      res.status(500).send(error);
    });
});

export default router;

