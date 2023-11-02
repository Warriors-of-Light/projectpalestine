// Footer

import Link from "next/link";
import { Icon } from "@/components/modules";

const Footer = () => {
  return (
    <div className="bg-white flex flex-col items-center gap-4 p-4 pb-10 pt-10 xl:m-0 lg:m-0 md:m-0 ">
      <div className="flex flex-col md:flex-row items-center md:items-center gap-4">
        <Link href="mailto:crushinjustice@gmail.com" className="app-link">
          <Icon type="contact" />
          <span>Contact</span>
        </Link>
        <Link href="/about" className="app-link">
          <Icon type="about" />
          <span>About</span>
        </Link>
        <Link
          target="_blank"
          href="https://github.com/haythamhakim/projectpalestine"
          className="app-link"
        >
          <Icon type="github" />
          <span>Contribute with us</span>
        </Link>
      </div>
      <Link href="" className="app-link">
        <span>© {new Date().getFullYear()} Project Palestine</span>
      </Link>
    </div>
  );
};

export default Footer;
