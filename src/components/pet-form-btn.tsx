import { Button } from "./ui/button";

type Props = {
  actionType: "Add" | "Edit";
};

function PetFormBtn({ actionType }: Props) {
  return (
    <>
      <Button type="submit" className="mt-5 self-end">
        {actionType === "Add" ? "Add Pet" : "Edit Pet"}
      </Button>
    </>
  );
}

export default PetFormBtn;
