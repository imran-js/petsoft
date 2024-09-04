import ContentBlock from "@/components/ContentBlock";
import H1 from "@/components/H1";

function AccountPage() {
  return (
    <main>
      <H1 className="my-8 text-white"> Your Account </H1>
      <ContentBlock className="flex items-center justify-center h-[500px]">
        <p>Loged in as ...</p>
      </ContentBlock>
    </main>
  );
}

export default AccountPage;
