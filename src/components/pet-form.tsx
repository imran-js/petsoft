"use client";

import usePetContext from "./hooks/usePetContext";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import PetFormBtn from "./pet-form-btn";

type Props = {
  actionType: "Add" | "Edit";
  onFormSubmit?: () => void;
};

function PetForm({ actionType, onFormSubmit }: Props) {
  const { selectedPetId, handleUpdatePet, handleAddPet, handleGetPet } =
    usePetContext();

  const ActivePet = handleGetPet;

  // const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const formData = new FormData(e.currentTarget);
  //   const data = Object.fromEntries(formData.entries());
  //   const newPet = {
  //     id: Math.floor(Math.random() * 1000).toString(),
  //     name: data.name.toString(),
  //     ownerName: data.ownerName.toString(),
  //     imageUrl:
  //       data.imageUrl.toString() ||
  //       "https://res.cloudinary.com/iib-webdevs/image/upload/v1592765719/DontDeleteMe/ditnoezhm8nng3ikagt0.jpg",
  //     age: parseInt(data.age.toString()),
  //     notes: data.notes.toString(),
  //   };
  //   if (actionType === "Edit") {
  //     handleUpdatePet(newPet);
  //     onFormSubmit && onFormSubmit();
  //   } else if (actionType === "Add") {
  //     handleAddPet(newPet);
  //     onFormSubmit && onFormSubmit();
  //   }
  // };

  return (
    <form
      action={async (formData) => {
        onFormSubmit && onFormSubmit();
        const petDate = {
          name: formData.get("name") as string,
          ownerName: formData.get("ownerName") as string,
          imageUrl:
            (formData.get("imageUrl") as string) ||
            "https://res.cloudinary.com/iib-webdevs/image/upload/v1592765719/DontDeleteMe/ditnoezhm8nng3ikagt0.jpg",
          age: Number(formData.get("age")) as number,
          notes: formData.get("notes") as string,
        };

        if (actionType === "Edit") {
          await handleUpdatePet(selectedPetId ?? "", petDate);
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
          <Input
            id="name"
            name="name"
            type="text"
            defaultValue={actionType === "Add" ? "" : ActivePet?.name}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="ownerName">Owners Name</Label>
          <Input
            id="ownerName"
            name="ownerName"
            type="text"
            required
            defaultValue={actionType === "Add" ? "" : ActivePet?.ownerName}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="imageUrl">ImageUrl</Label>
          <Input
            id="imageUrl"
            name="imageUrl"
            type="text"
            defaultValue={actionType === "Add" ? "" : ActivePet?.imageUrl}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            name="age"
            type="number"
            required
            defaultValue={actionType === "Add" ? "" : ActivePet?.age}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            name="notes"
            rows={3}
            required
            defaultValue={actionType === "Add" ? "" : ActivePet?.notes}
          />
        </div>
      </div>
      <PetFormBtn actionType={actionType} />
    </form>
  );
}

export default PetForm;
