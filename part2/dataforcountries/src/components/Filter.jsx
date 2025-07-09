const Filter = ({ filter, handleFilterChange }) => {
    return (
        <div>
        Find countries with <input 
            value={filter} 
            onChange={handleFilterChange} 
        />
        </div>
    )
}
export default Filter;