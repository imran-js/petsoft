import AppFooter from "@/components/appFooter";
import AppHeader from "@/components/appHeader";
import BackgroundPattern from "@/components/backgroundPattern";
import PetContextProvider from "../context/PetContextProvider";
import { Pets } from "@/components/types/types";
import SearchContextProvider from "../context/SearchContextProvider";

type Prop = {
  children: React.ReactNode;
};

async function layout({ children }: Prop) {
  const response = await fetch(
    "https://bytegrad.com/course-assets/projects/petsoft/api/pets"
  );
  if (!response.ok) {
    throw new Error(`Could not fetch data`);
  }
  const data: Pets[] = await response.json();

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
    </>
  );
}

export default layout;
