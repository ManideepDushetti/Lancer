import mongoose, {Types} from "mongoose";
import Gig, {Gigs} from "./Gig";
import User, { Users} from "./User";

enum EStatusType {
  Pending = 'pending',
  Accepted = 'accepted',
  Rejected = 'rejected'
}

export interface Orders extends mongoose.Document {
  gig_ordered: Types.ObjectId | Gigs;
  buyer: Types.ObjectId | Users;
  provider: Types.ObjectId | Users;
  accepted_date: Date;
  budget: number;
  deadline: Date;
  completed_date: Date;
  status: String
}

export interface OrdersPopulate extends mongoose.Document {
  gig_ordered: Gigs;
  buyer: Users;
  provider: Users;
  accepted_date: Date;
  budget: number;
  deadline: Date;
  completed_date: Date;
  status: String
  
}



const OrderSchema = new mongoose.Schema<Orders>({
  gig_ordered: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Gig.modelName,
    required: [true, "gig id is manditory"],
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User.modelName,
    required: [true, "buyer id is manditory"],
  },
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User.modelName,
    required: [true, "provider is manditaory"],
  },
  accepted_date: {
    type: Date,
    required: [true, "Please provide accepteed date"],
  },
  budget: {
    type: Number,
    required: [true, "Please provide minimum budget of the gig"],
  },
  deadline: {
    type: Date,
    required: [true, "Please provide deadline"],
  },
  status: {
    type: String,
    default: EStatusType.Pending,
    enum: Object.values(EStatusType),
  },
  completed_date: {
    type: Date,
  }
});

export default mongoose.models.Order || mongoose.model<Orders>("Order", OrderSchema);
