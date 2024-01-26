const express = require("express")
const tasksController = require("../controllers/tasks")

const router = express.Router()

router
  .route("/")
  .get(tasksController.getAllTasks)
  .post(tasksController.createTask)

router
  .route("/:id")
  .get(tasksController.getSingleTask)
  .patch(tasksController.updateTask)
  .delete(tasksController.deleteTask)

module.exports = router
