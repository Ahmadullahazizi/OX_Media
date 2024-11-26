import mongoose from "mongoose";

const { Schema, model } = mongoose;

// Content Library Schema
const contentLibrarySchema = new Schema({
  subniche_id: {
    type: Schema.Types.ObjectId,
    ref: "SubNiche",
    required: true,
  },
  content_format: {
    type: String,
    enum: ["Short Video", "Post", "Story", "Long Video"],
    required: true,
  },
  content_type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ContentType", // Reference to Content Type schema
    required: true,
  },
  related_entity: {
    type: [String],
    enum: ["Social Media", "Ads", "Google", "Website"],
    required: true,
  },
  added_by: { type: String },
  employee_ratings: [
    {
      employee_name: {
        type: String,
        required: true, // Reference to Employee schema
      },
      rating: {
        type: Number,
        min: 1,
        max: 5,
      },
    },
  ],
  link: { type: String }, // URL or file path to media
  note: { type: String }, 
});

//Type of Content Schema
const contentTypechema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
});

// Social Media Platform Schema
const socialMediaPlatformSchema = new Schema({
  sm_id: { type: String, unique: true, required: true },
  branch_id: { type: Schema.Types.ObjectId, ref: "Branch", required: true },
  name: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  team_knowledge: { type: String },
  things_to_do: { type: String },
  our_weakness: { type: String },
  our_strength: { type: String },
  note: { type: String },
  SOP_file: { type: String }, // URL or file path to SOP file
});

export const ContentLibrary = model("ContentLibrary", contentLibrarySchema);
export const contentType = model("contentType", contentTypechema);
export const SocialMediaPlatform = model(
  "SocialMediaPlatform",
  socialMediaPlatformSchema
);
