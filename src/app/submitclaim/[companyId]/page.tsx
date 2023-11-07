"use client";
import { Header } from "@/components/modules";
import { Tags } from "@/constants";
import { Admins } from "@/firebase/admins";
import { firebase_app } from "@/firebase/config";
import { useUserStore } from "@/store/useUserStore";
import { Stack, Tag } from "@chakra-ui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { FormEvent, useCallback, useMemo, useRef, useState } from "react";

interface ISubmitClaimProps {
  params: { companyId: string };
}

export default function SubmitClaim({ params }: ISubmitClaimProps) {
  const [referenceWebsites, setReferenceWebsites] = useState([""]);
  const [selectedTags, setselectedTags] = useState([""]);
  const { user } = useUserStore();

  const router = useRouter();

  const formRef = useRef({
    title: "",
    date: "",
    description: "",
    tags: [""],
    websites: [""],
  });

  const handleAddReference = useCallback(() => {
    if (referenceWebsites.length < 4) {
      setReferenceWebsites([...referenceWebsites, ""]);
    } else {
      alert("maximum number of references added");
    }
  }, [referenceWebsites]);

  const handleRemoveReference = useCallback(
    (index: number) => {
      const updatedWebsites = referenceWebsites.filter(
        (x, xindex) => xindex !== index
      );
      setReferenceWebsites(updatedWebsites);
    },
    [referenceWebsites]
  );

  const handleWebsiteChange = (index: number, value: string) => {
    const updatedWebsites = [...referenceWebsites];
    updatedWebsites[index] = value;
    setReferenceWebsites(updatedWebsites);
  };

  const onHandleSelectTag = (value: string) => {
    // Remove Tag if its already selected
    if (selectedTags.includes(value)) {
      const updatedTags = selectedTags.filter((x) => x !== value);
      formRef.current.tags = updatedTags;
      setselectedTags(updatedTags);
    } else {
      const updatedTags = [...selectedTags, value].filter((tag) => tag);
      formRef.current.tags = updatedTags;
      setselectedTags(updatedTags);
    }
  };

  // function validateWebsite() {
  //   const websiteValue = formRef.current.website;
  //   const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

  //   if (!urlPattern.test(websiteValue)) {
  //     alert("Please enter a valid website URL.");
  //     return false;
  //   }
  // }

  const onSubmit = useCallback(
    async (event: any) => {
      event.preventDefault();

      alert(JSON.stringify("Item added to Database"));

      const db = getFirestore(firebase_app);
      const companyRef = doc(db, "Companies", params.companyId);
      const companyDoc = await getDoc(companyRef);
      const existingData = companyDoc.data();

      const newIncident = {
        title: formRef.current.title,
        websites: formRef.current.websites,
        date: formRef.current.date,
        description: formRef.current.description,
        tags: formRef.current.tags,
      };

      if (Admins.includes(user?.user.uid!)) {
        if (existingData && existingData.incidents) {
          existingData.incidents.push(newIncident);
        }

        await setDoc(
          companyRef,
          {
            incidents:
              existingData && existingData?.incidents?.length > 0
                ? [...existingData.incidents]
                : [newIncident],
          },
          { merge: true }
        );
      } else {
        if (existingData && existingData.submittedIncidents) {
          existingData.submittedIncidents.push(newIncident);
        }
        await setDoc(
          companyRef,
          {
            submittedIncidents:
              existingData && existingData?.submittedIncidents?.length > 0
                ? [...existingData.submittedIncidents]
                : [newIncident],
          },
          { merge: true }
        );
      }

      router.back();
    },

    [params.companyId, router]
  );

  return (
    <main className="bg-app-light flex flex-col items-center justify-start h-full w-full gap-4">
      <Header />
      <div className=" flex p-40">
        <form>
          <div className="space-y-12">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-black/10 pb-12 md:grid-cols-3">
              <div>
                <h2 className="text-base font-semibold leading-7 text-black">
                  Incident Details
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  This information will be displayed publicly so make sure it is
                  accurate.
                </p>
              </div>

              {/** References */}

              <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2 ">
                <div className="sm:col-span-4">
                  <Stack>
                    {/** Title */}
                    <div className="flex flex-col">
                      <div className="sm:col-span-4">
                        <label
                          htmlFor="title"
                          className="block text-sm font-medium leading-6 text-black mt-4"
                        >
                          Title
                        </label>
                        <div className="mt-2">
                          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-green-600 sm:max-w-md">
                            <input
                              type="text"
                              name="title"
                              id="title"
                              required
                              className="block flex-1 border-0 bg-white  py-1.5 pl-1 text-gray-900 placeholder:text-gray-300 focus:ring-0 sm:text-sm sm:leading-6"
                              placeholder="Mcdonalds provided meals to Israeli soldiers"
                              onChange={(e) =>
                                (formRef.current.title = e.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <div className="sm:col-span-4">
                        <label
                          htmlFor="datePicker"
                          className="block text-sm font-medium leading-6 text-black"
                        >
                          Select a Date:
                        </label>
                        <div className="mt-2">
                          <div className="flex sm:max-w-md">
                            <input
                              type="date"
                              id="datePicker"
                              name="date"
                              required
                              onChange={(e) =>
                                (formRef.current.date = e.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Stack>
                  <label
                    htmlFor="website"
                    className="block text-sm font-medium leading-6 text-black mt-4"
                  >
                    Reference Website
                  </label>
                  <div className="mt-2 ">
                    {referenceWebsites.map((website, index) => (
                      <div
                        key={index}
                        className="flex rounded-md shadow-md sm:max-w-md mt-2 justify-center items-center"
                      >
                        <input
                          name="website"
                          id={`website${index}`}
                          className="block flex-1 border-0 bg-white py-1.5 pl-1 text-gray-900 placeholder:text-gray-300 focus:ring-0 sm:text-sm sm:leading-6"
                          placeholder="www.example.com"
                          type="url"
                          required
                          value={website}
                          onChange={(e) => {
                            formRef.current.websites[index] = e.target.value;
                            handleWebsiteChange(index, e.target.value);
                          }}
                        />
                        {index > 0 && (
                          <XMarkIcon
                            className="w-5 h-5 ml-2 mr-2 align-middle cursor-pointer"
                            onClick={() => handleRemoveReference(index)}
                          />
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={handleAddReference}
                      className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold mt-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      Add another reference
                    </button>
                  </div>
                </div>

                {/** Description */}
                <div className="col-span-full">
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Description
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="description"
                      name="description"
                      rows={3}
                      className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-black placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                      defaultValue={""}
                      onChange={(e) =>
                        (formRef.current.description = e.target.value)
                      }
                    />
                  </div>
                </div>
                {/** Tags */}
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
              onClick={router.back}
            >
              Cancel
            </button>
            <button
              onClick={onSubmit}
              className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
