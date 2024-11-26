import mongoose from 'mongoose';

const { Schema, model } = mongoose;

// agency Services Schema
const agencyServicesSchema = new Schema({
  service_name: { type: String, required: true },
  branch: { type: Schema.Types.ObjectId, ref: 'Branch', required: true },
  related_office: { type: Schema.Types.ObjectId, ref: 'Office', required: true },
  related_dept: { type: Schema.Types.ObjectId, ref: 'Department', required: true },
  related_division: { type: Schema.Types.ObjectId, ref: 'Division', required: true },
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
  price_USD: { type: String },
  discounted_price_USD: { type: String },
  price_localcurrency: { type: String },
  discounted_price_localcurrency: { type: String },
  marketvalue_USD: { type: String },
  marketvalue_localcurrency: { type: String },
});

// agency Packages Schema
const agencyPackagesSchema = new Schema({
  branch: { type: Schema.Types.ObjectId, ref: 'Branch', required: true },
  pkg_name: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  duration: { type: Number }, // Duration in days
  eligibility: { type: String },
  suitablefor: { type: String },
  price_USD: { type: String },
  discounted_price_USD: { type: String },
  price_localcurrency: { type: String },
  discounted_price_localcurrency: { type: String },
  marketvalue_USD: { type: String },
  marketvalue_localcurrency: { type: String },
});

// agency Services and Packages Schema
const agencyServicesPackagesSchema = new Schema({
  agency_service: { type: Schema.Types.ObjectId, ref: 'agencyServices', required: true },
  serviceDeliverables: { type: Schema.Types.ObjectId, ref: 'ServiceDeliverables', required: true },
  agencypkg: { type: Schema.Types.ObjectId, ref: 'agencyPackages', required: true },
  description: { type: String },
  info: { type: String },
  condition: { type: String },
  durationInDays: { type: Number },
});

// Service Deliverables Schema
const serviceDeliverablesSchema = new Schema({
  agency_service: { type: Schema.Types.ObjectId, ref: 'agencyServices', required: true },
  name: { type: String, required: true },
  description: { type: String },
});

// pkg Deliverables Schema
// const servicepkgDeliverablesSchema = new Schema({
//   agency_sp: { type: Schema.Types.ObjectId, ref: 'agencyServicesPackages', required: true },
//   description: { type: String },
// });



// Export all models
export const agencyServices = model('agencyServices', agencyServicesSchema);
export const agencyPackages = model('agencyPackages', agencyPackagesSchema);
export const agencyServicesPackages = model('agencyServicesPackages', agencyServicesPackagesSchema);
export const ServiceDeliverables = model('ServiceDeliverables', serviceDeliverablesSchema);
// export const ServicePKGDeliverables = model('ServicePKGDeliverables', servicepkgDeliverablesSchema);

