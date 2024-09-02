import { PetContext } from "@/app/context/PetContextProvider";
import React, { useContext } from "react";

function usePetContext() {
  const context = useContext(PetContext);

  if (!context) {
    throw new Error("useContext must be defined within petContextProvider ");
  }
  return context;
}

export default usePetContext;
