import { Avatar } from "@chakra-ui/react";
import { EyeIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

interface ICompanyCardProps {
  id: string;
  name: string;
  description: string;
  tags?: Array<string>;
  src?: string;
  numberOfBoycotters?: number;
}

export default function CompanyDisplay({
  id,
  name,
  description,
  tags,
  src,
}: ICompanyCardProps) {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6"
    >
      <li
        key={id}
        className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
      >
        <div className="flex flex-1 flex-col p-8">
          <div className="justify-center">
            <Avatar
              size={"2xl"}
              name={src && src.length > 0 ? undefined : name}
              src={src}
            />
          </div>
          <h3 className="mt-6 text-sm font-medium text-gray-900">{name}</h3>
          <dl className="mt-1 flex flex-grow flex-col justify-between">
            <dd className="text-sm text-gray-500 line-clamp-2 h-10">
              {description}
            </dd>
            <dd className="mt-3">
              {tags?.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20 mr-2"
                >
                  {tag}
                </span>
              ))}
            </dd>
          </dl>
        </div>
        <div>
          <div className="-mt-px flex divide-x divide-gray-200">
            <div className="flex w-0 flex-1 cursor-pointer">
              <a
                onClick={() => router.push(`/companyprofile/${id}`)}
                className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
              >
                <EyeIcon
                  className="h-5 w-5 text-gray-400 "
                  aria-hidden="true"
                />
                {t("all-companies.view-company",{defaultValue:"View Company"})}
              </a>
            </div>
          </div>
        </div>
      </li>
    </ul>
  );
}
