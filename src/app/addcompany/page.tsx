"use client";
import { Header } from "@/components/modules";
import { Company, Tags } from "@/constants";
import { firebase_app } from "@/firebase/config";
import { useCompaniesStore } from "@/store/useCompaniesStore";
import { Avatar, Tag } from "@chakra-ui/react";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { getStorage, ref, uploadBytes } from "firebase/storage";

import {
  addDoc,
  collection,
  doc,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import { ChangeEvent, useCallback, useRef, useState } from "react";

export default function AddCompany() {
  const [selectedTags, setselectedTags] = useState([""]);
  const [companyName, setCompanyName] = useState("");
  const { companiesMap } = useCompaniesStore();
  const fileName = useRef("");
  const router = useRouter();

  const formRef = useRef({
    name: "",
    website: "",
    description: "",
    tags: [""],
  });

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

  const isCompanyDuplicate = useCallback(
    (company: string) => {
      if (companiesMap?.has(company.toLocaleLowerCase())) {
        alert("company already exists");
      }
    },
    [companiesMap]
  );

  const onSubmit = useCallback(
    async (event: any) => {
      event.preventDefault();
      const db = getFirestore(firebase_app);

      await addDoc(collection(db, "Companies"), {
        name: formRef.current.name,
        description: formRef.current.description,
        tags: formRef.current.tags,
        logo: fileName.current,
        rating: 1,
      });

      router.push("/");
    },

    [router]
  );

  const handleFileUpload = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const selectedFile = event.target.files ? event.target.files[0] : null; // Get the selected file
      if (selectedFile) {
        alert(selectedFile.type);
        const fileExtension = selectedFile.name.split(".").pop() ?? "";

        fileName.current = `${companyName
          .toLocaleLowerCase()
          .replaceAll(" ", "")}-logo.${fileExtension}`;
        const metadata = {
          contentType: selectedFile.type, // Set the content type to "image/png" for PNG files
        };
        const storage = getStorage();
        const storageRef = ref(storage, `/logos/${fileName.current}`);

        uploadBytes(storageRef, selectedFile, metadata)
          .then((snapshot) => {
            alert("Image uploaded successfully!");
            // You can also get the download URL here if needed:
            // const downloadURL = getDownloadURL(snapshot.ref);
          })
          .catch((error) => {
            console.error("Error uploading image: ", error);
          });
      }
    },
    [companyName]
  );

  return (
    <main className="bg-app-light flex flex-col items-center justify-start h-full w-full gap-4 ">
      <Header />
      <div className=" flex p-40">
        <form>
          <div className="space-y-12">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-black/10 pb-12 md:grid-cols-3">
              <div>
                <h2 className="text-base font-semibold leading-7 text-black">
                  Company Profile
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  This information will be displayed publicly so make sure it is
                  accurate.
                </p>
              </div>

              <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2 ">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="website"
                    className="block text-sm font-medium leading-6 text-black"
                  >
                    Company Name
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-green-600 sm:max-w-md">
                      <input
                        type="text"
                        name="website"
                        id="website"
                        onChange={(e) =>
                          (formRef.current.name = e.target.value)
                        }
                        onMouseLeave={(e) => {
                          setCompanyName(e.currentTarget.value);
                          isCompanyDuplicate(e.currentTarget.value);
                        }}
                        className="block flex-1 border-0 bg-white  py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Mcdonalds"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-4 mt-4 mb-4">
                    <label
                      htmlFor="website"
                      className="block text-sm font-medium leading-6 text-black"
                    >
                      Website
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-green-600 sm:max-w-md">
                        <span className="flex select-none items-center pl-3 text-black sm:text-sm bg-white">
                          http://
                        </span>
                        <input
                          type="text"
                          name="website"
                          id="website"
                          onChange={(e) =>
                            (formRef.current.website = e.target.value)
                          }
                          className="block flex-1 border-0 bg-white  py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          placeholder="www.example.com"
                        />
                      </div>
                    </div>
                  </div>

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
                        onChange={(e) =>
                          (formRef.current.description = e.target.value)
                        }
                        className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-black placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                        defaultValue={""}
                      />
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="tags"
                      className="block text-sm font-medium leading-6 text-black mt-4"
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

                <div className="col-span-full">
                  <label
                    htmlFor="photo"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Logo
                  </label>
                  <div className="mt-2 flex items-center gap-x-3">
                    <Avatar name={companyName} />

                    <button
                      type="button"
                      className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      change
                    </button>
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="cover-photo"
                    className="block text-sm font-medium leading-6 text-gray-900 "
                  >
                    Logo
                  </label>
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed bg-white border-gray-900/25 px-6 py-10">
                    <div className="text-center ">
                      <PhotoIcon
                        className="mx-auto h-12 w-12 text-gray-300"
                        aria-hidden="true"
                      />
                      <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-grey-600 font-semibold text-green-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-green-600 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="sr-only"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs leading-5 text-gray-600">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                </div>
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
              Submit
            </button>
          </div>
          <div />
        </form>
      </div>
    </main>
  );
}
