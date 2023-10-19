// Footer

import Link from "next/link"
import { Icon } from "@/components/modules"

const Footer = () => {

    return (
        <div className="bg-app--light flex flex-col items-start gap-4 p-4 pb-10 pt-20">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <Link href="/" className="app-link">
                    <Icon type="contact" />
                    <span>Contact</span>
                </Link>
                <Link href="/" className="app-link">
                    <Icon type="about" />
                    <span>About</span>
                </Link>
                <Link href="https://github.com/haythamhakim/projectpalestine" className="app-link">
                    <Icon type="github" />
                    <span>Contribute with us</span>
                </Link>
            </div>
            <Link href="" className="app-link">
                <span>© {new Date().getFullYear()} Project Palestine</span>
            </Link>
        </div>
    )

}

export default Footer