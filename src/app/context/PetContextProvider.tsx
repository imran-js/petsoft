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
  handlePetCheckout: (id: string) => void;
  handleGetPet: Pets | undefined;
  PetsCount: number;
  handleAddPet: (pet: Pets) => void;
  handleUpdatePet: (pet: Pets) => void;
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

  const handlePetCheckout = (id: string) => {
    const filteredPet = pets.filter((pet) => pet.id !== id);
    setPets(filteredPet);
    setSelectedPetId(null);
  };

  const handleAddPet = (pet: Pets) => {
    const newPet = pet;
    setPets((pre) => [...pre, newPet]);
  };

  const handleUpdatePet = (pet: Pets) => {
    setPets((pre) => {
      const updatedPets = pre.map((p) => {
        if (p.id === pet.id) {
          return {
            ...p,
          };
        }
        return p;
      });
      return updatedPets;
    });
  };

  return (
    <PetContext.Provider
      value={{
        pets,
        selectedPetId,
        handleGetPet,
        handleUpdatePetId,
        PetsCount,
        handlePetCheckout,
        handleAddPet,
        handleUpdatePet,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}

export default PetContextProvider;

//
