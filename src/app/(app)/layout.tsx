import AppFooter from "@/components/appFooter";
import AppHeader from "@/components/appHeader";
import BackgroundPattern from "@/components/backgroundPattern";

type Prop = {
  children: React.ReactNode;
};

function layout({ children }: Prop) {
  return (
    <>
      <BackgroundPattern />
      <div className="max-w-[1050px] mx-auto px-4 flex flex-col min-h-screen">
        <AppHeader />
        {children}
        <AppFooter />
      </div>
    </>
  );
}

export default layout;
