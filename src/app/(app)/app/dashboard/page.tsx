import Branding from "@/components/Branding";
import ContentBlock from "@/components/ContentBlock";
import PetDetail from "@/components/PetDetail";
import PetList from "@/components/PetList";
import SearchForm from "@/components/searchForm";

async function DashboardPage() {
  return (
    <main>
      <div className="flex justify-between items-center py-8 text-white">
        <Branding />
      </div>

      <div className="grid md:grid-cols-3 md:grid-rows-[45px_1fr] grid-rows-[45px_300px_500px] gap-4 md:h-[600px]">
        <div className="md:row-start-1 md:row-span-1 md:col-start-1 md:col-span-1">
          <SearchForm />
        </div>
        <div className="relative md:row-start-2 md:row-span-full md:col-start-1 md:col-span-1">
          <ContentBlock>
            <PetList />
          </ContentBlock>
        </div>
        <div className="md:row-start-1 md:row-span-full md:col-start-2 md:col-span-full">
          <ContentBlock>
            <PetDetail />
          </ContentBlock>
        </div>
      </div>
    </main>
  );
}

export default DashboardPage;
