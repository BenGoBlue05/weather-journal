let projectData = {};

const express = require('express')

const app = express()

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
const cors = require('cors')
app.use(cors())

app.use(express.static('website'))

const port = 3000

const server = app.listen(port, () => console.log(`running on localhost: ${port}`))

app.post('/add', (req, res) => {
    projectData = req.body
    res.sendStatus(201)
})

app.get('/all', (_, res) => res.status(200).send(projectData))
