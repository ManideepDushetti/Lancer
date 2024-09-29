import { NextRequest, NextResponse } from "next/server";
import dbconnect from "@/lib/bdconnect";
import Profile from "@/models/Profile";
import User from "@/models/User";
import { getSession } from "@/lib/auth";
import { redirect } from 'next/navigation'

export const GET = async (request: NextRequest) => {
  const session = await getSession();
  const searchParams = request.nextUrl.searchParams;
  const username = searchParams.get("username");
  if (session) {
    try {
      await dbconnect();
      if (username) {
        const user = await User.findOne({username: username});
        const profileid = await Profile.findOne({ user: user._id }).populate(
          "user"
        );
        if (profileid) {
          return new NextResponse(JSON.stringify(profileid), { status: 200 }); 
        } else {
          return new NextResponse("Profile doesn't exist", { status: 300 });
        }

      } else {
        const details = JSON.parse(JSON.stringify(session, null, 2));
        const userid = details.user.id;
        const profileid = await Profile.findOne({ user: userid }).populate(
          "user"
        );
        if (profileid) {
          return new NextResponse(JSON.stringify(profileid), { status: 200 });
        } else {
          console.log("creating new profile");
          const profiledata = {
            user: userid,
          };
          const newprofile = new Profile(profiledata);
          await newprofile.save();
          const profileid = await Profile.findOne({ user: userid }).populate(
            "user"
          );
          return new NextResponse(JSON.stringify(profileid), { status: 201 });
        }
      }
    } catch (error) {
      console.log("This login is redirected2");
      return new NextResponse("Error in fetching users " + error, {
        status: 500,
      });
    }
  } else {
    console.log("This login is redirected");
    return new NextResponse("session expired", {
      status: 501,
    });
  }
};