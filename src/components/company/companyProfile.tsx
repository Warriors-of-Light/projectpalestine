import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/modules";
import Rating from "./rating";

interface ICompanyProfileProps {
  companyId: string;
}

const CompanyProfile = ({ companyId }: ICompanyProfileProps) => {
  // Testing Data
  const data = [
    {
      date: "March 16 2020",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vehicula, ante eu cursus tincidunt, justo libero consequat tortor",
    },
    {
      date: "September 15 2022",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vehicula, ante eu cursus tincidunt, justo libero consequat tortor",
    },
    {
      date: "October 16 2023",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vehicula, ante eu cursus tincidunt, justo libero consequat tortor",
    },
  ];

  return (
    <div className="layer animate-topdown">
      <div className="app-container flex flex-col items-center justify-center gap-4 p-4">
        {/* Logo & Name & description */}
        <div className="w-full flex justify-between items-center">
          <div className="center">
            <Image
              className="rounded-full"
              src={props.logo}
              alt="Logo"
              width={100}
              height={100}
            />
            <div className="flex flex-col">
              <span className="text-3 title capitalize">{props.name}</span>
              <span className="text capitalize">{props.description}</span>
            </div>
          </div>

          {/* Status */}
          <Status status={props.status} />
        </div>

        {/* History */}
        {data.map((props) => (
          <History props={props} />
        ))}

        {/* Submit a claim */}
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="app-btn-dark">
            <Icon type="submit" />
            <span>submit a claim</span>
          </Link>
          <button className="app-btn-dark" onClick={() => {}}>
            <Icon type="return" />
            <span>go back</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const History = ({
  props,
}: {
  props: {
    date: string;
    text: string;
  };
}) => {
  return (
    <div className="bg-app-primary flex justify-between items-center border-l border-app--primary p-2 rounded-lg">
      <div className="text-3 w-1/2">{props.date}</div>
      <div className="text-1 w-1/2">{props.text}</div>
    </div>
  );
};

export default CompanyProfile;
