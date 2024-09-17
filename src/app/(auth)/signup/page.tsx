import AuthForm from "@/components/authForm";
import H1 from "@/components/H1";
import Link from "next/link";

function SignupPage() {
  return (
    <main>
      <H1 className="text-center mb-5">Signup</H1>
      <AuthForm btnText="Signup" />
      <p className="mt-4 text-sm text-zinc-500">
        <span className="font-bold">Already have an account.?</span>
        <Link href="/login">Login</Link>
      </p>
    </main>
  );
}

export default SignupPage;
