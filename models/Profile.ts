import mongoose, { Types} from "mongoose";
import User, { Users} from "./User";

export interface Profiles extends mongoose.Document {
  user: Types.ObjectId | Users;
  rating: Number;
  profilepic: string;
  country: string;
  city: string;
  state: string;
  zip: string;
  availability_status: string;
  acc_date: Date;
  description: string;
  languages: string[];
}

export type NullableProfiles = Profiles | null;

/* ProfileSchema will correspond to a collection in your MongoDB database. */
const ProfileSchema = new mongoose.Schema<Profiles>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User.modelName,
    required: [true, "user id is manditory"],
  },
  rating: {
    type: Number,
    default: 0,
  },
  profilepic: {
    data: Buffer, // Storing image data as a Buffer
    contentType: String // Storing content type (e.g., 'image/jpeg', 'image/png')
  },

  country: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  zip: {
    type: String,
  },
  availability_status: {
    type: String,
  },
  acc_date: {
    type: Date,
  },
  description: {
    type: String,
  },
  languages: {
    type: [String],
  }
});

export default mongoose.models.Profile || mongoose.model<Profiles>("Profile", ProfileSchema);