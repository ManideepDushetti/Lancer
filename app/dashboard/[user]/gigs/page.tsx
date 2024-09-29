"use client";

import Image from "next/image";
import { GigsPopulate } from "@/models/Gig";
import { gigDelete, selectGigDelete } from "@/app/actions/gigAction";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

export default function Page() {
  const [gigs, setGigs] = useState([]);
  const [gigstate, setgigstate] = useState(new Map());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await axios.get("/api/cookies");
        const response = await axios.get(
          `/api/gigs?id=${user.data}`
        );
        setGigs(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-bold leading-tight text-gray-800 sm:text-3xl lg:text-4xl ml-10 my-5">
        Manage your Gigs here!
      </h2>

      <div className="flex">
        <Link
          className="middle none ml-10 center rounded-lg bg-green-500 py-3 px-6 font-sans text-xs font-normal text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          data-ripple-light="true"
          href="./editgig"
        >
          Add Gig
        </Link>

        <link
          rel="stylesheet"
          href="https://unpkg.com/@material-tailwind/html@latest/styles/material-tailwind.css"
        />
      </div>

      <div>
        <div className="">
          <div className="flex px-8 pt-8">
            <form action={selectGigDelete.bind(null, gigstate)}>
              <button type="submit" className="size-5 my-auto flex-none w-20 ">
                Delete
              </button>
            </form>
          </div>
          {gigs.length ? (
            gigs.map((gig: GigsPopulate, index: number) => (
              <div key={index}>
                <div className="flex px-8 py-8">
                  <input
                    type="checkbox"
                    onChange={(event) => {
                      const newstate = new Map(gigstate);
                      if (gigstate.has(gig._id)) {
                        newstate.delete(gig._id);
                      } else {
                        newstate.set(gig._id, true);
                      }
                      setgigstate(newstate);
                    }}
                    className="size-5 my-auto checkbox checkbox-success flex-none w-20"
                  />
                  <div className="my-auto">
                    <Image
                      width={80}
                      height={80}
                      className="h-12 w-20 rounded-md mx-5 flex-none "
                      src={`data:image/jpeg;base64,${gig.thumbnail}`}
                      alt="This is a gig image"
                    />
                  </div>
                  <blockquote className="">
                    <p className="text-lg my-2 text-black font-medium flex-1 w-128">
                      {gig.name}
                    </p>
                  </blockquote>

                  <details className="dropdown my-auto mx-4 relative">
                    <summary className="m-1 btn">Options</summary>
                    <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52 absolute">
                      <li>
                        <Link
                          href={{
                            pathname: "./editgig",
                            query: { gigid: gig._id },
                          }}
                        >
                          Edit
                        </Link>
                      </li>
                      <li>
                        <form action={gigDelete.bind(null, gig._id)}>
                          <button type="submit">Delete</button>
                        </form>
                      </li>
                    </ul>
                  </details>
                </div>
              </div>
            ))
          ) : (
            <p className="px-8 py-8">You do not have any Gigs to show!</p>
          )}
        </div>
      </div>
    </div>
  );
}
