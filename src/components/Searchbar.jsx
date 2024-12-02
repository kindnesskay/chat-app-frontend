export default function Searchbar({ placeholder }) {
  return (
    <form className="w-full max-w-80 h-12 rounded-lg overflow-hidden border border-gray-300">
      <input
        placeholder={placeholder}
        type="search"
        className="w-full h-full border-none outline-none rounded-lg p-2"
      />
    </form>
  );
}
