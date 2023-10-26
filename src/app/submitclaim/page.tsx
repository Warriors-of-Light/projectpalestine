"use client";
import { Header } from "@/components/modules";
import { Tags } from "@/constants";
import { firebase_app } from "@/firebase/config";
import { useCompaniesStore } from "@/store/useCompaniesStore";
import { Stack, Tag } from "@chakra-ui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { getFirestore, doc } from "firebase/firestore";
import { FormEvent, useCallback, useMemo, useRef, useState } from "react";

export default function SubmitClaim() {
  const [referenceWebsites, setReferenceWebsites] = useState([""]);
  const [selectedTags, setselectedTags] = useState([""]);
  const { companiesMap } = useCompaniesStore();

  const formRef = useRef({
    title: "",
    date: "",
    references: [""],
    description: "",
    tags: [""],
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
      setselectedTags(updatedTags);
    } else {
      const updatedTags = [...selectedTags, value];
      setselectedTags(updatedTags);
    }

    const db = getFirestore(firebase_app);

    const userRef = doc(db, "comapnies");
    // userRef
    //   .set(
    //     {
    //       name: "John Doe",
    //       email: "johndoe@example.com",
    //       age: 30,
    //     },
    //     { merge: true }
    //   )
    //   .then(() => {
    //     console.log("Document created or updated successfully!");
    //   })
    //   .catch((error) => {
    //     console.error("Error creating or updating document: ", error);
    //   });
  };

  const onSubmit = useMemo(
    () => async (event: FormEvent<HTMLFormElement>) => {
      const newFormData = new FormData();

      newFormData.append("title", formRef.current.title);
      newFormData.append("date", formRef.current.date);
      newFormData.append("description", formRef.current.description);
      newFormData.append("country", JSON.stringify(formRef.current.references));
      newFormData.append("governorate", JSON.stringify(formRef.current.tags));

      event.preventDefault();
    },

    []
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
                          htmlFor="website"
                          className="block text-sm font-medium leading-6 text-black mt-4"
                        >
                          Title
                        </label>
                        <div className="mt-2">
                          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-green-600 sm:max-w-md">
                            <input
                              type="text"
                              name="website"
                              id="website"
                              className="block flex-1 border-0 bg-white  py-1.5 pl-1 text-gray-900 placeholder:text-gray-300 focus:ring-0 sm:text-sm sm:leading-6"
                              placeholder="Macdonalds provided meals to Israeli soldiers"
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
                            <input type="date" id="datePicker" name="date" />
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
                        <span className="flex select-none items-center pl-3 h-9 text-black sm:text-sm bg-white">
                          http://
                        </span>
                        <input
                          type="text"
                          name="website"
                          id={`website${index}`}
                          className="block flex-1 border-0 bg-white py-1.5 pl-1 text-gray-900 placeholder:text-gray-300 focus:ring-0 sm:text-sm sm:leading-6"
                          placeholder="www.example.com"
                          value={website}
                          onChange={(e) =>
                            handleWebsiteChange(index, e.target.value)
                          }
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
                      id="about"
                      name="about"
                      rows={3}
                      className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-black placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                      defaultValue={""}
                    />
                  </div>
                </div>
                {/** Tags */}
                <div className="col-span-full">
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium leading-6 text-black"
                  >
                    Tags
                  </label>
                  <div className="mt-2 ring-black">
                    {Object.values(Tags).map((tag, index) => (
                      <Tag
                        cursor={"pointer"}
                        m={2}
                        key={index}
                        backgroundColor={
                          selectedTags.includes(tag) ? "green.200" : undefined
                        }
                        onClick={() => onHandleSelectTag(tag)}
                      >
                        {tag}
                      </Tag>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
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
