const express = require('express')
const { addNew, getTodo, delToDo, updateTodo } = require('../controler/To_do.js')

const router = express.Router();

router.post('/todo/new',addNew);
router.get('/todo',getTodo);
router.delete('/del/todo/:id',delToDo);
router.put('/update/todo/:id',updateTodo);


module.exports =  router