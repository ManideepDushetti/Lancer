"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { GigsPopulate } from "@/models/Gig";
import { Users } from "@/models/User";
import axios from "axios";
import Link from "next/link";
import { UserCircleIcon } from "@heroicons/react/16/solid";
import {saveOrder} from "@/app/actions/saveOrder";

export default function Page() {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();

  const formattedDate = `${year}-${month}-${day}`;

  const pathname = usePathname();
  const slicedpath = pathname.split("/");
  const gigname = slicedpath[2].replace(/-/g, " ");
  const [gig, setGig] = useState<GigsPopulate>();
  const [user, setUser] = useState<Users>();
  const [Deadline, setDeadline] = useState(formattedDate);

  const HandleDeadline = (days: number) => {
    const futureDate = new Date(today);
    futureDate.setDate(futureDate.getDate() + days);
    const day = String(futureDate.getDate()).padStart(2, "0");
    const month = String(futureDate.getMonth() + 1).padStart(2, "0");
    const year = futureDate.getFullYear();

    const formattedFutureDate = `${year}-${month}-${day}`;
    setDeadline(formattedFutureDate);

  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/gigs?name=${slicedpath[2]}`
        );
        setGig(response.data);
        setUser(response.data.provider.user);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [slicedpath, gig]);

  return (
    <div className="w-4/5 m-auto">
      <p className="my-4 font-bold text-gray-800 text-2xl">
        Please conform your order
      </p>
      <p className="my-8 font-bold text-gray-700 text-xl">
        <span className="text-3xl text-green-700 mr-4">Gig name:</span>{" "}
        {gigname}
      </p>
      {gig ? (
        <div className="flex">
          <span className="text-3xl text-green-700 mr-4 font-bold">
            Provider:
          </span>
          {gig.provider && gig.provider.profilepic ? (
            <Image
              src={`data:image/jpeg;base64,${gig.provider.profilepic}`}
              width={80}
              height={80}
              alt="Profile Picture"
              className="w-12 h-12 rounded-full my-auto"
            />
          ) : (
            <UserCircleIcon
              className="w-12 h-12 text-gray-300 my-auto"
              aria-hidden="true"
            />
          )}
          <div className="my-auto mx-5">
            <p className="text-base text-gray-600">
              {user ? user.username : ""}
            </p>
          </div>
        </div>
      ) : (
        ""
      )}
      <p className="my-8 font-bold text-gray-700 text-xl">
        <span className="text-3xl text-green-700 mr-4">Mininum price:</span>{" "}
        {gig ? gig.minprice : 0}$
      </p>
      {gig && user? (
        <form action={saveOrder.bind(null, gig._id, user?._id)}>
        <div className="space-y-12 mt-6 w-full m-auto">
          <div className="border-b border-gray-900/10 pb-4">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              {"Please enter your order details:"}
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              This information will be shared with the seller
            </p>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-2">
                <label
                  htmlFor="min-price"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  The budget for the project
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="min-price"
                    id="min-price"
                    min={gig ? gig.minprice : 0}
                    autoComplete="min-price"
                    defaultValue={gig ? gig.minprice : 0}
                    className="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  The budget shouldn&apos;t be less than the minimum price
                </p>
              </div>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-2">
                <label
                  htmlFor="today"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Project Requested Date
                </label>
                <div className="mt-2">
                  <input
                    type="date"
                    name="today"
                    id="today"
                    autoComplete="today"
                    value={formattedDate}
                    readOnly
                    className="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-2">
                <label
                  htmlFor="deadlinedays"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Days to complete
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="deadlinedays"
                    id="deadlinedays"
                    autoComplete="deadlinedays"
                    defaultValue="0"
                    onChange={(event) => {
                        HandleDeadline(parseInt(event.target.value));
                    }}
                    className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-2">
                <label
                  htmlFor="deadline"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Project Deadline date
                </label>
                <div className="mt-2">
                  <input
                    type="date"
                    name="deadline"
                    id="deadline"
                    autoComplete="deadline"
                    readOnly
                    value={Deadline}
                    className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 w-4/5 m-auto flex items-center justify-start gap-x-6">
          <Link
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
            href="./"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            Save
          </button>
        </div>
      </form>
      ):("")}
      
    </div>
  );
}
