import mongoose from "mongoose";

export interface Categories extends mongoose.Document {
  name: string;
  description: Text;

}

const CategorySchema = new mongoose.Schema<Categories>({
  name: {


    type: String,
    required: [true, "Please provide name of categoty"],
    maxlength: [60, "Name cannot be more than 60 characters"],
  },
  description: {
    type: Text,
    maxlength: [500, "user name cannot be more than 60 characters"],
  },
});

export default mongoose.models.Category || mongoose.model<Categories>("Category", CategorySchema);
