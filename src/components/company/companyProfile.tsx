import { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import Icon from "../common/icon";
import Status from "./status";
import { useRouter } from "next/navigation";

type propsType = {
  logo: string;
  name: string;
  description: string;
  status: 1 | 2 | 3;
};

const CompanyProfile = ({ props }: { props: propsType }) => {
  return (
    <div className="layer animate-topdown">
      <div className="app-container flex flex-col gap-4 p-4">
        {/* Logo & Name & description */}
        <div className="flex justify-between items-center">
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
        <div className="bg-app-primary flex justify-between items-center p-2 rounded-lg">
          <div className="text-3 title p-2 w-1/2">October 16 2023</div>
          <div className="text-1 title w-1/2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            vehicula, ante eu cursus tincidunt, justo libero consequat tortor,
            at pellentesque erat velit nec libero. Vivamus vel nulla eu justo
            auctor laoreet.
          </div>
        </div>

        <div className="bg-app-primary flex justify-between items-center p-2 rounded-lg">
          <div className="text-3 title p-2 w-1/2">October 16 2023</div>
          <div className="text-1 title w-1/2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            vehicula, ante eu cursus tincidunt, justo libero consequat tortor,
            at pellentesque erat velit nec libero. Vivamus vel nulla eu justo
            auctor laoreet.
          </div>
        </div>

        <div className="bg-app-primary flex justify-between items-center p-2 rounded-lg">
          <div className="text-3 title p-2 w-1/2">October 16 2023</div>
          <div className="text-1 title w-1/2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            vehicula, ante eu cursus tincidunt, justo libero consequat tortor,
            at pellentesque erat velit nec libero. Vivamus vel nulla eu justo
            auctor laoreet.
          </div>
        </div>

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

export default CompanyProfile;
