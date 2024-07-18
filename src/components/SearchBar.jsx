export const SearchBar = ({ setSearchTerm }) => {
  return (
    <div>
      <input
        type="text"
        onChange={(event) => setSearchTerm(event.target.value)}
        placeholder="search posts"
      />
    </div>
  );
};
