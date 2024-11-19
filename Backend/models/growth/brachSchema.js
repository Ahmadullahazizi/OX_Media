import mongoose from "mongoose";

// Schema for Project/Branch Manager (BM)
const branchManagerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone_number: { type: Number, required: true, unique: true },
    status: { type: String, enum: ["active", "inactive"], required: true },
    position: { type: String, required: true },
    contract_file: {
      // Path to the PDF file (PDF)
      secure_url: { type: String, required: true },
      public_id: { type: String, required: true },
    },
    // contract_file: { type: String }, // Path to the PDF file
    joining_date: { type: Date, required: true },
  },
  { timestamps: true }
);

// Schema for Branch
const branchSchema = new mongoose.Schema(
  {
    branch_name: { type: String, required: true },
    manager_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BranchManager",
      required: true,
    }, // Reference to Branch Manager
    description: { type: String, default: "" },
    date_added: { type: Date, default: Date.now },
    country: { type: String, required: true },
    local_currency: { type: String, required: true },
    local_currency_abbr: { type: String, required: true },
    local_language: { type: String, required: true },
    legal_doc: {
      secure_url: { type: String,default: ""  },
      public_id: { type: String, default: "" },
    }, // Path to the legal document PDF
    proj_plan: {
      secure_url: { type: String, default: ""  },
      public_id: { type: String, default: ""  },
    }, // Path to the project plan PDF
    branch_website_link: { type: String, default: ""  }, // URL for the branch website
    note: { type: String },
  },
  { timestamps: true }
);

// Creating models
const BranchManager = mongoose.model("BranchManager", branchManagerSchema);
const Branch = mongoose.model("Branch", branchSchema);

// Exporting models
export { BranchManager, Branch };
