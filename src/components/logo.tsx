import Image from "next/image";
import logo from "../../public/logo.svg";
import Link from "next/link";

function Logo() {
  return (
    <Link href="/">
      <Image alt="Logo" src={logo} />
    </Link>
  );
}

export default Logo;
