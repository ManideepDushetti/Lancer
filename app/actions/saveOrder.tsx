'use server'

import dbconnect from "../../lib/bdconnect";
import { redirect } from 'next/navigation';
import { getSession } from "@/lib/auth";
import Order from "@/models/Order";

export async function saveOrder(gigid: string, providerid: string, userdata: FormData){
    const session = await getSession();
    const details = JSON.parse(JSON.stringify(session, null, 2));
    const userid = details.user.id;

    const rawFormData = {
        gig_ordered: gigid, 
        buyer: userid,
        provider: providerid,
        budget: userdata.get("min-price")?.toString(),
        accepted_date: userdata.get("today")?.toString(),
        deadline: userdata.get("deadline")?.toString(),
        password: userdata.get("password")?.toString(),
    };
    const order = new Order(rawFormData);
    await order.save();
    await dbconnect();
    redirect("./");
}