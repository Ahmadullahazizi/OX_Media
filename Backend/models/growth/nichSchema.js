import mongoose from "mongoose";

// Schema for Niche
const nicheSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    date_added: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Schema for Sub-Niche
const subNicheSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    target_audience: { type: String, required: true },
    market_trend: { type: String, required: true },
    preferred_platform: { type: String, required: true },
    ideal_social_media_link: { type: String },
    research_file: { // Path to the research document (PDF)
      secure_url: {type: String, required: true,},
      public_id: { type: String,required: true,},},
    // research_file: { type: String }, // Path to the research document (PDF)
    niche: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Niche",
    }, // Reference to Niche
  },
  { timestamps: true }
);

// Schema for Sub-Niche Services
const subNicheServiceSchema = new mongoose.Schema(
  {
    service_name: { type: String, required: true },
    description: { type: String, required: true },
    name_in_local_language: { type: String },
    description_in_local_language: { type: String },
    subniche: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubNiche",
      required: true,
    }, // Reference to Sub-Niche
  },
  { timestamps: true }
);

// Schema for Post Type
const postTypeSchema = new mongoose.Schema(
  {
    type_name: { type: String, required: true },
    description: { type: String, required: true },
    importance_level: {
      type: String,
      enum: ["high", "med", "low"],
      required: true,
    },
    subniche: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubNiche",
      required: true,
    }, // Reference to Sub-Niche
  },
  { timestamps: true }
);

// Schema for Reel Type
const reelTypeSchema = new mongoose.Schema(
  {
    type_name: { type: String, required: true },
    description: { type: String, required: true },
    importance_level: {
      type: String,
      enum: ["high", "med", "low"],
      required: true,
    },
    subniche: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubNiche",
      required: true,
    }, // Reference to Sub-Niche
  },
  { timestamps: true }
);

// Schema for Post Type Samples
const postTypeSampleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    media_file: { // Path to the media file (png, jpeg)
      secure_url: {type: String, required: true,},
      public_id: { type: String,required: true,},},
    // media_file: { type: String }, // Path to the media file (png, jpeg)
    postid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PostType",
      required: true,
    }, // Reference to Post Type
  },
  { timestamps: true }
);

// Schema for Reel Type Samples
const reelTypeSampleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    media_file: { // Path to the media file (png, jpeg)
      secure_url: {type: String, required: true,},
      public_id: { type: String,required: true,},},
    reelid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ReelType",
      required: true,
    }, // Reference to Reel Type
  },
  { timestamps: true }
);

// Schema for Technology Type
const technologyTypeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    name_in_local_language: { type: String },
    description_in_local_language: { type: String },
    subniche: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubNiche",
      required: true,
    }, // Reference to Sub-Niche
  },
  { timestamps: true }
);

// Schema for Website Sample
const websiteSampleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    web_url: { type: String, required: true },
    media_file: { // Path to the media file (png, jpeg)
      secure_url: {type: String, required: true,},
      public_id: { type: String,required: true,},},
    subniche: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubNiche",
      required: true,
    }, // Reference to Sub-Niche
  },
  { timestamps: true }
);

// Schema for Ads Sample
const adsSampleSchema = new mongoose.Schema(
  {
    ad_type: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    media_file: { // Path to the media file (png, jpeg)
      secure_url: {type: String, required: true,},
      public_id: { type: String,required: true,},},
    subniche: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubNiche",
      required: true,
    }, // Reference to Sub-Niche
  },
  { timestamps: true }
);

// Schema for Story Sample
const storySampleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    media_file: { type: String }, // Path to the media file (image, video, etc.)
    subniche_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubNiche",
      required: true,
    }, // Reference to Sub-Niche
  },
  { timestamps: true }
);

// Schema for Keywords
const keywordSchema = new mongoose.Schema(
  {
    keyword: { type: String, required: true },
    description: { type: String, required: true },
    keyword_in_local_language: { type: String },
    level_of_competition: {
      type: String,
      enum: ["High", "Med", "Low"],
      required: true,
    },
    subniche: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubNiche",
      required: true,
    }, // Reference to Sub-Niche
  },
  { timestamps: true }
);

// Schema for Landing Page
const landingPageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    page_url: { type: String, required: true },
    media_file: { // Path to the media file (png, jpeg)
      secure_url: {type: String, required: true,},
      public_id: { type: String,required: true,},},
    subniche: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubNiche",
      required: true,
    }, // Reference to Sub-Niche
  },
  { timestamps: true }
);

// Creating models
const Niche = mongoose.model("Niche", nicheSchema);
const SubNiche = mongoose.model("SubNiche", subNicheSchema);
const SubNicheService = mongoose.model(
  "SubNicheService",
  subNicheServiceSchema
);
const PostType = mongoose.model("PostType", postTypeSchema);
const ReelType = mongoose.model("ReelType", reelTypeSchema);
const PostTypeSample = mongoose.model("PostTypeSample", postTypeSampleSchema);
const ReelTypeSample = mongoose.model("ReelTypeSample", reelTypeSampleSchema);
const TechnologyType = mongoose.model("TechnologyType", technologyTypeSchema);
const WebsiteSample = mongoose.model("WebsiteSample", websiteSampleSchema);
const AdsSample = mongoose.model("AdsSample", adsSampleSchema);
const StorySample = mongoose.model("StorySample", storySampleSchema);
const Keyword = mongoose.model("Keyword", keywordSchema);
const LandingPage = mongoose.model("LandingPage", landingPageSchema);

// Exporting models
export {
  Niche,
  SubNiche,
  SubNicheService,
  PostType,
  ReelType,
  PostTypeSample,
  ReelTypeSample,
  TechnologyType,
  WebsiteSample,
  AdsSample,
  StorySample,
  Keyword,
  LandingPage,
};
