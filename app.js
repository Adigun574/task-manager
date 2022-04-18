const express = require("express")
const { json } = require("express/lib/response")
const app = express()
const tasks = require('./routes/tasks.js')
const notFound = require('./middleware/not-found.js')
const errorHandler = require('./middleware/error-handler.js')

const connectDB = require('./db/connect.js')
require('dotenv').config()

const port = process.env.PORT || 5000

const startServer = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`server listening on port ${port}`)
        })
    } catch (error) {
        console.log('something went wrong')
        console.log(error)
    }
}

startServer()

app.get('/', (req, res) => {
    res.send(`<pre>Task Manager</pre>`)
})

app.use(express.json())
app.use('/api/v1/tasks', tasks)

app.use(notFound)
app.use(errorHandler)
