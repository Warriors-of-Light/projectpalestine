import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import {
  LifebuoyIcon,
  NewspaperIcon,
  PhoneIcon,
  CodeBracketIcon,
  FilmIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";

export default function About() {
  const cards = [
    {
      name: "Tech",
      description:
        "We build tools using technology. Our coders are freedom fighters using code as a force for good.",
      icon: CodeBracketIcon,
      volunteer: "Volunteer a developer",
    },
    {
      name: "Media",
      description:
        "We display our stories in different multi-media formats such as videos and movies, using art as a medium for liberation.",
      icon: FilmIcon,
      volunteer: "Volunteer as a creator",
    },
    {
      name: "Research",
      description:
        "We share the truth with the world through research, writing and papers. If Zionism started with one paper, ending it can be one paper away.",
      icon: NewspaperIcon,
      volunteer: "Volunteer as a researcher",
    },
  ];
  return (
    <>
      <div className="relative w-full lg:h-85vh">
        <div className="relative isolate h-full overflow-hidden bg-green-500 py-24 sm:py-20">
          <div className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl">
            <div
              className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>
          <div className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu">
            <div
              className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0">
              <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                Project Palestine
              </h2>
              <p className="mt-6 text-lg leading-8 text-white">
                A project born to restore justice and assist freedom fighters
                against the inhumane cruelty of aparteid and occupation. We
                believe that we all have a role in fighting injustice, and if we
                all unite, we could reach liberation which is the ultimate road
                to peace.
              </p>
            </div>
            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8 ">
              {cards.map((card) => (
                <div
                  key={card.name}
                  className="flex gap-x-4 rounded-xl bg-white p-6 ring-1 ring-inset ring-white/10 drop-shadow-xl"
                >
                  <card.icon
                    className="h-7 w-5 flex-none text-red-500 "
                    aria-hidden="true"
                  />
                  <div className="text-base leading-7 ">
                    <h3 className="font-semibold  text-green-500">
                      {card.name}
                    </h3>
                    <p className="mt-2 text-black-500 h-24">
                      {card.description}
                    </p>
                    <Link
                      href={"https://forms.gle/wqfQpm5DeTS9n6MaA"}
                      target="_blank"
                    >
                      <button
                        className={`mt-4 bg-green-200 rounded-lg p-1 flex justify-end pl-2 pr-2 hover:bg-red-400 drop-shadow-sm`}
                      >
                        {card.volunteer}
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
