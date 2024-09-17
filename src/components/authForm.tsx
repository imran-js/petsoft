import { Label } from "@radix-ui/react-label";
import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

type Props = {
  btnText: string;
};

function AuthForm({ btnText }: Props) {
  return (
    <form>
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
      <Button className="mt-4">{btnText}</Button>
    </form>
  );
}

export default AuthForm;
