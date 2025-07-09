import { useState, useEffect } from 'react'
import Filter from '/src/components/Filter.jsx'
import Countries from '/src/components/Countries.jsx'
import Country from '/src/components/Country.jsx'
import restCountriesService from '/src/services/restcountries.js'


const App = () => {
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [filter, setFilter] = useState('')

  
  useEffect(() => {
    console.log('effect')
    restCountriesService
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
      })
  }, [])
  console.log('render', countries.length, 'countries')

  const countriesToShow = filter
    ? countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
    : countries

  const tooManyMatches = countriesToShow.length > 10;
  const singleResult = countriesToShow.length === 1;
  

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }


  return (
    <>
      <div>
        <Filter filter={filter} handleFilterChange={handleFilterChange} />
      </div>
      <div>
        {!filter ? null : tooManyMatches
          ? <p>Too many matches, specify another filter</p>
          : (!singleResult && <Countries countriesToShow={countriesToShow} />)
        }
      </div>
      <div>
        {singleResult && (
          <Country 
            country={countriesToShow[0]} 
            languages={Object.values(countriesToShow[0].languages)} 
          />
        )}
      </div>
    </>
  )
}

export default App
