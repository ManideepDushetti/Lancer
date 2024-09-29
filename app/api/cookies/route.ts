import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

export const GET = async (request: NextRequest) => {
  const session = await getSession();
  if (session) {
    try {
      const details = JSON.parse(JSON.stringify(session, null, 2));
      const userid = details.user.id;
      return new NextResponse(JSON.stringify(userid), { status: 200 });
    } catch (error) {
      return new NextResponse("Error in fetching users " + error, {
        status: 500,
      });
    }
  } else {
    console.log("This login is redirected");
    return NextResponse.redirect(new URL("/login", request.url));
  }
};
