import mongoose, {Types} from "mongoose";
import Gig, {Gigs} from "./Gig";
import User, {Users} from "./User";

export interface Reviews extends mongoose.Document {
  gig_reviewed: Types.ObjectId | Gigs;
  reviewed_by: Types.ObjectId | Users;
  name: string;
  rating: Number;
  description: Text;

}

const ReviewSchema = new mongoose.Schema<Reviews>({
  gig_reviewed: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Gig.modelName,
    required: [true, "Gig id is manditory"],
  },
  reviewed_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User.modelName,
    required: [true, "user id is manditory"],
  },
  name: {
    type: String,
    required: [true, "Please provide name of the skill"],
    maxlength: [100, "Name cannot be more than 100 characters"],
  },
  rating: {
    type: Number,
  },
  description: {
    type: Text,
  },
});

export default mongoose.models.Skill || mongoose.model<Reviews>("Review", ReviewSchema);
