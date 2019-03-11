const express = require('express');
const router = express.Router();
const ToDo = require('../model')("ToDo");
const debug = require('debug')('perfectstyle:todos');

// get all todos
router.get('/list', async (req, res) => {
    try {
        res.json(await ToDo.REQUEST()); // return all todos in JSON format
    } catch (err) {
        res.send(err)
}
});

// create todo and send back all todos after creation
router.post('/', async (req, res) => {
    try {
        // create a todo, information comes from request from Angular
        await ToDo.CREATE(req.body.text);
        res.json(await ToDo.REQUEST()); // return all todos in JSON format
    } catch (err) {
        res.send(err);
    }
});

// delete a todo
router.delete('/:todo_id', async (req, res) => {
  try {
    await ToDo.DELETE(req.params.todo_id);
      res.json(await ToDo.REQUEST()); // return all todos in JSON format
  } catch (err) {
      res.send(err);
  }
});

module.exports = router;
