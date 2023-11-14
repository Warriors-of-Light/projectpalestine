// Hero : contain introduction - search bar

'use client'

import { CompanyCard, Icon, Loader } from "@/components/modules"
import { Company } from "@/data/modules"

export function Hero() {
    const testingData : Company[] = [
        {
          logo: 'https://icons8.com/icon/XvRFJSfgZ328/mcdonalds-app',
          name: 'Mcdonald',
          description: 'description',
          website: undefined,
          id: 'qwrdfsdf',
          tags: undefined,
          status: 1,
          incidents: [],
        },
        {
          logo: 'https://icons8.com/icon/30840/apple-logo',
          name: 'Apple',
          description: 'description',
          website: undefined,
          id: 'asuify',
          tags: undefined,
          status: 1,
          incidents: [],
        },
        {
          logo: 'https://icons8.com/icon/wGYgIlqPWdC2/samsung',
          name: 'Samsung',
          description: 'description',
          website: undefined,
          id: 'qwe',
          tags: undefined,
          status: 1,
          incidents: [],
        },
        {
          logo: 'https://icons8.com/icon/38607/hp',
          name: 'HP',
          description: 'description',
          website: undefined,
          id: 'weer',
          tags: undefined,
          status: 3,
          incidents: [],
        },
        {
          logo: 'https://icons8.com/icon/24934/air-jordan',
          name: 'Air Jordan',
          description: 'description',
          website: undefined,
          id: 'ewtet',
          tags: undefined,
          status: 2,
          incidents: [],
        },
        {
          logo: 'https://icons8.com/icon/57660/ford',
          name: 'Ford',
          description: 'description',
          website: undefined,
          id: 'ewtet',
          tags: undefined,
          status: 1,
          incidents: [],
        },
        {
          logo: 'https://icons8.com/icon/16647/nike',
          name: 'Nike',
          description: 'description',
          website: undefined,
          id: 'ewtet',
          tags: undefined,
          status: 1,
          incidents: [],
        },
      ]
    return (
        <div className="animate-totop bg-top-background min-h-screen stack items-center gap-10 p-4 pt-10 rd shadow">
            <BigTitle />
            <SearchBar />
            <Companies companies={testingData} filter={[]}/>
        </div>
    )
}

function BigTitle() {
    return (
        <div className="text-3xl md:text-4xl xl:text-6xl title max-width">
            A way for us to boycott the genocide and its supporters
        </div>
    )
}

function SearchBar() {
    const handleSearch = (e: any) => { console.log(e) }
    return (
        <div className="relative w-full max-width">
            <input
                className="input peer"
                type="text"
                placeholder="search..."
                onChange={handleSearch}
            />
            <div className="bg-foreground font-sans peer-focus:bg-primary duration-300 text-top-background peer-focus:text-top-primary absolute top-1/2 peer-focus:top-0 rounded-full -translate-y-1/2 w-fit px-2 py-1 ml-2">
                Search products or companies
            </div>
            <Icon
                type="search"
                style="peer-focus:stroke-primary duration-300 absolute right-0 top-1/2 -translate-y-1/2 mr-4"
            />
        </div>
    )
}

function Companies({ companies, filter }: { companies: Company[], filter: string[] }) {

    return (
        <div className="full stack gap-4 max-width">
            {
                companies.length ? (
                    filter.length ? companies.map((company: any) => {
                        return (
                            filter.includes(company.name) &&
                            <CompanyCard key={company.companyId} company={company} />
                        );
                    })
                        : companies.map((company: any) => <CompanyCard key={company.companyId} company={company} />)
                ) : <div className="center full"><Loader type={1} /></div>
            }
        </div>
    )
}