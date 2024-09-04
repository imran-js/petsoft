import React from "react";
import { Button } from "./ui/button";
import { PlusIcon } from "@radix-ui/react-icons";

type Props = {
  children?: React.ReactNode;
  type: "Add" | "Edit" | "Checkout";
};

function PetButton({ children, type }: Props) {
  if (type === "Add") {
    return (
      <Button size="icon">
        <PlusIcon />
      </Button>
    );
  }
  if (type === "Edit") {
    return <Button variant="secondary"> Edit</Button>;
  }
  if (type === "Checkout") {
    return <Button variant="secondary">Checkout</Button>;
  }
}

export default PetButton;
