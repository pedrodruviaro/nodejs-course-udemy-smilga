const express = require("express")
const dbConnect = require("./db/connect")
const notFound = require("./middlewares/notFound")
const errorHandlerMiddleware = require("./middlewares/errorHandler")
const tasksRoutes = require("./routes/tasks")
const dotenv = require("dotenv")

const app = express()
const port = process.env.PORT || 8080
dotenv.config()

// middlewares
app.use(express.json())
app.use("/api/v1/tasks", tasksRoutes)

app.use(notFound)
app.use(errorHandlerMiddleware)

async function startDb() {
  try {
    await dbConnect(process.env.MONGO_URI)
    app.listen(port, () => console.log(`Server running on port ${port}`)) // starting server
  } catch (error) {
    throw new Error(error)
  }
}

startDb()
