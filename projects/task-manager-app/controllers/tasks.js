const Task = require("../models/task")
const asyncWrapper = require("../middlewares/async")
const { createCustomError } = require("../errors/customError")

// controllers
const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find()
  res.status(200).json({ tasks, amount: tasks.length })
})

const getSingleTask = asyncWrapper(async (req, res, next) => {
  const { id: taskId } = req.params

  if (!taskId) {
    res.status(401).json({ error: "Missing taskId param" })
    return
  }

  const task = await Task.findOne({ _id: taskId })

  if (!task) {
    const error = createCustomError(`Task with ID ${taskId} not found`, 404)
    return next(error)
  }

  res.json({ task })
})

const createTask = asyncWrapper(async (req, res) => {
  const task = req.body
  const createdTask = await Task.create(task)
  res.status(201).json(createdTask)
})

const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskId } = req.params

  if (!taskId) {
    return res.status(501).json({ error: "Missing ID param" })
  }

  const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
    new: true,
    runValidators: true,
  })

  if (!task) {
    const error = createCustomError(`Task with ID ${taskId} not found`, 404)
    return next(error)
  }

  res.status(200).json({ task })
})

const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskId } = req.params

  if (!taskId) {
    return res.status(501).send({ error: "Missing required ID param" })
  }

  const task = await Task.findOneAndDelete({ _id: taskId })

  if (!task) {
    const error = createCustomError(`Task with ID ${taskId} not found`, 404)
    return next(error)
  }

  res.status(200).json({ task })
})

module.exports = {
  getAllTasks,
  getSingleTask,
  createTask,
  updateTask,
  deleteTask,
}
