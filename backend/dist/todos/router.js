"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router = require('express').Router();
const log = require('bole')('todos/router');
const model_1 = require("./model");
router.get('/todos', (req, res) => {
    log.info('GET /todos');
    model_1.findAll()
        .then(todos => {
        res.json(todos);
    })
        .catch(error => {
        log.error('failed to findAll', error);
        res.status(500).send(error);
    });
});
exports.default = router;
