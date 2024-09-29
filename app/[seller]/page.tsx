import { ProfileShow } from "./profileshow";
import User, { Users } from "@/models/User";
import Profile, { Profiles } from "@/models/Profile";
import { MyGigs } from "./mygigs";

async function getProfile(username: string) {
    const user = await User.findOne({ username: username });
    const profileid = await Profile.findOne({ user: user._id }).populate(
        "user"
    );
    const prostr = JSON.stringify(profileid);
    if (profileid) {
        return JSON.parse(prostr);
    } else {
        return null;
    }
}

export default async function Page({ params }: { params: { seller: string } }) {
    const profile = await getProfile(params.seller);
    return (
        <div>
            <ProfileShow
                profilepic={profile.profilepic}
                fullname={profile.user.fullname}
                username={profile.user.username}
                description={profile.description}
                country={profile.country}
                state={profile.state}
                city={profile.city}
            />
            <div className="m-10">
                <p className="text-xl font-bold text-center"> My Gigs</p>
                <MyGigs userid={profile.user._id} />
            </div>
        </div>
    );
}
