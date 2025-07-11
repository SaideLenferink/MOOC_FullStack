const Country = ({ country, languages, weather }) => {
  const windSpeedMps = weather ? weather.current.wind_kph / 3.6 : 0;

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <h2>Languages</h2>
      <ul>
        {languages.map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img
        src={country.flags.png}
        alt={`Flag of ${country.name.common}`}
        style={{ width: "150px" }}
      />
      {weather ? (
        <div>
          <h2>Weather in {country.capital}</h2>
          <p>Temperature: {weather.current.temp_c} °C</p>
          <img
            src={`https:${weather.current.condition.icon}`}
            alt={weather.current.condition.text}
          />
          <p>Wind: {windSpeedMps.toFixed(2)} m/s</p>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};
export default Country;
