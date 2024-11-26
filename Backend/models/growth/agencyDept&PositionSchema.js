import mongoose from 'mongoose';

const { Schema, model } = mongoose;

// Department Schema
const departmentSchema = new Schema({
  //manager_id: { type: Schema.Types.ObjectId, ref: 'Employee', required: true },
  office: { type: Schema.Types.ObjectId, ref: 'Office', required: true },
  name: { type: String, required: true },
  description: { type: String },
  date_added: { type: Date, default: Date.now },
  SOP_file: {
    // Path to the PDF file (PDF)
    secure_url: { type: String, required: true },
    public_id: { type: String, required: true },
  }, // URL or file path to SOP file
  level: { type: String, enum: ['A', 'B', 'C'] },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
});

// Division Schema
const divisionSchema = new Schema({
  // head_id: { type: Schema.Types.ObjectId, ref: 'Employee', required: true },
  dept: { type: Schema.Types.ObjectId, ref: 'Department', required: true },
  name: { type: String, required: true },
  description: { type: String },
  date_added: { type: Date, default: Date.now },
  SOP_file: {
    // Path to the PDF file (PDF)
    secure_url: { type: String, required: true },
    public_id: { type: String, required: true },
  },// URL or file path to SOP file
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  weakness: { type: String },
  strength: { type: String },
});

// Office Schema
const officeSchema = new Schema({
  // head: { type: Schema.Types.ObjectId, ref: 'Employee', required: true },
  ceo: { type: Schema.Types.ObjectId, ref: 'CEO', required: true },
  name: { type: String, required: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  weakness: { type: String },
  strength: { type: String },
  SOP_file: {
    // Path to the PDF file (PDF)
    secure_url: { type: String, required: true },
    public_id: { type: String, required: true },
  },// URL or file path to SOP file
});

// CEO Schema
const ceoSchema = new Schema({
  
  branch: { type: Schema.Types.ObjectId, ref: 'Branch', required: true },
  description: { type: String },
});

// Dept Position Schema
const deptPositionSchema = new Schema({
  dept: { type: Schema.Types.ObjectId, ref: 'Department', required: true },
  name: { type: String, required: true },
  description: { type: String },
  responsibilities: { type: String },
  SOP_file: {
    // Path to the PDF file (PDF)
    secure_url: { type: String, required: true },
    public_id: { type: String, required: true },
  }, // URL or file path to SOP file
  requirements: { type: String },
  salary: { type: String },
  salary_in_USDT: { type: String },
  note: { type: String },
});

// Division Position Schema
const divisionPositionSchema = new Schema({
 
  division: { type: Schema.Types.ObjectId, ref: 'Division', required: true },
  name: { type: String, required: true },
  description: { type: String },
  responsibilities: { type: String },
  SOP_file: {
    // Path to the PDF file (PDF)
    secure_url: { type: String, required: true },
    public_id: { type: String, required: true },
  },// URL or file path to SOP file
  requirements: { type: String },
  salary: { type: String },
  salary_in_USDT: { type: String },
  note: { type: String },
});

// Office Position Schema
const officePositionSchema = new Schema({
 
  office: { type: Schema.Types.ObjectId, ref: 'Office', required: true },
  name: { type: String, required: true },
  description: { type: String },
  responsibilities: { type: String },
  SOP_file: {
    // Path to the PDF file (PDF)
    secure_url: { type: String, required: true },
    public_id: { type: String, required: true },
  },// URL or file path to SOP file
  requirements: { type: String },
  salary: { type: String },
  salary_in_USDT: { type: String },
  note: { type: String },
});

// Office Position Schema
const ceoPositionSchema = new Schema({
 
  ceo: { type: Schema.Types.ObjectId, ref: 'CEO', required: true },
  name: { type: String, required: true },
  description: { type: String },
  responsibilities: { type: String },
  SOP_file: {
    // Path to the PDF file (PDF)
    secure_url: { type: String, required: true },
    public_id: { type: String, required: true },
  },// URL or file path to SOP file
  requirements: { type: String },
  salary: { type: String },
  salary_in_USDT: { type: String },
  note: { type: String },
});

// Export all models
export const Department = model('Department', departmentSchema);
export const Division = model('Division', divisionSchema);
export const Office = model('Office', officeSchema);
export const CEO = model('CEO', ceoSchema);
export const DeptPosition = model('DeptPosition', deptPositionSchema);
export const DivisionPosition = model('DivisionPosition', divisionPositionSchema);
export const OfficePosition = model('OfficePosition', officePositionSchema);
export const CeoPosition = model('CEOPosition', ceoPositionSchema);
