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
  handleUpdatePetId: (id: string) => void;
  handleGetPet: Pets | undefined;
  PetsCount: number;
};

export const PetContext = createContext<TPetContext | null>(null);

function PetContextProvider({ data, children }: Props) {
  const [pets, setPets] = useState(data);
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  const handleGetPet = pets.find((pet) => pet.id === selectedPetId);

  const PetsCount = pets.length;

  const handleUpdatePetId = (id: string) => {
    setSelectedPetId(id);
  };

  return (
    <PetContext.Provider
      value={{
        pets,
        selectedPetId,
        handleGetPet,
        handleUpdatePetId,
        PetsCount,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}

export default PetContextProvider;
