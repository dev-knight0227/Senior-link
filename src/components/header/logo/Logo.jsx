import Image from "next/image";
import Link from "next/link";
import LogoImg from "../../../../public/logo-no-background.svg";

const Logo = () => {
  return (
    <div className="logo">
      <Link href="/">
        <Image src={LogoImg} width={180} alt="Senior Care Home" />
      </Link>
    </div>
  );
};

export default Logo;
