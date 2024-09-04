"use client";

import React, { createContext, useState } from "react";

type Props = {
  children: React.ReactNode;
};

type TSearchContext = {
  searchQuery: string;
  handelSetSearchQuery: (q: string) => void;
};

export const SearchContext = createContext<TSearchContext | null>(null);

function SearchContextProvider({ children }: Props) {
  const [searchQuery, setSearchQuery] = useState("");

  const handelSetSearchQuery = (q: string) => setSearchQuery(q);

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        handelSetSearchQuery,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export default SearchContextProvider;
