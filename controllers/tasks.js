const Task = require('../models/Task.js')
const asyncWrapper = require('../middleware/async.js')
const { createCustomError } = require('../errors/custom-error.js')

const getAllTasks = asyncWrapper( async (req, res) => {
    const tasks = await Task.find()
    res.status(200).json({tasks, length: tasks.length})
})

const createTask = asyncWrapper( async (req, res) => {
    const task = await Task.create(req.body)
    res.status(201).json({task})
})

const getTask = asyncWrapper( async (req, res, next) => {
    const task = await Task.findOne({_id:req.params.id})
    if(!task){
        // const error = new Error('Not found')
        // error.status = 404
        // return next(error)
        // return res.status(404).json({message: `No task with id ${req.params.id} found`})
        return next(createCustomError(`No task with id ${req.params.id} found`, 404))
    }
    res.status(200).json({task})
})

const updateTask = async (req, res) => {
    const {id: taskId} = req.params
    const task = await Task.findOneAndUpdate({_id:taskId}, req.body, {
        new:true,
        runValidators:true
    })
    if(!task){
        // return res.status(404).json({message: `No task with id ${req.params.id} found`})
        return next(createCustomError(`No task with id ${req.params.id} found`, 404))
    }
    res.status(200).json({task})
}

const deleteTask = async (req, res) => {
    const { id: taskId} = req.params
    const task = await Task.findOneAndDelete({_id: taskId})
    if(!task){
        return res.status(404).json({message: `No task with id ${req.params.id} found`})
    }
    res.status(200).json({task})
}

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}