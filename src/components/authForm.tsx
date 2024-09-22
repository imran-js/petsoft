import { Label } from "@radix-ui/react-label";
import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Login, SignUp } from "@/app/actions/actions";

type Props = {
  type: "login" | "signup";
};

function AuthForm({ type }: Props) {
  return (
    <form action={type === "login" ? Login : SignUp}>
      <div className="space-y-2">
        <Label id="email" htmlFor="email">
          Email
        </Label>
        <Input name="email" type="text" />
      </div>
      <div className="space-y-2 ">
        <Label id="password" htmlFor="password">
          Password
        </Label>
        <Input name="password" type="password" />
      </div>
      <Button className="mt-4">{type}</Button>
    </form>
  );
}

export default AuthForm;
