import * as wrap from 'co-express';
import {createGateway} from './model';

const router = require('express').Router();

router.get('/todos', wrap(function *(req, res) {
  const gateway = createGateway(req.db);
  const todos = yield gateway.findAll();
  res.json(todos);
}));

export default router;
