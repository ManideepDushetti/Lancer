import mongoose, {Types} from "mongoose";
import Category, {Categories} from "./Category";

export interface Skills extends mongoose.Document {
  category: Types.ObjectId | Categories;
  name: string;
  proficiency_level: number;

}

const SkillSchema = new mongoose.Schema<Skills>({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Category.modelName,
    required: [true, "category id is manditory"],
  },
  name: {
    type: String,
    required: [true, "Please provide name of the skill"],
    maxlength: [100, "Name cannot be more than 100 characters"],
  },
  proficiency_level: {
    type: Number,
  },
});

export default mongoose.models.Skill || mongoose.model<Skills>("Skill", SkillSchema);
