"use client";
import useSearchContext from "./hooks/useSearchContext";

function SearchForm() {
  const { searchQuery, handelSetSearchQuery } = useSearchContext();

  return (
    <form className="w-full h-full">
      <input
        className="w-full h-full  placeholder:text-white/70 bg-white/20 rounded-md px-5 transition outline-none focus:bg-white/50 hover:bg-white/30"
        placeholder="Search Pets"
        type="search"
        value={searchQuery}
        onChange={(e) => handelSetSearchQuery(e.target.value)}
      />
    </form>
  );
}

export default SearchForm;
