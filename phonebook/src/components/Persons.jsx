import "../App.css"

const Persons = ({ filter, persons, newPersons, handleDeletion }) => {
    return (
        <div>
            { filter === "" 
            ? persons.map(person => 
            <div key={person.id}>
                <p className="stayInline">Name: {person.name} Number: {person.number} </p>
                <button className="deleteButton" onClick={handleDeletion(person.name, person.id)}>delete</button>
            </div>)
            : newPersons.map(person => 
            <div key={person.id}>
                <p className="stayInline">Name: {person.name} Number: {person.number} </p>
                <button className="deleteButton" onClick={handleDeletion(person.name, person.id)}>delete</button>
            </div>)
            }
      </div>
    )
}

export default Persons