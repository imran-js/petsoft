import { SearchContext } from "@/app/context/SearchContextProvider";
import { useContext } from "react";

function useSearchContext() {
  const context = useContext(SearchContext);

  if (!context) {
    throw new Error("useContext must be defined within SearchContextProvider ");
  }
  return context;
}

export default useSearchContext;
