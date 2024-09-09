import mongoose from 'mongoose';

const { Schema, model } = mongoose;

// Content Library Schema
const contentLibrarySchema = new Schema({
    cl_id: { type: String, unique: true, required: true },
    sub_niche_id: { type: Schema.Types.ObjectId, ref: 'SubNiche', required: true },
    main_type_id: { type: Schema.Types.ObjectId, ref: 'MainType', required: true },
    sub_type_id: { type: Schema.Types.ObjectId, ref: 'SubType', required: true },
    added_by: { type: String },
    rated_by: { type: String },
    rated_by_admin: { type: String },
    media_file: { type: String }, // URL or file path to media
  });
  
  // Main Type of Content Schema
  const mainTypeContentSchema = new Schema({
    mtc_id: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    description: { type: String },
  });
  
  // Sub Type of Content Schema
  const subTypeContentSchema = new Schema({
    stc_id: { type: String, unique: true, required: true },
    mtc_id: { type: Schema.Types.ObjectId, ref: 'MainTypeContent', required: true },
    name: { type: String, required: true },
  });
  
  // Social Media Platform Schema
  const socialMediaPlatformSchema = new Schema({
    sm_id: { type: String, unique: true, required: true },
    branch_id: { type: Schema.Types.ObjectId, ref: 'Branch', required: true },
    name: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    team_knowledge: { type: String },
    things_to_do: { type: String },
    our_weakness: { type: String },
    our_strength: { type: String },
    note: { type: String },
    SOP_file: { type: String }, // URL or file path to SOP file
  });

export const ContentLibrary = model('ContentLibrary', contentLibrarySchema);
export const MainTypeContent = model('MainTypeContent', mainTypeContentSchema);
export const SubTypeContent = model('SubTypeContent', subTypeContentSchema);
export const SocialMediaPlatform = model('SocialMediaPlatform', socialMediaPlatformSchema);
