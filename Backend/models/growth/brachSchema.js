import mongoose from "mongoose";

// Schema for Branch
const branchSchema = new mongoose.Schema(
  {
    branch_name: { type: String, required: true },
    description: { type: String, default: "" },
    country: { type: String, required: true },
    local_currency: { type: String, required: true },
    local_currency_abbr: { type: String, required: true },
    local_language: { type: String, required: true },
    legal_doc: {
      secure_url: { type: String, default: "" },
      public_id: { type: String, default: "" },
    }, // Path to the legal document PDF
    proj_plan: {
      secure_url: { type: String, default: "" },
      public_id: { type: String, default: "" },
    }, // Path to the project plan PDF
    branch_website_link: { type: String, default: "" }, // URL for the branch website
    note: { type: String },
  },
  { timestamps: true }
);

// Creating models
const Branch = mongoose.model("Branch", branchSchema);

// Exporting models
export { Branch };
