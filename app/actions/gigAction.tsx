"use server"

import dbconnect from "../../lib/bdconnect";
import Gig from "../../models/Gig";
import { redirect } from "next/navigation";

export async function gigDelete(gig_id: string) {
  await dbconnect();
  try {
    await Gig.findByIdAndDelete(gig_id);
    console.log("Document is deleted successfuly");
  } catch (error) {
    console.log("error: ", error);
  }
  redirect("./gigs");
}

export async function selectGigDelete(gigs: Map<string, number>) {
  await dbconnect();
  try {
    gigs.forEach(async (value, key) => {
      console.log(key);
      await Gig.findByIdAndDelete(key);
    });
    console.log("Document is deleted successfuly");
  } catch (error) {
    console.log("error: ", error);
  }
  redirect("./gigs");
}
