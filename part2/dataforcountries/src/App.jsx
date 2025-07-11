import { useState, useEffect, use } from "react";
import Filter from "/src/components/Filter.jsx";
import Countries from "/src/components/Countries.jsx";
import Country from "/src/components/Country.jsx";
import restCountriesService from "/src/services/restcountries.js";
import weatherService from "/src/services/weather.js";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const [showSingle, setShowSingle] = useState(false);
  const [weatherData, setWeatherData] = useState(null);

  const countriesToShow = filter
    ? countries.filter((country) =>
        country.name.common.toLowerCase().includes(filter.toLowerCase())
      )
    : countries;

  const tooManyMatches = countriesToShow.length > 10;
  const singleResult = countriesToShow.length === 1;

  const showCountry = (country) => {
    const countryName = country.name.common;
    setFilter(countryName); // This will filter the list to just this country
    setShowSingle(true);
  };

  useEffect(() => {
    console.log("effect");
    restCountriesService.getAll().then((initialCountries) => {
      setCountries(initialCountries);
    });
  }, []);
  console.log("render", countries.length, "countries");

  useEffect(() => {
    if (singleResult) {
      const capital = countriesToShow[0].capital[0];
      weatherService.getWeatherByCity(capital).then((weatherData) => {
        setWeatherData(weatherData);
        console.log("Weather data for", capital, ":", weatherData);
      });
    }
  }, [singleResult ? countriesToShow[0].name.common : null]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <>
      <div>
        <Filter filter={filter} handleFilterChange={handleFilterChange} />
      </div>
      <div>
        {!showSingle && !filter ? null : tooManyMatches ? (
          <p>Too many matches, specify another filter</p>
        ) : (
          !singleResult && (
            <Countries
              countriesToShow={countriesToShow}
              showCountry={showCountry}
            />
          )
        )}
      </div>
      <div>
        {singleResult && (
          <Country
            country={countriesToShow[0]}
            languages={Object.values(countriesToShow[0].languages)}
            weather={weatherData}
          />
        )}
      </div>
    </>
  );
};

export default App;
