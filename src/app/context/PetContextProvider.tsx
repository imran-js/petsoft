"use client";
import { Pets } from "@/components/types/types";
import React, { createContext, useContext, useState } from "react";

type Props = {
  children: React.ReactNode;
  data: Pets[];
};

type TPetContext = {
  pets: Pets[];
  selectedPetId: string | null;
  setPets: React.Dispatch<React.SetStateAction<Pets[]>>;
  handleUpdatePetId: (id: string) => void;
};

export const PetContext = createContext<TPetContext | null>(null);

function PetContextProvider({ data, children }: Props) {
  const [pets, setPets] = useState(data);
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  const handleUpdatePetId = (id: string) => {
    setSelectedPetId(id);
  };

  return (
    <PetContext.Provider
      value={{
        pets,
        selectedPetId,
        setPets,
        handleUpdatePetId,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}

export default PetContextProvider;
