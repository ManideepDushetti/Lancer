import Link from "next/link";
import Image from "next/image";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import Profile from "@/models/Profile";
import { getSession } from "@/lib/auth";

export default async function Page() {
  const session = await getSession();
  const details = JSON.parse(JSON.stringify(session, null, 2));
  const userid = details.user.id;
  const profileres = await Profile.findOne({ user: userid }).populate("user");
  const profile = JSON.parse(JSON.stringify(profileres));
  return (
    <div className="bg-gray-50 p-5">
      <div className="max-w-lg mx-auto my-10 bg-white rounded-lg shadow-md p-5">
        {profile.profilepic ? (
          <Image
            src={`data:image/jpeg;base64,${profile.profilepic}`}
            width={80}
            height={80}
            alt="Profile Picture"
            className="w-32 h-32 rounded-full mx-auto"
          />
        ) : (
          <UserCircleIcon
            className="w-32 h-32 text-gray-300 mx-auto"
            aria-hidden="true"
          />
        )}
        <h2 className="text-center text-2xl font-semibold mt-3">
          {profile.user.fullname}
        </h2>
        <p className="text-center text-gray-600 mt-1">
          {profile.user.username}
        </p>
        <div className="mt-5">
          <h3 className="text-xl font-semibold">About</h3>
          {profile.description ? (
            <p className="text-gray-600 mt-2">{profile.description}</p>
          ) : (
            <p className="text-gray-600 mt-2">Nil</p>
          )}
        </div>
        <div className="mt-5">
          <h3 className="text-xl font-semibold">Address</h3>
        </div>
        <div className="flex items-center gap-x-4 mt-5">
          <h3 className="text-md font-semibold">Country:</h3>
          {profile.country ? (
            <p className="text-gray-600">{profile.country}</p>
          ) : (
            <p className="text-gray-600">Nil</p>
          )}
        </div>
        <div className="flex items-center gap-x-4 mt-5">
          <h3 className="text-md font-semibold">State:</h3>
          {profile.state ? (
            <p className="text-gray-600">{profile.state}</p>
          ) : (
            <p className="text-gray-600">Nil</p>
          )}
        </div>
        <div className="flex items-center gap-x-4 mt-5">
          <h3 className="text-md font-semibold">City:</h3>
          {profile.city ? (
            <p className="text-gray-600">{profile.city}</p>
          ) : (
            <p className="text-gray-600">Nil</p>
          )}
        </div>
      </div>
      <div className="flex justify-center">
        <Link
          className="middle none center rounded-lg bg-green-500 py-3 px-6 font-sans text-xs font-normal text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          data-ripple-light="true"
          href="./editprofile"
        >
          Edit Profile
        </Link>

        <link
          rel="stylesheet"
          href="https://unpkg.com/@material-tailwind/html@latest/styles/material-tailwind.css"
        />
      </div>
    </div>
  );
}
