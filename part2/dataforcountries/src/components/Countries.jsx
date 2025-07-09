const Countries = ({ countriesToShow }) => {
    return (
        <ul>
            {countriesToShow.map((country) => (
                <li key={country.name.common}>
                    {country.name.common}
                </li>
            ))}
        </ul>
    );
}
export default Countries;