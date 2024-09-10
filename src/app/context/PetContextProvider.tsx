"use client";
import { Pets } from "@/components/types/types";
import React, { createContext, useContext, useState } from "react";
import { AddPet, UpdatePet } from "../actions/actions";

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
  let pets = data;
  // const [pets, setPets] = useState(data);
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
    if (pet) {
      delete pet?.id;
      AddPet(pet);
    }
  };

  const handleUpdatePet = (pet: Omit<Pets, "id">) => {
    // Take pet and remove id property and construct a new pet object
    // const updatedPet = { ...pet, id: selectedPetId };

    //@ts-ignore
    delete pet?.id;

    UpdatePet(pet);

    //@ts-ignore
    // setPets((pre) => {
    //   return pre.map((pet) => {
    //     if (pet.id === selectedPetId) {
    //       return {
    //         ...pet,
    //         ...updatedPet,
    //       };
    //     }
    //     return pet;
    //   });
    // });
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
