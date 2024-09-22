"use client";
import React from "react";
import { Button } from "./ui/button";
import { SignOut } from "@/app/actions/actions";

function LogOutBtn() {
  return <Button onClick={async () => await SignOut()}> Logout </Button>;
}

export default LogOutBtn;
