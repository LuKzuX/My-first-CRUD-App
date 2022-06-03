const express = require('express')
const app = express()
const routes = require('./routes/routes')
const connectDB = require('./database/connect')
const notFound = require('./middleware/notFound')
const errorHandler = require('./middleware/errorHandler')

app.use(express.json())
app.use('/taskmanager/tasks', routes)
app.use(notFound)
app.use(errorHandler)

const connectionString = "mongodb+srv://user:mongodbprojects12@projects.eaza7.mongodb.net/TASK-MANAGER?retryWrites=true&w=majority"
const PORT = 5000

const start = async () => {
    try {
        await connectDB(connectionString)
        app.listen(PORT, () => console.log(`Server listening at port ${PORT}...`))
    } catch (error) {
        console.log(error);
    }
}

start()