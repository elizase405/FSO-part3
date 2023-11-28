const mongoose = require("mongoose")

mongoose.set("strictQuery", false)
const uri = process.env.MONGO_URI

mongoose.connect(uri)
    .then(() => {
        console.log("Connected to MongoDB")
    })
    .catch(error => {
        console.log("Error connecting to MongoDB", error.message)
    })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number: {
        type: String,
        match: /^\d{2,3}-\d{6,12}$/,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model("Person", personSchema)
