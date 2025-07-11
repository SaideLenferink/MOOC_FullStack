const Countries = ({ countriesToShow, showCountry }) => {
  return (
    <ul>
      {countriesToShow.map((country) => (
        <li key={country.name.common}>
          {country.name.common}
          <button onClick={() => showCountry(country)}>Show</button>
        </li>
      ))}
    </ul>
  );
};
export default Countries;
