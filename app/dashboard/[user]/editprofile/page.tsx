import { UserCircleIcon } from "@heroicons/react/24/solid";
import { getSession } from "@/lib/auth";
import Image from "next/image";
import dbconnect from "@/lib/bdconnect";
import User, { Users } from "@/models/User";
import Profile, { Profiles } from "@/models/Profile";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Page() {
  const session = await getSession();
  const details = JSON.parse(JSON.stringify(session, null, 2));
  const userid = details.user.id;
  const profile = await Profile.findOne({ user: userid }).populate("user");
  const user = await User.findOne({ _id: userid });

  async function editProfileAction(formData: FormData) {
    "use server";

    const image: File | null = formData.get("profilepic") as unknown as File;
    if (!File) {
      throw new Error("no file uploaded");
    }

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const userData = {
      fullname: formData.get("fullname"),
      username: formData.get("username"),
    };

    const profileData = bytes.byteLength
      ? {
          description: formData.get("description"),
          country: formData.get("country"),
          city: formData.get("city"),
          state: formData.get("state"),
          zip: formData.get("zip"),
          profilepic: buffer,
        }
      : {
          description: formData.get("description"),
          country: formData.get("country"),
          city: formData.get("city"),
          state: formData.get("state"),
          zip: formData.get("zip"),
        };

    await dbconnect();

    User.findOneAndUpdate(
      { _id: user._id }, // Filter criteria
      userData, // Update data
      { new: true } // To return the updated document
    )
      .then((updatedDocument) => {
        if (updatedDocument) {
          console.log("User updated successfully:");
        } else {
          console.log("Document not found");
        }
      })
      .catch((error) => {
        console.error("Error updating document:", error);
      });

    Profile.findOneAndUpdate(
      { _id: profile._id }, // Filter criteria
      profileData, // Update data
      { new: true } // To return the updated document
    )
      .then((updatedDocument) => {
        if (updatedDocument) {
          console.log("Profile updated successfully:");
        } else {
          console.log("Document not found");
        }
      })
      .catch((error) => {
        console.error("Error updating document:", error);
      });

    redirect("./profile");
  }

  return (
    <form action={editProfileAction}>
      <div className="space-y-12 mt-6 w-4/5 m-auto">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Edit your Profile
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            This information will be displayed publicly so be careful what you
            share.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-green-600 sm:max-w-md">
                  <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                    lancer.com/
                  </span>
                  <input
                    type="text"
                    name="username"
                    defaultValue={user.username}
                    id="username"
                    autoComplete="username"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-500 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="janesmith"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="about"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                About
              </label>
              <div className="mt-2">
                <textarea
                  id="about"
                  name="description"
                  rows={3}
                  className="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                  defaultValue={profile.description}
                  placeholder="Tell about yourself, your skills and previous work."
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Write a few sentences about yourself.
              </p>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="photo"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Photo
              </label>
              <div className="mt-2 flex items-center gap-x-3">
                {profile.profilepic ? (
                  <Image
                    src={`data:image/jpeg;base64,${profile.profilepic}`}
                    width={80}
                    height={80}
                    alt="Profile Picture"
                    className="rounded-full"
                  />
                ) : (
                  <UserCircleIcon
                    className="h-20 w-20 text-gray-300"
                    aria-hidden="true"
                  />
                )}

                <button
                  type="button"
                  className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  <input
                    type="file"
                    id="imageInput"
                    accept="image/*"
                    name="profilepic"
                  ></input>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Personal Information
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Use a permanent address where you can receive mail.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="full-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Full Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="fullname"
                  id="full-name"
                  defaultValue={user.fullname}
                  autoComplete="given-name"
                  className="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={user.email}
                  readOnly
                  className="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
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
                  defaultValue={profile.country}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>India</option>
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Mexico</option>
                </select>
              </div>
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
                  autoComplete="address-level2"
                  defaultValue={profile.city}
                  className="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="region"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                State / Province
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="state"
                  id="region"
                  autoComplete="address-level1"
                  defaultValue={profile.state}
                  className="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="postal-code"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                ZIP / Postal code
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="zip"
                  id="postal-code"
                  autoComplete="postal-code"
                  defaultValue={profile.zip}
                  className="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
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
          href="./profile"
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
  );
}
