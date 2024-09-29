
import Image from "next/image";
import { UserCircleIcon } from "@heroicons/react/16/solid";

interface Props {
    profilepic: string;
    fullname: string;
    username: string;
    description: string;
    country: string;
    state: string;
    city: string;
}
export function ProfileShow(props: Props) {
  return(
  <div className="bg-gray-50 p-5">
    <div className="max-w-lg mx-auto my-10 bg-white rounded-lg shadow-md p-5">
      {props.profilepic ? (
        <Image
          src={`data:image/jpeg;base64,${props.profilepic}`}
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
        {props.fullname}
      </h2>
      <p className="text-center text-gray-600 mt-1">
        {props.username}
      </p>
      <div className="mt-5">
        <h3 className="text-xl font-semibold">About</h3>
        {props.description ? (
          <p className="text-gray-600 mt-2">{props.description}</p>
        ) : (
          <p className="text-gray-600 mt-2">Nil</p>
        )}
      </div>
      <div className="mt-5">
        <h3 className="text-xl font-semibold">Address</h3>
      </div>
      <div className="flex items-center gap-x-4 mt-5">
        <h3 className="text-md font-semibold">Country:</h3>
        {props.country ? (
          <p className="text-gray-600">{props.country}</p>
        ) : (
          <p className="text-gray-600">Nil</p>
        )}
      </div>
      <div className="flex items-center gap-x-4 mt-5">
        <h3 className="text-md font-semibold">State:</h3>
        {props.state ? (
          <p className="text-gray-600">{props.state}</p>
        ) : (
          <p className="text-gray-600">Nil</p>
        )}
      </div>
      <div className="flex items-center gap-x-4 mt-5">
        <h3 className="text-md font-semibold">City:</h3>
        {props.city ? (
          <p className="text-gray-600">{props.city}</p>
        ) : (
          <p className="text-gray-600">Nil</p>
        )}
      </div>
    </div>
  </div>
  );
}
