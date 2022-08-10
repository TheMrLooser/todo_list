const express = require('express')
const { addNew, getTodo, delToDo, updateTodo,findUserByCookie } = require('../controler/To_do.js')

const router = express.Router();

router.post('/todo/new',addNew);
router.get('/todo',getTodo);
router.get('/yourtodo',findUserByCookie);
router.delete('/del/todo/:id',delToDo);
router.put('/update/todo/:id',updateTodo);


module.exports =  router 