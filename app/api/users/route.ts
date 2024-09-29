import { NextResponse, NextRequest}from "next/server";
import dbconnect from "@/lib/bdconnect";
import User from "@/models/User";
import { getSession } from "@/lib/auth";
export const GET = async (request: NextRequest) => {
    const session = await getSession();
    if(session){
        try {
            await dbconnect();
            const details = JSON.parse(JSON.stringify(session, null, 2));
            const userid = details.user.id;
            const user = await User.findOne({_id: userid});
            return new NextResponse(JSON.stringify(user), {status: 200});
        } catch(error) {
            return new NextResponse("Error in fetching gigs " + error, {status: 500});
        }
    }
    else{
        return NextResponse.redirect(new URL('/login', request.url));
    }
}