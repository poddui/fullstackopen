import { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );
  

  return (
    <div>
      <h1>Country Information</h1>
      <div>
        Find countries <input value={search} onChange={handleChange} />
      </div>
      {filteredCountries.length > 10 ? (
        <p>Too many matches, please specify another filter.</p>
      ) : filteredCountries.length > 1 ? (
        <ul>
          {filteredCountries.map(country => (
            <p key={country.cca3}>{country.name.common}</p>
          ))}
        </ul>
      ) : filteredCountries.length === 1 ? (
        <div>
          <h2>{filteredCountries[0].name.common}</h2>
          <p>Capital: {filteredCountries[0].capital}</p>
          <p>Population: {filteredCountries[0].population}</p>
          <p>Area: {filteredCountries[0].area} km2</p>
          <h3>Languages</h3>
          <ul>
            {Object.values(filteredCountries[0].languages).map(language => (
              <li key={language}>{language}</li>
            ))}
          </ul>
          <img
            src={filteredCountries[0].flags.png}
            alt={`Flag of ${filteredCountries[0].name.common}`}
            style={{ width: '250px', height: 'auto' }}
          />
        </div>
      ) : (
        <p>No countries found.</p>
      )}
    </div>
  );
};

export default App;
