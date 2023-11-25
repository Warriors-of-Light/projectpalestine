import Link from "next/link";
import { Icon } from "@/app/_lib/modules";

export function Footer() {

  return (
    <div className="full bg-t-background border-t border-[#00000020] stack gap padding">
      <div className="flex flex-col items-start md:flex-row md:items-center gap">
        <Link href="mailto:injusticecrush@gmail.com" className="link">
          <Icon type="contact" />
          <span>Contact</span>
        </Link>
        <Link href="/about" className="link">
          <Icon type="about" />
          <span>About</span>
        </Link>
        <Link
          target="_blank"
          href="https://github.com/haythamhakim/projectpalestine"
          className="link"
        >
          <Icon type="github" />
          <span>Contribute with us</span>
        </Link>
        <Link
          target="_blank"
          href="https://discord.gg/nGnUknegaC"
          className="link"
        >
          <Icon type="discord" />
          <span>Join our discord</span>
        </Link>
      </div>
      <Link href="" className="link">
        <span>© {new Date().getFullYear()} Project Palestine</span>
      </Link>
    </div>
  )

}