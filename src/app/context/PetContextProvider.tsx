"use client";
import { PetWithId, PetEssentials } from "@/components/types/types";
import React, { createContext, useOptimistic, useState } from "react";
import { AddPet, DeletePet, UpdatePet } from "../actions/actions";
import { toast } from "sonner";
import { checkIfProvidedUrlIsImage } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  data: PetWithId[];
};

type TPetContext = {
  pets: PetWithId[];
  selectedPetId: PetWithId["id"] | null;
  handleUpdatePetId: (id: PetWithId["id"]) => void;
  handlePetCheckout: (id: PetWithId["id"]) => void;
  handleGetPet: PetWithId | undefined;
  PetsCount: number;
  handleAddPet: (pet: PetEssentials) => Promise<void>;
  handleUpdatePet: (id: PetWithId["id"], pet: PetEssentials) => Promise<void>;
};

export const PetContext = createContext<TPetContext | null>(null);

function PetContextProvider({ data, children }: Props) {
  const [pets, setPets] = useOptimistic(data, (state, { action, payload }) => {
    switch (action) {
      case "add":
        return [
          ...state,
          { ...payload, id: Math.floor(Math.random() * 1000).toString() },
        ];
      case "edit":
        return state.map((pet) => {
          if (pet.id === payload.id) {
            return { ...pet, ...payload.payload };
          }
          return pet;
        });
      case "remove":
        return state.filter((pet) => pet.id !== payload);
      default:
        return state;
    }
  });

  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  const handleGetPet = pets.find((pet) => pet.id === selectedPetId);

  const PetsCount = pets.length;

  const handleUpdatePetId = (id: PetWithId["id"]) => {
    setSelectedPetId(id);
  };

  const handlePetCheckout = async (id: PetWithId["id"]) => {
    setPets({ action: "remove", payload: id });
    await DeletePet(id);
    setSelectedPetId(null);
  };

  const handleAddPet = async (formData: PetEssentials) => {
    setPets({ action: "add", payload: formData });
    const error = await AddPet(formData);
    if (error) {
      toast.error("An error occurred");
      return;
    }
  };

  const handleUpdatePet = async (
    ActivePetId: PetWithId["id"],
    formData: PetEssentials
  ) => {
    setPets({
      action: "edit",
      payload: { id: ActivePetId, payload: formData },
    });
    const error = await UpdatePet(ActivePetId, formData);
    if (error) {
      toast.error("An error occurred");
      return;
    }
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
