import { UserCircleIcon } from "@heroicons/react/16/solid";
import Gig from "@/models/Gig";
import Image from "next/image";
import Link from "next/link";

async function getGig(gigname: string) {
  const gig = await Gig.findOne({ name: gigname.replace(/-/g, ' ') }).populate({
    path: "provider",
    populate: {
      path: "user",
      model: "User",
    },
  });
  const gigstr = JSON.stringify(gig);
  return JSON.parse(gigstr);
}

export default async function Page({ params }: { params: { gig: string } }) {
  console.log("This is params of gigname ", params.gig);
  const gig = await getGig(params.gig);
  const profile = gig.provider;
  return (
    <div className="flex w-4/5 m-auto">
      <div className="px-8 py-12">
        <p className="text-2xl mb-5 font-bold text-gray-600 ">{gig.name}</p>
        <div className="flex">
          {gig.provider.profilepic ? (
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
            <p className="text-base text-gray-600">{profile.user.fullname}</p>
          </div>
        </div>
        <div className="mx-auto">
          <Image
            width={700}
            height={200}
            className="rounded-lg my-5"
            src={`data:image/jpeg;base64,${gig.thumbnail}`}
            alt="This is a gig image"
          />
        </div>
        <p className="text-2xl mb-5 font-bold text-gray-700 ">About my gig</p>
        <p className="text-base mb-5 font-normal text-black ">
          {gig.description}
        </p>
      </div>

      <div className="mx-8 my-12 flex-1 realtive">
        <div className="p-6 border-2 sticky top-5">
          <p className="text-xl mb-5 font-bold text-gray-700 text-center ">
            Service price
          </p>
          <p className="text-xl mb-5 font-bold text-black text-center ">
            ${gig.minprice}
          </p>
          <div className="flex justify-center">
            <Link
              className="middle none center rounded-lg bg-green-500 py-3 px-6 font-sans text-base font-normal text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              data-ripple-light="true"
              href={`./${gig.name.replace(/\s/g, '-')}/order`}
            >
              Continue
            </Link>

            <link
              rel="stylesheet"
              href="https://unpkg.com/@material-tailwind/html@latest/styles/material-tailwind.css"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
