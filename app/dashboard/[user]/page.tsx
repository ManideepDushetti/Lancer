import { getSession } from "@/lib/auth";
import Profile from "@/models/Profile";
import Link from "next/link";

export default async function Page({ params }: { params: { user: string } }) {
  const session = await getSession();
    const details = JSON.parse(JSON.stringify(session, null, 2));
    const userid = details.user.id;
    const profile = await Profile.findOne({ user: userid }).populate("user");
    if (userid === params.user) {
      return (
        <div className="m-5">
          <p>Welcome! {profile.user.fullname}</p>
          <p>
            Here is your rating -{" "}
            {profile.rating ? profile.rating : "Not yet drated"}
          </p>
        </div>
      );
    } else {
      return (
        <h1 className="text-lg font-bold">
          You are unauthorized to access this page.
        </h1>
      );
    }
}
