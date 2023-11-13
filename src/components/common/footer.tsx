// Footer

import Link from "next/link";
import { Icon } from "@/components/modules";

const Footer = () => {
  return (
    <div className="relative bottom-0 left-0 full bg-[#ffffff50] z-50 stack items-start content-start md:center gap-4 py-6 px-4 animate-downtop">
      <div className="stack items-start md:flex-row gap-4">
        <Link href="mailto:injusticecrush@gmail.com" className="app-link">
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
        <Link
          target="_blank"
          href="https://discord.com/invite/4XPUxZpC"
          className="app-link"
        >
          <Icon type="discord" />
          <span>Join our discord</span>
        </Link>
      </div>
      <span>© {new Date().getFullYear()} Project Palestine</span>
    </div>
  );
};

export default Footer;
