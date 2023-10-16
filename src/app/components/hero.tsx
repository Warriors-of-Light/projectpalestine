import { Icon, Company } from '@/app/components/modules'
import Image from 'next/image'
import Link from 'next/link'

const Hero = () => {

    // Testing Data
    type dataType = {
        logo: string,
        name: string,
        description: string,
        status: 1 | 2 | 3
    }
    const data: dataType[] = [
        {
            logo: "https://img.icons8.com/color/100/mcdonalds-app.png",
            name: "mcdonalds",
            description: "company",
            status: 3,
        },
        {
            logo: "https://img.icons8.com/ios-filled/100/mac-os.png",
            name: "apple",
            description: "company",
            status: 2,
        },
        {
            logo: "https://img.icons8.com/color/100/coca-cola.png",
            name: "coca cola",
            description: "company",
            status: 3,
        },
    ]

    return (

        <div className="min-h-screen w-screen flex flex-col-reverse md:flex-row items-center justify-center gap-6 p-4 pt-28">

            <div className="w-full md:w-1/2 flex flex-col justify-end gap-4">

                <div className="w-full text-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vehicula,
                    ante eu cursus tincidunt, justo libero consequat tortor, at
                    pellentesque erat velit nec libero. Vivamus vel nulla eu justo auctor
                    laoreet.
                </div>
                <div className="w-full text-4">Search a product or company</div>
                <div className="w-full relative center">
                    <input className="app-input" type="text" placeholder='Product or company name...' />
                    <Icon type="search" style='absolute right-0 mr-2' />
                </div>

                {
                    data.map(company => {
                        return <Company props={company} />
                    })
                }

            </div>

            <div className="w-full md:w-1/2 center flex-col">

                <Image className="-skew-x-3" src="https://img.icons8.com/ios-filled/300/iphone14-pro.png" alt="Logo" width={300} height={300} />
                <div className='center'>
                    <Link href="/" className="app-btn-dark">
                        <Icon type="appstore" />
                        app store
                    </Link>
                    <Link href="/" className="app-btn-dark">
                        <Icon type="googleplay" />
                        google play
                    </Link>
                </div>

            </div>

        </div>

    )

}
export default Hero