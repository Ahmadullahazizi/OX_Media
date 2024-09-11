import mongoose from 'mongoose';

const { Schema, model } = mongoose;

// OX Services Schema
const oxServicesSchema = new Schema({
  service_name: { type: String, required: true },
  description: { type: String },
  importance: { type: String, enum: ['high', 'mid', 'low'], required: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  ourWeakness: { type: String },
  ourStrength: { type: String },
  note: { type: String },
  SOP_file: {
    // Path to the PDF file (PDF)
    secure_url: { type: String, required: true },
    public_id: { type: String, required: true },
  }, // URL or file path to the SOP file
});

// OX Packages Schema
const oxPackagesSchema = new Schema({
  branch: { type: Schema.Types.ObjectId, ref: 'Branch', required: true },
  pkg_name: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  duration: { type: Number }, // Duration in days
  eligibility: { type: String },
  price_before_discount: { type: String },
  price_after_discount: { type: String },
});

// OX Services and Packages Schema
const oxServicesPackagesSchema = new Schema({
  ox_service: { type: Schema.Types.ObjectId, ref: 'OXServices', required: true },
  oxpkg: { type: Schema.Types.ObjectId, ref: 'OXPackages', required: true },
  description: { type: String },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
});

// Service Deliverables Schema
const serviceDeliverablesSchema = new Schema({
  ox_service: { type: Schema.Types.ObjectId, ref: 'OXServices', required: true },
  name: { type: String, required: true },
  description: { type: String },
});




// Export all models
export const OXServices = model('OXServices', oxServicesSchema);
export const OXPackages = model('OXPackages', oxPackagesSchema);
export const OXServicesPackages = model('OXServicesPackages', oxServicesPackagesSchema);
export const ServiceDeliverables = model('ServiceDeliverables', serviceDeliverablesSchema);

