const Persons = ({ personsToShow, handleDelete }) => (
    <ul>
        {personsToShow.map((person) => (
            <li className='note' key={person.id}>
                {person.name} {person.number}
                <button onClick={() => handleDelete(person.id)}>delete</button>
            </li>
        ))}
    </ul>
);

export default Persons;