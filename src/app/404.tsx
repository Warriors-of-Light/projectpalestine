import Image from 'next/image'
import Link from 'next/link'

const Custom404 = () => {

    return (

        <div className="bg-app-light w-screen h-screen center">
            <Image src="/undraw_Page_not_found_re_e9o6.png" width="200" height="200" alt="Image" />
            <Link href="/">Go back to the homepage</Link>
        </div>

    )

}

export default Custom404