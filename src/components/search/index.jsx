export default function Search({ serach, setSearch, handleSearch }) {
  return (
    <div className="search-engine">
      <input
        type="text"
        className="city-search"
        placeholder="Enter City Name"
        name="search"
        value={serach}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={handleSearch}>Search </button>
    </div>
  );
}
