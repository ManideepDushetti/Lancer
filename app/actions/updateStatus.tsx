"use server"

import dbconnect from "../../lib/bdconnect";
import Order from "../../models/Order";
import { redirect } from "next/navigation";

export async function updateOrderStatus(order_id: string, updatedStatus: string) {
  await dbconnect();
  try {
    console.log(order_id, updatedStatus);
    await Order.findByIdAndUpdate(order_id, {status: updatedStatus}, {new: true});
    console.log("Document is updated successfuly");
  } catch (error) {
    console.log("error: ", error);
  }
  redirect("./orders");
}