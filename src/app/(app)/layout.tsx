import AppFooter from "@/components/appFooter";
import AppHeader from "@/components/appHeader";
import BackgroundPattern from "@/components/backgroundPattern";
import PetContextProvider from "../context/PetContextProvider";
import SearchContextProvider from "../context/SearchContextProvider";
import prisma from "@/lib/db";
import { Toaster } from "sonner";

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

type Prop = {
  children: React.ReactNode;
};

async function layout({ children }: Prop) {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  const data = await prisma.pet.findMany({
    where: {
      userId: session.user.id,
    },
  });

  return (
    <>
      <BackgroundPattern />
      <div className="max-w-[1050px] mx-auto px-4 flex flex-col min-h-screen">
        <AppHeader />
        <SearchContextProvider>
          <PetContextProvider data={data}>{children}</PetContextProvider>
        </SearchContextProvider>
        <AppFooter />
      </div>

      <Toaster position="bottom-right" />
    </>
  );
}

export default layout;
