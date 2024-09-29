import Image from "next/image";
import { UserCircleIcon } from "@heroicons/react/16/solid";
import { headers } from "next/headers";
import Gig, { GigsPopulate } from "@/models/Gig";
import Link from "next/link";
import { Users } from "@/models/User";
import Profile, { NullableProfiles } from "@/models/Profile";

async function getGigs(userid: string): Promise<GigsPopulate[]> {
  const profile: NullableProfiles = await Profile.findOne({ user: userid });
  if (profile) {
    const gigs: GigsPopulate[] = await Gig.find({
      provider: profile._id,
    }).populate({
      path: "provider",
      populate: {
        path: "user",
        model: "User",
      },
    });
    const restr = JSON.stringify(gigs);
    return JSON.parse(restr);
  }
  return [];
}

export async function MyGigs(props: { userid: string }) {
  const gigs: GigsPopulate[] = await getGigs(props.userid);
  const profiles: Array<Users> = [];
  gigs.forEach((gig: GigsPopulate) => {
    profiles.push(gig.provider.user as Users);
  });
  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        {gigs.map((gig: GigsPopulate, index: number) => (
          <div key={gig._id}>
            <div className="px-8 py-12">
              <Link
                href={`./${profiles[index].username}/${gig.name.replace(
                  /\s/g,
                  "-"
                )}`}
              >
                <div className="mx-auto">
                  <Image
                    width={500}
                    height={500}
                    className="w-full h-60 rounded-lg mx-auto"
                    src={`data:image/webp;base64,${gig.thumbnail}`}
                    alt="This is a gig image"
                  />
                </div>
                <blockquote className="">
                  <p className="text-lg my-2 text-black font-medium">
                    {gig.name}
                  </p>
                </blockquote>
              </Link>
              <Link href={`./${profiles[index].username}`}>
                <div className="flex">
                  {gig.provider.profilepic ? (
                    <Image
                      src={`data:image/webp;base64,${gig.provider.profilepic}`}
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
                      {profiles[index].fullname}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
