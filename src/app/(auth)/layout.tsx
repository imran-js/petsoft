import Logo from "@/components/logo";
import React from "react";

type Props = { children: React.ReactNode };

function layout({ children }: Props) {
  return (
    <div className="flex flex-col gap-y-5 justify-center items-center min-h-screen">
      <Logo />
      {children}
    </div>
  );
}

export default layout;
