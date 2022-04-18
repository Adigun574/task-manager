const express = require('express')
const router = express.Router()
const { getAllTasks, createTask, deleteTask, getTask, updateTask } = require('../controllers/tasks.js')

router.get('/', getAllTasks)
router.post('/', createTask)
router.get('/:id', getTask)
router.patch('/:id', updateTask)
router.delete('/:id', deleteTask)


module.exports = router