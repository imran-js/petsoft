"use client";

import usePetContext from "./hooks/usePetContext";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import PetFormBtn from "./pet-form-btn";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DEFAULT_PET_IMAGE } from "@/lib/constants";
import { FormSchema, TFormData } from "@/lib/validations";

type Props = {
  actionType: "Add" | "Edit";
  onFormSubmit?: () => void;
};

function PetForm({ actionType, onFormSubmit }: Props) {
  const { selectedPetId, handleUpdatePet, handleAddPet, handleGetPet } =
    usePetContext();

  const ActivePet = handleGetPet;
  const {
    getValues,
    formState: { errors },
    register,
    trigger,
  } = useForm<TFormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: ActivePet?.name,
      ownerName: ActivePet?.ownerName,
      imageUrl: ActivePet?.imageUrl,
      age: ActivePet?.age,
      notes: ActivePet?.notes,
    },
  });

  return (
    <form
      action={async () => {
        const result = await trigger();
        if (!result) {
          return;
        }
        onFormSubmit && onFormSubmit();
        const petDate = getValues();
        petDate.imageUrl = petDate.imageUrl || DEFAULT_PET_IMAGE;

        if (actionType === "Edit") {
          await handleUpdatePet(selectedPetId!, petDate);
        }
        if (actionType === "Add") {
          await handleAddPet(petDate);
        }
      }}
      className="flex flex-col"
    >
      <div className="space-y-3  ">
        <div className="space-y-1 ">
          <Label htmlFor="name">Name</Label>
          <Input {...register("name")} />
          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="ownerName">Owners Name</Label>
          <Input {...register("ownerName")} />
          {errors.ownerName && (
            <span className="text-red-500">{errors.ownerName.message}</span>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="imageUrl">ImageUrl</Label>
          <Input {...register("imageUrl")} />
          {errors.imageUrl && (
            <span className="text-red-500">{errors.imageUrl.message}</span>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="age">Age</Label>
          <Input {...register("age")} />
          {errors.age && (
            <span className="text-red-500">{errors.age.message}</span>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="notes">Notes</Label>
          <Textarea {...register("notes")} />
          {errors.notes && (
            <span className="text-red-500">{errors.notes.message}</span>
          )}
        </div>
      </div>
      <PetFormBtn actionType={actionType} />
    </form>
  );
}

export default PetForm;
