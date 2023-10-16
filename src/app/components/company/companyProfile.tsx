import Image from "next/image"
import Link from "next/link"
import { Icon } from "../modules"

type propsType = {
    logo: string,
    name: string,
    description: string,
    status: 1 | 2 | 3,
}

const CompanyProfile = ({ props, closeFunc }: { props: propsType, closeFunc: any }) => {

    return (

        <div className="bg-app--light absolute top-0 left-0 w-screen h-screen z-50">

            <div className="app-container flex flex-col items-start gap-4 p-4">

                {/* Logo & Name & description & Info*/}
                <div className="w-full center justify-between">

                    <Image className="rounded-full" src={props.logo} alt="Logo" width={100} height={100} />
                    <div className="flex flex-col items-center">
                        <span className="text-3 title">{props.name}</span>
                        <span className="text">{props.description}</span>
                    </div>

                    {/* Info */}
                    <div className="col-span-2 flex flex-col justify-start items-center gap-2">
                        <div className={`p-4 rounded-full ${props.status == 1 ? 'bg-app-red' : (props.status == 2 ? 'bg-app-yellow' : 'bg-app-green')}`}></div>
                        <span className="text">
                            {
                                props.status == 1
                                    ? 'Poor' :
                                    (
                                        props.status == 2
                                            ? 'Meduim'
                                            : 'Good'
                                    )
                            }
                        </span>
                    </div>
                    
                    <button className="app-btn" onClick={() => closeFunc()}><Icon type="close"/></button>
                    
                </div>

                {/* History */}
                <div className="w-full center justify-between bg-app-primary p-2 rounded-lg">
                    <div className="text-3 title p-2 w-1/2">October 16 2023</div>
                    <div className="text-1 title w-1/2">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vehicula,
                    ante eu cursus tincidunt, justo libero consequat tortor, at
                    pellentesque erat velit nec libero. Vivamus vel nulla eu justo auctor
                    laoreet.
                    </div>
                </div>
                <div className="w-full center justify-between bg-app-primary p-2 rounded-lg">
                    <div className="text-3 title p-2 w-1/2">October 16 2023</div>
                    <div className="text-1 title w-1/2">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vehicula,
                    ante eu cursus tincidunt, justo libero consequat tortor, at
                    pellentesque erat velit nec libero. Vivamus vel nulla eu justo auctor
                    laoreet.
                    </div>
                </div>
                <div className="w-full center justify-between bg-app-primary p-2 rounded-lg">
                    <div className="text-3 title p-2 w-1/2">October 16 2023</div>
                    <div className="text-1 title w-1/2">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vehicula,
                    ante eu cursus tincidunt, justo libero consequat tortor, at
                    pellentesque erat velit nec libero. Vivamus vel nulla eu justo auctor
                    laoreet.
                    </div>
                </div>

                {/* Submit a claim */}
                <Link href="/" className="app-btn-dark">Submit a claim</Link>

            </div>


        </div>

    )

}

export default CompanyProfile