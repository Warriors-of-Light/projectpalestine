// Not found page //

import Image from "next/image"
import Link from "next/link"

export default function NotFound() {
    return (
        <main className="layer-screen flex flex-col md:flex-row items-center justify-center gap-4 p-4">
            <div className="stack gap-4">
                <div className="text-3 title">This Page is Not Found</div>
                <div className="">Could not find this page. Click below to go back home.</div>
                <Link className="btn" href={'/'}>
                    <span>go back home</span>
                </Link>
            </div>
            <div className="center">
                <Image src={'/page_not_found.svg'} width={600} height={600} alt="page_not_found" />
            </div>
        </main>
    )
}