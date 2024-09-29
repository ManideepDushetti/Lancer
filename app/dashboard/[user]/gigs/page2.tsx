import { getSession } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import { GigsPopulate } from "@/models/Gig";
import dbconnect from "@/lib/bdconnect";
import Gig from "@/models/Gig";
import { redirect } from "next/navigation";
import Link from "next/link";

async function getData(userid: string) {
  const res = await fetch(`http://localhost:3000/api/gigs?id=${userid}`, {
    cache: "no-store",
    method: "GET",
    headers: headers(),
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Page() {
  const session = await getSession();
  const details = JSON.parse(JSON.stringify(session, null, 2));
  const userid = details.user.id;
  const gigs = await getData(userid);
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
          {gigs.map((gig: GigsPopulate, index: number) => (
            <div key={gig._id}>
              <div className="flex px-8 py-12">
                <input
                  type="checkbox"
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
                      <form
                        action={async () => {
                          "use server";
                          await dbconnect();
                          try {
                            await Gig.findByIdAndDelete(gig._id);
                            console.log("Document is deleted successfuly");
                          } catch (error) {
                            console.log("error: ", error);
                          }
                          redirect("./gigs");
                        }}
                      >
                        <button type="submit">Delete</button>
                      </form>
                    </li>
                  </ul>
                </details>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
