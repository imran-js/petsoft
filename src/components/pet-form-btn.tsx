import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

type Props = {
  actionType: "Add" | "Edit";
};

function PetFormBtn({ actionType }: Props) {
  const { pending } = useFormStatus();

  return (
    <>
      <Button type="submit" disabled={pending} className="mt-5 self-end">
        {actionType === "Add" ? "Add Pet" : "Edit Pet"}
      </Button>
    </>
  );
}

export default PetFormBtn;
