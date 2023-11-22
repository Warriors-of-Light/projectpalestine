// About Page //

"use client";

import { US_STATES, WORLD_COUNTRIES } from "@/constants";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { firebase_app } from "@/firebase/config";
import Cookies from "js-cookie";
import Image from "next/image";
import palestine from "../../../../assets/palestine.png";
import Link from "next/link";

export default function About() {
  const [isParticipate, setIsParticipate] = useState(false);
  const [isOragnize, setIsOrganize] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("Afghanistan");

  const signUpForm = useRef({
    email: "",
    country: "",
    state: "",
    city: "",
  });

  const router = useRouter();

  const onHandleSubmit = useCallback(async (event: any) => {
    const { email, country, state, city } = signUpForm.current;

    const db = getFirestore(firebase_app);

    if (!email || !country || !state || !city) {
      return; // Prevent form submission
    } else {
      event.preventDefault();
    }

    // Check if the cookie exists

    if (Cookies.get("formSubmitted")) {
      console.log("Form already submitted!");
      // Handle the case where the form has already been submitted
      return;
    }

    await addDoc(collection(db, "Signups"), {
      email: email,
      country: country,
      state: state,
      city: city,
    });

    // Set a cookie to indicate that the form has been submitted
    Cookies.set("formSubmitted", "true", { expires: 7 }); // Expires in 7 days

    setIsParticipate(false);
  }, []);

  return (
    <main className="relative isolate min-h-screen bg-white ">
      <header className="p-10">
        <span
          className="  text-black cursor-pointer p-10"
          onClick={() => router.back()}
        >
          <IoMdArrowRoundBack />
        </span>
      </header>
      <div className="p-40 pt-10">
        <Image
          src={palestine}
          alt={"Image of palstine"}
          className={`lg:absolute md:relative sm:relative xs:relative lg:right-96 lg:top-60`}
        />
        {/* <Image
          src={palestine}
          alt={"Image of palstine"}
          className={`lg:absolute md:relative sm:relative xs:relative lg:right-600 lg:top-96 pl-40 rotate-0`}
        />

        <Image
          src={gaza}
          alt={
            "sticker of a hand in the color of the palestinian flag with free Gaza and free Palestine written on it"
          }
          className={`lg:absolute md:relative sm:relative xs:relative lg:right-600 lg:top-200 pl-96 rotate-0`}
        /> */}

        <span className="text-black text-lg">
          Nothing justifies the killing of innocent people of any race or
          religion
          <br />
          Nothing justifies the killing of children, volunteers and press
          journalists
          <br />
          As humans we condemn violence and killing of any innocent human being
          <br />
          We are all humans, and a human life is sacred regardless of race or
          religion
          <br />
          This event is pro-peace, pro-justice and pro-freedom for all
          <br />
          It is against racial segragation and apartheid in all its forms
          <br />
          Since the 7th of October, more than 11,000 Palestinian civillans have
          been killed
          <br />
          It took me more than 10 minutes to write this. A child is killed every
          10 minutes!{" "}
          <a
            className="hover:underline text-blue-600"
            target="_blank"
            href="https://www.reuters.com/world/middle-east/child-killed-average-every-10-minutes-gaza-says-who-chief-2023-11-10/"
          >
            [1]
          </a>
          <br />
          The amount of bombs dropped is equivalent to 2 nuclear bombs{" "}
          <a
            className="hover:underline text-blue-600"
            target="_blank"
            href="https://euromedmonitor.org/en/article/5908/Israel-hits-Gaza-Strip-with-the-equivalent-of-two-nuclear-bombs#:~:text=Geneva%20%2D%20Israel%20has%20dropped%20more,a%20press%20release%20issued%20today."
          >
            [2]
          </a>
          <br />
          This is not the first time Israel has bombed Gaza, it has been
          happening for decades
          <br />
          Before the 7th of October, Israel has been taking over Palestinian
          homes, lands and farms
          <br />
          Israel claims that it is defending itself, and getting their hostages
          back
          <br />
          But they refused negotiations to get them back in exchange for a
          ceasefire{" "}
          <a
            className="hover:underline text-blue-600"
            target="_blank"
            href="https://www.theguardian.com/world/2023/nov/09/netanyahu-rejected-ceasefire-for-hostages-deal-in-gaza-sources-say"
          >
            [3]
          </a>
          <br />
          They took more than 4000 hostages since the 7th of October after they
          revoked work permits of Palestinians{" "}
          <a
            className="hover:underline text-blue-600"
            target="_blank"
            href="https://www.independent.co.uk/news/world/middle-east/gazan-work-permits-missing-israel-b2432631.html"
          >
            [4]
          </a>
          <br />
          They bombed hospitals and schools. Openly saying they want to wipe
          gaza out and build a new theme park?{" "}
          <a
            className="hover:underline text-blue-600"
            target="_blank"
            href="https://www.middleeastmonitor.com/20231104-israelis-on-gaza-level-it-and-turn-it-into-a-theme-park/"
          >
            [5]
          </a>
          <br />
          If you read history, and read the facts you will see how Israel has
          been the aggressor
          <br />
          You will learn the truth about the apartheid, terrorist and racist
          regime of Israel{" "}
          <a
            className="hover:underline text-blue-600"
            target="_blank"
            href="https://www.tantura-film.com/"
          >
            [6]
          </a>
          <a
            className="hover:underline text-blue-600"
            target="_blank"
            href="          https://www.youtube.com/watch?v=aEdGcej-6D0&ab_channel=AJ%2B
            "
          >
            [7]
          </a>
          <br />
          And let me be completely clear, we are not against the Jewish people
          <br />
          Nor are we against people from Israel that do not agree with their
          government
          <br />
          This land had Jews, Chrisitans and Muslims, living in peace in the
          past{" "}
          <a
            className="hover:underline text-blue-600"
            target="_blank"
            href="          https://promisedlandmuseum.org/peaceful-palestine/
            "
          >
            [8]
          </a>
          <br />
          The cycle of violence in Palestine started with the zionist movement
          <br />
          We believe a truly peaceful world can not be attained without justice
          which will not be attained through apartheid
          <br />
          Racial segragation is a crime against humanity and we will not stand
          by while some humans are seen as less than others
          <br />
          And are being killed, displaced and cut off water, electricty and food
          in the name of peace and self-defense
          <br />
          It is time for us to unite to end this injustice against Palestinians,
          and find a real solution built on justice
          <br />
          We are the generation that can end this cycle of violence
          <br />
          We could be the generation of true liberation and equal rights
          <br />
          We could be the generation that chooses love over fear, and end this
          injustice
        </span>
        {/* <span className="text-black text-md">
          People in Gaza are undergoing a genocide and the US is participating.{" "}
          <br />
          It used its veto power to block the UN from condemning Israel. <br />
          And it has been greenlighting Israel’s crimes for decades. <br />{" "}
          <br />
          As of today, more than 11,000 Palestinians have been killed. <br />
          More than a million people have been displaced. <br />
          And innocent civillans are brutally bombed. <br />
          With American weapons and your dollars. <br />
          <br /> It took me more than 10 minutes to create this, <br /> Enough
          time for Israel to kill an innocent child. <br /> Are we just going to
          let this happen in front of our eyes? <br /> <br /> No, we need to
          stop this. <br /> We can not let it just happen. <br />
          <h1 className="text-black text-md font-semibold">
            We are the generation that can end this injustice.
          </h1>
          <br />
          When you read history and think of the collective effort it took to
          abolish slavery, <br /> to end the apartheid in South Africa, <br />{" "}
          to get the rights of any marginalized and oppressed group of people,
          <br /> what do you see? <br /> <br />{" "}
          <h1 className="text-black text-md font-semibold">
            {" "}
            It took effort, courage and resistance against the status quo to
            create a better reality{" "}
          </h1>{" "}
          <br /> This is our chance to impact the course of history. <br /> And
          we need your courage.
          <br />
          We need courage to act <br />
          To speak up the truth.
          <br /> <br />I know that you are sick of the news being biased. <br />
          Not showing the crimes committed by Israel. <br />
          Normalizing Hospital bombing, <br /> Normalizing children murder,
          <br />
          They are trying hard to silence the truth. <br />
          With their propaganda <br />
          With targeting Press <br />
          And this is just what has been happening in the past month. <br />
          Not taking into account the injustice against Palestinians for the
          past 75 years. <br /> <br />
          It is time to do something different. <br />
          We have shouted, we have boycotted, and we have demanded a Ceasefire,
          but nothing has changed. <br />
          But now our eyes are open. <br /> We will not let this just happen and
          stand helpless with our tax dollars, OUR money. <br /> We will not let
          the US terrorize and kill innocent people in Palestine in the name of
          peace and self-defense. <br /> This has been going on for so long
          because the people at the top only understand power and money. <br />{" "}
          The concepts of justice, humanity, and fairness are too far-fetched
          for them to grasp. <br /> So let’s bring it to their level. <br />{" "}
          <br /> This march for justice will talk money. <br /> A peaceful
          march— we will start by sitting down together in a park, hand in hand.
          choosing love over fear. <br /> Then, we will vote towards justice
          with our dollars, all together, collectively. <br /> We will put our
          money where our mouths are. <br /> We will shake the stock market.{" "}
          <br />
          The one thing they will understand.
        </span> */}
      </div>
      <div className=" flex  justify-center space-x-10 pb-40 -mt-20 ">
        <div
          onClick={() => {
            setIsOrganize(false);
            setIsParticipate(true);
          }}
          className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6 hover-gradient cursor-pointer flex flex-col border-green-400 border-2 drop-shadow-md "
        >
          <span className="text-black text-xl font-bold">Participate</span>
          <span className="text-black ">
            Join us in the closest walk to you
          </span>
        </div>
        <div
          onClick={() => {
            setIsParticipate(false);
            setIsOrganize(true);
          }}
          className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6 hover-gradient-red cursor-pointer flex flex-col border-red-400 border-2 drop-shadow-md"
        >
          <span className="text-black  text-xl font-bold">Organize</span>
          <span className="text-black ">
            Help us organize a walk in your city
          </span>
        </div>
      </div>
      {isParticipate &&
        (!Cookies.get("formSubmitted") ? (
          <div className="w-full justify-center flex pb-20 drop-shadow-2xl -mt-24">
            <div className=" w-96 gap-x-8 gap-y-8 pt-2 md:grid-cols-3">
              <form className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
                <div className="px-4 py-6 sm:p-8">
                  <div className="max-w-2xl gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                      <span className="justify-center text-black text-center">
                        We will send details for the nearest walk to you on
                        Thursday. Make sure to follow our page.
                      </span>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900 mt-3"
                      >
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                          onChange={(event) =>
                            (signUpForm.current.email = event.target.value)
                          }
                          className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Country
                      </label>
                      <div className="mt-2">
                        <select
                          id="country"
                          name="country"
                          autoComplete="country-name"
                          required
                          onChange={(event) => {
                            signUpForm.current.country = event.target.value;
                            setSelectedCountry(event.target.value);
                          }}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                          {WORLD_COUNTRIES.map((country, index) => (
                            <option key={index}>{country}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="state"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        State
                      </label>
                      {selectedCountry === "United States of America" ? (
                        <div className="mt-2">
                          <select
                            id="state"
                            name="state"
                            autoComplete="state"
                            required
                            onSelect={(event) => {
                              signUpForm.current.state =
                                event.currentTarget.value;
                            }}
                            onChange={(event) =>
                              (signUpForm.current.state = event.target.value)
                            }
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                          >
                            {US_STATES.map((state, index) => (
                              <option key={index}>{state}</option>
                            ))}
                          </select>
                        </div>
                      ) : (
                        <input
                          type="text"
                          name="state"
                          id="state"
                          autoComplete="state"
                          required
                          onChange={(event) =>
                            (signUpForm.current.state = event.target.value)
                          }
                          className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      )}
                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        City
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="city"
                          id="city"
                          autoComplete="city"
                          required
                          onChange={(event) =>
                            (signUpForm.current.city = event.target.value)
                          }
                          className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
                  <button
                    type="submit"
                    onClick={onHandleSubmit}
                    className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Submit
                  </button>
                </div>
              </form>
              <a
                href="https://www.instagram.com/project.palestine_org"
                target="_blank"
                className="instagram-follow-button  p-10 relative justify-center top-4 left-28"
              >
                <i className="fab fa-instagram"></i> Follow our page
              </a>
              <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"
              />
            </div>
          </div>
        ) : (
          <div className="justify-center w-full flex align-top h-20 -mt-20">
            <span className="text-black">
              Form already submitted. We will send details on Thursday.
            </span>
          </div>
        ))}{" "}
      {isOragnize && (
        <div className="flex-col -mt-20 justify-center  flex items-center">
          <div className="mb-3">
            <span className="text-black pr-2 ">
              {" "}
              Email us{" "}
              <Link
                className="text-blue-600 underline"
                href={
                  "mailto:injusticecrush@gmail.com?subject=Will%20Help%20Organize%20In%20[Country,%20State,%20City]"
                }
              >
                here
              </Link>
            </span>
          </div>
          <div className="mb-3">
            <span className="text-black pr-2"> Or </span>
          </div>
          <div className="w-screen pb-10  justify-center relative flex items-center ">
            <span className="text-black pr-2"> DM us on </span>
            <a
              href="https://www.instagram.com/project.palestine_org"
              target="_blank"
              className="instagram-follow-button"
            >
              <i className="fab fa-instagram"></i> project.palestine_org
            </a>
            <link
              rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"
            />
          </div>
        </div>
      )}
    </main>
  );
}
