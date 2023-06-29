import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header>
      <Link className="header" href="/">
        <Image alt="sdf" src="logo.svg" width={190} height={200} />
      </Link>
      <div className="link-container">
        <Link
          className="header"
          target="_blank"
          href="https://www.stytch.com/docs"
        >
          Stytch Docs
        </Link>
        <Link
          className="header"
          target="_blank"
          href="https://github.com/stytchauth/stytch-nextjs-example"
        >
          <Image
            alt="Github"
            src="github.svg"
            width={20}
            height={20}
            style={{ marginRight: "4px" }}
          />
          View on Github
        </Link>
      </div>
    </header>
  );
};

export default Header;
