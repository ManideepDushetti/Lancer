'use client'
import Image from "next/image";
import { GigsPopulate } from "@/models/Gig";
import { Users } from "@/models/User";
import Link from "next/link";
import axios from "axios";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";

export default function ShowGig() {
  const [gigs, setGigs] = useState<GigsPopulate[]>([]);
  const profiles: Array<Users> = [];
  gigs.forEach((gig: GigsPopulate) => {
    profiles.push(gig.provider.user as Users);
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const giglist = await axios.get("/api/gigs");
        setGigs(giglist.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        {gigs.map((gig: GigsPopulate, index: number) => (
          <div key={gig._id}>
           
              <div className="px-8 py-12">
              <Link href={`${profiles[index].username}/${gig.name.replace(/\s/g, '-')}`}>
                <div className="mx-auto">
                  <Image
                    width={500}
                    height={500}
                    className="w-full h-60 rounded-lg mx-auto"
                    src={`data:image/jpeg;base64,${gig.thumbnail}`}
                    alt="This is a gig image"
                  />
                </div>
                <blockquote className="">
                  <p className="text-lg my-2 text-black font-medium">
                    {gig.name}
                  </p>
                </blockquote>
                </Link>
                <Link href={`${profiles[index].username}`}>
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
