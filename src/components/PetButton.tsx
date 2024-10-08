"use client";
import React from "react";
import { Button } from "./ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "./ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import PetForm from "./pet-form";
import { flushSync } from "react-dom";

type Props = {
  children?: React.ReactNode;
  type: "Add" | "Edit" | "Checkout";
  onClick?: () => void;
};

function PetButton({ children, type, onClick }: Props) {
  const [open, setOpen] = React.useState(false);
  if (type === "Checkout") {
    return (
      <Button onClick={onClick} variant="secondary">
        {children}
      </Button>
    );
  }
  if (type === "Add" || type === "Edit") {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {type === "Add" ? (
            <Button size="icon">
              <PlusIcon className="h-6 w-6" />
            </Button>
          ) : (
            <Button onClick={onClick} variant="secondary">
              {children}
            </Button>
          )}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold leading-none tracking-tight">
              {type === "Add" ? "Add New Pet" : "Edit Pet"}
            </DialogTitle>
          </DialogHeader>
          <PetForm
            actionType={type}
            onFormSubmit={() => {
              flushSync(() => {
                setOpen(false);
              });
            }}
          />
        </DialogContent>
      </Dialog>
    );
  }
}

export default PetButton;
