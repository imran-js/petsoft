"use client";
import usePetContext from "./hooks/usePetContext";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

type Props = {
  actionType: "Add" | "Edit";
  onFormSubmit?: () => void;
};

function PetForm({ actionType }: Props) {
  const { handleAddPet, handleUpdatePet, handleGetPet } = usePetContext();
  const ActivePet = handleGetPet;

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const newPet = {
      id: Math.floor(Math.random() * 1000).toString(),
      name: data.name.toString(),
      ownerName: data.ownerName.toString(),
      imageUrl:
        data.imageUrl.toString() ||
        "https://plus.unsplash.com/premium_photo-1664371206019-a82ba8d7c2e2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cGV0c3xlbnwwfHwwfHx8MA%3D%3D",
      age: parseInt(data.age.toString()),
      notes: data.notes.toString(),
    };
    if (actionType === "Edit") {
      handleUpdatePet(newPet);
    } else if (actionType === "Add") {
      handleAddPet(newPet);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col">
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
            required
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
      <Button className="mt-5 self-end">
        {actionType === "Add" ? "Add Pet" : "Edit Pet"}
      </Button>
    </form>
  );
}

export default PetForm;
