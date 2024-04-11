import { useEffect, useState } from 'react';
import { fetchData, deleteData, postData, updateData } from './services/notes.js';


const Filter = ({ search, setSearch }) => (
  <div>
    Filter shown with <input value={search} onChange={(e) => setSearch(e.target.value)} />
  </div>
);

const PersonForm = ({ handleSubmit, newName, setNewName, newNumber, setNewNumber }) => (
  <form onSubmit={handleSubmit}>
    <div>
      name: <input value={newName} onChange={(e) => setNewName(e.target.value)} />
    </div>
    <div>
      number: <input value={newNumber} onChange={(e) => setNewNumber(e.target.value)} />
    </div>
    <div>
      <button type="submit">Add</button>
    </div>
  </form>
);

const Persons = ({ persons , deleteData}) => (
  <>
    <h2>Numbers</h2>
    {persons.map((person) => (
      <div key={person.id}>
      <p>
       <b>{person.name}</b> {person.number} <button onClick={() => deleteData(person.id)}>Delete</button>
      </p>
    </div>
    ))}
  </>
);

const ErrorNotification  = ({ message }) => {
  return (
    <div className="error">
      {message}
    </div>
  )
}

const SuccessNotification = ({ message }) => {
  return (
    <div className="success">
      {message}
    </div>
  )
}

const App = () => {

  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  
  useEffect(() => {
    const fetchDataFromServer = async () => {
      try {
        const data = await fetchData();
        setPersons(data);
      } catch (error) {
        alert(error.message);
      }
    };
    fetchDataFromServer();
  }, []);


  const handleSubmit = (event) => {
    event.preventDefault();
    const existingPerson = persons.find(person => person.name === newName);
    if (existingPerson) {
      if(window.confirm(`${newName} is already on the phonebook, replace the old number with a new one?`)){
        handleUpdate(existingPerson.id, newNumber)
      }
      else{
        return;
      }
    }
    else{
      const newPerson = {name: newName, number: newNumber};
      setPersons([...persons, newPerson]);
      postData(newPerson)
      setNewName('');
      setNewNumber('');
      setSuccessMessage(`Added ${newPerson.name}`)
      setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
    }
  };


  const handleUpdate = async (id) => {
    const personToUpdate = persons.find(person => person.id === id);
    try {
      const updatedPerson = { ...personToUpdate, number: newNumber };
      await updateData(id, updatedPerson);
      const updatedPersons = persons.map(person =>
        person.id === id ? updatedPerson : person
      );
      setPersons(updatedPersons);
    } catch (error) {
      if (error.message.includes('404')) {
        setErrorMessage(`${personToUpdate.name} is already removed from the server. 404`);
        setTimeout(() => {
          setErrorMessage('');
        }, 10000);
      } else {
        alert(error.message);
      }
    }
  };


  const handleDeletePerson = async (id) => {
    const personToDelete = persons.find(person => person.id === id);
    try {
      if (window.confirm(`Delete ${personToDelete.name}?`)) {
        await deleteData(id);
        const updatedPersons = persons.filter(person => person.id !== id);
        setPersons(updatedPersons);
      }
    } catch (error) {
      if (error.message.includes('404')) {
        setErrorMessage(`${personToDelete.name} is already removed from the server. 404`);
        setTimeout(() => {
          setErrorMessage('');
        }, 10000);
      } else {
        alert(error.message);
      }
    }
  };

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} setSearch={setSearch} />
      <h2>Add new</h2>
      {successMessage.length > 0 &&
        <SuccessNotification message={successMessage} />
      }
      {errorMessage.length > 0 &&
        <ErrorNotification  message={errorMessage} />
      }
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />
      <Persons persons={filteredPersons} deleteData={handleDeletePerson} updateData={handleUpdate} />
    </div>
  );
};

export default App;
