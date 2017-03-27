import * as wrap from 'co-express';
import {createGateway} from './model';

const log = require('../logger')('todos');

const router = require('express').Router();

router.get('/todos', wrap(function *(req, res) {
  const gateway = createGateway(req.db);
  const todos = yield gateway.findAll();
  res.json(todos);
}));

router.post('/todos', wrap(function *(req, res) {
  const gateway = createGateway(req.db);
  log.info('req.body', req.body);
  const todo = yield gateway.insert(req.body);
  res.send(todo);
}));


export default router;
