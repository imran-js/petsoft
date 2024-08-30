import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const IMG =
  "https://bytegrad.com/course-assets/react-nextjs/petsoft-preview.png";

export default function Home() {
  return (
    <main className="bg-[#5dc9a8] min-h-screen flex justify-center flex-col lg:flex-row items-center gap-10">
      <Image alt="home Image" src={IMG} width={519} height={472} />
      <div>
        <Logo />
        <h1 className="text-5xl font-semibold my-6 max-w-[500px]">
          Manage your <span className="font-extrabold">pet daycare</span> with
          ease
        </h1>
        <p className="text-2xl max-w-[600px] font-medium ">
          Use PetSoft keep track of pets under your care. Get lifetime access
          for $299
        </p>
        <div className="mt-10 space-x-3">
          <Button asChild>
            <Link href="/signup">Get Started</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
