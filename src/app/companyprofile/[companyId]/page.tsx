import { useRouter } from "next/navigation";


interface ICompanyProfileProps {
    params: {companyid : string }
}


export default function CompanyProfile({params}: ICompanyProfileProps){
    
    const router = useRouter();
    return (
        <>
            <p>
                    Testing 
            </p>

            <p>
                    {params.companyid} 
            </p>
        </>
    )

    
}