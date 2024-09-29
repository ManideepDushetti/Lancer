import { NextResponse, NextRequest } from "next/server";
import dbconnect from "@/lib/bdconnect";
import Gig from "@/models/Gig";
import Profile from "@/models/Profile";
import { getSession } from "@/lib/auth";

export const GET = async (request: NextRequest) => {
  const session = await getSession();
  const searchParams = request.nextUrl.searchParams;
  const userid = searchParams.get("id");
  const gigid = searchParams.get("gigid");
  const gigname = searchParams.get("name");
  if (session) {
    try {
      await dbconnect();
      if (userid) {
        const profile = await Profile.findOne({ user: userid });
        const gigs = await Gig.find({ provider: profile._id }).populate({
          path: "provider",
          populate: {
            path: "user",
            model: "User",
          },
        }).exec();
        return new NextResponse(JSON.stringify(gigs), { status: 200 });
      } else if (gigid) {
        const gig = await Gig.findOne({ _id: gigid }).populate({
          path: "provider",
          populate: {
            path: "user",
            model: "User",
          },
        });
        return new NextResponse(JSON.stringify(gig), { status: 201 });
      } else if (gigname) {
        const gig = await Gig.findOne({ name: gigname.replace(/-/g, ' ') }).populate({
          path: "provider",
          populate: {
            path: "user",
            model: "User",
          },
        });
        return new NextResponse(JSON.stringify(gig), { status: 202 });
      } else {
        const details = JSON.parse(JSON.stringify(session, null, 2));
        const providerid = details.user.id;
        const providerprofile = await Profile.findOne({ user: providerid});
        const gigs = await Gig.find({ provider: { $ne:  providerprofile._id} }).populate({
          path: "provider",
          populate: {
            path: "user",
            model: "User",
          },
        });
        return new NextResponse(JSON.stringify(gigs), { status: 202 });
      }
    } catch (error) {
      return new NextResponse("Error in fetching gigs " + error, {
        status: 500,
      });
    }
  } else {
    return NextResponse.redirect(new URL("/login", request.url));
  }
};
