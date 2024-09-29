import mongoose, {Types} from "mongoose";
import Profile, {Profiles} from "./Profile";

export interface Gigs extends mongoose.Document {
  provider: Types.ObjectId | Profiles;
  category: string;
  name: string;
  description: string;
  thumbnail: string;
  minprice: number;
}

export interface GigsPopulate extends mongoose.Document {
  provider: Profiles;
  category: string;
  name: string;
  description: string;
  thumbnail: string;
  minprice: number;
}

export type NullableGigs = GigsPopulate | null;


const GigSchema = new mongoose.Schema<Gigs>({
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Profile.modelName,
    required: [true, "profile id is manditory"],
  },
  category: {
    type: String,
    required: [true, "Category id is manditory"],
  },
  name: {
    type: String,
    required: [true, "Please provide gig name"],
    maxlength: [200, "Name cannot be more than 200 characters"],
  },
  description: {
    type: String,
    required: [true, "Please provide gig description"],
    maxlength: [500, "Name cannot be more than 500 characters"],
  },
  thumbnail: {
    data: Buffer, // Storing image data as a Buffer
    contentType: Object // Storing content type (e.g., 'image/jpeg', 'image/png')
  },
  minprice: {
    type: Number,
    required: [true, "Please provide minimum price for the gig"],
  }
});

export default mongoose.models.Gig || mongoose.model<Gigs>("Gig", GigSchema);
