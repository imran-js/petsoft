import ContentBlock from "@/components/ContentBlock";
import H1 from "@/components/H1";
import LogOutBtn from "@/components/sign-out-btn";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

async function AccountPage() {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  return (
    <main>
      <H1 className="my-8 text-white"> Your Account </H1>
      <ContentBlock className="flex flex-col gap-3 items-center justify-center h-[500px]">
        <p>Loged in as {session?.user?.email}</p>
        <LogOutBtn />
      </ContentBlock>
    </main>
  );
}

export default AccountPage;
