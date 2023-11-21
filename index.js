require("dotenv").config()
const express = require("express")
const PORT = process.env.PORT || 3000
const morgan = require("morgan")

const app = express();

app.use(express.json())
app.use(express.static("dist"))

morgan.token("body", (req, res) => 
    JSON.stringify(req.body)
)
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get("/api/persons", (req, res) => {
    res.json(persons)
})

app.get("/api/persons/:id", (req, res) => {
    const id = req.params.id
    if (id <= persons.length) {
        res.json(persons[id - 1])
    } else {
        res.status(400).json({error: "Bad request"}).end()
    }
})

app.post("/api/persons", (req, res) => {
    const id = Math.ceil(Math.random(0, 1) * 10000);
    const { name, number } = req.body;

    if (!name || !number) {
        return res.status(400).json({error: "No content"}).end()
    }

    if (persons.find(person => person.name === name))
    {
        return res.status(400).json({error: "Name must be unique"})
    }

    const newPerson = { id, name, number }
    persons = persons.concat(newPerson);
    res.json(persons).status(200)
})

app.delete("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id)
    if (id <= persons.length) {
        console.log("Before: ", persons)
        // console.log(type(id), type(person[0].id))
        persons = persons.filter(person => person.id != id)
        console.log("After: ", persons)
    } else {
        res.status(400).json({error: "Bad request"}).end()
    }
})

app.get("/info", (req, res) => {
    const text = `<p>Phonebook has info for ${persons.length} people</p><p>${Date()}</p>`
    res.send(text)
})



app.listen(PORT, () => {
	console.log(`Server started at PORT ${PORT}`)
})

/*
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)
*/




