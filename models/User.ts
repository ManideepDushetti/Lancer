import mongoose from "mongoose";

export interface Users extends mongoose.Document {
  fullname: string;
  username: string;
  email: string;
  password: string;
  
}

/* UserSchema will correspond to a collection in your MongoDB database. */
const UserSchema = new mongoose.Schema<Users>({
  fullname: {
    /* The name of this user */

    type: String,
    required: [true, "Please provide your full name"],
    maxlength: [60, "Name cannot be more than 60 characters"],
  },
  username: {
    /* The user name of this user */

    type: String,
    required: [true, "Please provide your username"],
    maxlength: [60, "user name cannot be more than 60 characters"],
  },
  email: {
    /* The species of your pet */

    type: String,
    required: [true, "Please specify the email of user."],
    maxlength: [40, "Species specified cannot be more than 40 characters"],
  },
  password: {
    /* Url to pet image */

    required: [true, "Please provide your passwrod"],
    type: String,
  },
});

export default mongoose.models.User || mongoose.model<Users>("User", UserSchema);