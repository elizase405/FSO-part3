require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const morgan = require("morgan")
const PORT = 3002
const pwd = process.argv[2]

const app = express()
const MONGO_URI = `mongodb+srv://elizase405:${pwd}@people.bi5zeu1.mongodb.net/Contact?retryWrites=true&w=majority`

mongoose.connect(MONGO_URI).then(() => console.log("Connected to MongoDB")).catch(error => console.log("Failed to connect to MongoDB", error.message))

app.use(express.json())

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    }
}, { timestamp: true })

const User = mongoose.model("User", UserSchema)

morgan.token("post", (req) => {
    if (req.method === "POST") {
        return JSON.stringify({
            "name": process.argv[3],
            "number": process.argv[4]
        })
    }
})
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :post"))

app.get("/api/persons", (req, res, next) => {
    const len = process.argv.length
    if (len === 3)
    {
        return User
            .find({})
            .then(persons => {
                res.json(persons)
                mongoose.connection.close()
            })
            .catch(error => next(error))
    }
    return res.status(400).json({
        error: "Make a get request using 'node mongo.js <password>'"
    })
})

/*
app.get("/api/persons/:id", (req, res) => {
    const id = req.params.id
    if (id <= persons.length) {
        res.json(persons[id - 1])
    } else {
        res.status(400).json({error: "Bad request"}).end()
    }
})
*/

app.post("/api/persons", (req, res, next) => {
    const name = process.argv[3]
    const number = process.argv[4]

    if (!name || !number) {
        return res.status(400).json({ error: "No content" }).end()
    }

    /*
    if (persons.find(person => person.name === name))
    {
        return res.status(400).json({error: "Name must be unique"})
    }
	*/
    const person = new User({ name, number })
    person.save().then(() => res.send(`added ${name} number ${number} to phonebook`)).catch(error => next(error))
})

app.listen(PORT, () => {
    console.log(`Server started at PORT ${PORT}`)
})


