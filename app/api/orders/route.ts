import { NextResponse, NextRequest } from "next/server";
import dbconnect from "@/lib/bdconnect";
import Order from "@/models/Order";
import { getSession } from "@/lib/auth";
import User, {Users} from "@/models/User";
import Gig, {Gigs} from "@/models/Gig";
import { ALL } from "dns";

export const GET = async (request: NextRequest) => {
  const session = await getSession();
  const searchParams = request.nextUrl.searchParams;
  const buyer = searchParams.get("buyer");
  const provider = searchParams.get("provider");
  if (session) {
    try {
      await dbconnect();
      if (buyer) {
        const orders = await Order.find({ buyer: buyer })
          .populate("gig_ordered")
          .populate("buyer")
          .populate("provider");
        return new NextResponse(JSON.stringify(orders), { status: 200 });
      } else if (provider) {
        const orders_received = await Order.find({ provider: provider })
          .populate("gig_ordered")
          .populate("buyer")
          .populate("provider");
        return new NextResponse(JSON.stringify(orders_received), {
          status: 201,
        });
      } else {
        const Allorders = await Order.find({})
          .populate("gig_ordered")
          .populate("buyer")
          .populate("provider");
        return new NextResponse(JSON.stringify(Allorders), { status: 203 });
      }
    } catch (error) {
      return new NextResponse("Error in fetching orders " + error, {
        status: 500,
      });
    }
  } else {
    return NextResponse.redirect(new URL("/login", request.url));
  }
};
