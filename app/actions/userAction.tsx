"use server";

import dbconnect from "@/lib/bdconnect";
import { revalidateTag } from "next/cache";
import User from "@/models/User";
import Profile from "@/models/Profile"
import { redirect } from "next/navigation";

interface UserData {
    fullname: string | undefined;
    username: string | undefined;
    email: string | undefined;
    password: string | undefined;
}

async function CheckValidity(rawdata: UserData) {
    const userExist = await User.find({ username: rawdata.username }).exec();
    const emailExist = await User.find({ email: rawdata.email }).exec();
    if (userExist.length || emailExist.length) return false;
    else return true;
}

export async function AddUserAction(prevState: any, userdata: FormData) {
    const rawFormData = {
        fullname: userdata.get("fullname")?.toString(),
        username: userdata.get("username")?.toString(),
        email: userdata.get("email")?.toString(),
        password: userdata.get("password")?.toString(),
    };

    await dbconnect();

    if (await CheckValidity(rawFormData)) {
        const user = new User(rawFormData);
        await user.save();
        console.log("creating new profile");
        const profiledata = {
            user: user._id,
        };
        const newprofile = new Profile(profiledata);
        await newprofile.save();
        console.log("User is registered");
        return {
            message: "Registration is successful! You can now log in",
        };
    } else {
        console.log("User_name or email is already used.");
        return {
            message: "Username or email is already taken",
        };
    }
}
