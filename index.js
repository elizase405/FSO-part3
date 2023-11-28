require("dotenv").config()
const express = require("express")
const PORT = process.env.PORT || 3000
const mongoose = require("mongoose")
const morgan = require("morgan")
const cors = require("cors");
const Person = require("./models/person")

const app = express();

app.use(express.static("dist"))
app.use(express.json())
app.use(cors())

morgan.token("body", (req, res) => 
    JSON.stringify(req.body)
)
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get("/api/persons", (req, res, next) => {
	Person.find({}).then(persons => res.json(persons)).catch(error => next(error))
})

app.get("/api/persons/:id", (req, res, next) => {
	const id = req.params.id
	Person.findById(id)
		.then(result => result ? res.json(result) : res.status(404))
		.catch(err => next(err))
})

app.post("/api/persons", (req, res, next) => {
    const { name, number } = req.body;

    if (!name || !number) {
        return res.status(400).json({error: "No content"}).end()
    }

	/*
    if (persons.find(person => person.name === name))
    {
        return res.status(400).json({error: "Name must be unique"})
    }
	*/
    const person = new Person({ 
	    name,
	    number
    })
    person.save()
		.then(savedPerson => res.status(201).json(savedPerson))
		.catch(error => next(error))
})

app.put("/api/persons/:id", (req, res, next) => {
	const { name, number } = req.body

	if (!name || !number)
		return res.status(400).json({error: "content missing"})

	const updatedPerson = {
		name,
		number
	}
	Person.findByIdAndUpdate(req.params.id, updatedPerson)
		.then(result => res.json(result))
		.catch(error => next(error))
})

app.delete("/api/persons/:id", (req, res, next) => {
	Person.findByIdAndDelete(req.params.id)
		.then(result => res.status(204).json(result))
		.catch(error => next(error))
})

app.get("/info", (req, res) => {
    const text = `<p>Phonebook has info for ${persons.length} people</p><p>${Date()}</p>`
    res.send(text)
})

const errorHandler = (error, req, res, next) => {
	if (error.name === "CastError")
	{
		res.status(400).send({error: "malformatted id"})
	} else if (error.name == "ValidationError")
	{
		res.status(400).json({error: error.message})
	}
	next(error)
}
app.use(errorHandler)

app.listen(PORT, () => {
	console.log(`Server started at PORT ${PORT}`)
})

/*
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)
*/




