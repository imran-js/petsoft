import AuthForm from "@/components/authForm";
import H1 from "@/components/H1";
import Link from "next/link";

function LoginPage() {
  return (
    <main>
      <H1 className="text-center mb-5">Login</H1>
      <AuthForm btnText="Login" />
      <p className="mt-4 text-sm text-zinc-500">
        <span className="font-bold">Don't have an account?</span>
        <Link href="/signup">Signup</Link>
      </p>
    </main>
  );
}

export default LoginPage;
