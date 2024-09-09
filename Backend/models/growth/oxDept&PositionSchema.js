import mongoose from 'mongoose';

const { Schema, model } = mongoose;

// Department Schema
const departmentSchema = new Schema({
  dept_id: { type: String, unique: true, required: true },
  manager_id: { type: Schema.Types.ObjectId, ref: 'Employee', required: true },
  office_id: { type: Schema.Types.ObjectId, ref: 'Office', required: true },
  name: { type: String, required: true },
  description: { type: String },
  date_added: { type: Date, default: Date.now },
  SOPs: { type: String }, // URL or file path to SOP file
  level: { type: String, enum: ['A', 'B', 'C'] },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
});

// Division Schema
const divisionSchema = new Schema({
  division_id: { type: String, unique: true, required: true },
  head_id: { type: Schema.Types.ObjectId, ref: 'Employee', required: true },
  dept_id: { type: Schema.Types.ObjectId, ref: 'Department', required: true },
  name: { type: String, required: true },
  description: { type: String },
  date_added: { type: Date, default: Date.now },
  SOPs: { type: String }, // URL or file path to SOP file
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  weakness: { type: String },
  strength: { type: String },
});

// Office Schema
const officeSchema = new Schema({
  office_id: { type: String, unique: true, required: true },
  head_id: { type: Schema.Types.ObjectId, ref: 'Employee', required: true },
  branch_id: { type: Schema.Types.ObjectId, ref: 'Branch', required: true },
  name: { type: String, required: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  weakness: { type: String },
  strength: { type: String },
});

// Dept Position Schema
const deptPositionSchema = new Schema({
  position_id: { type: String, unique: true, required: true },
  dept_id: { type: Schema.Types.ObjectId, ref: 'Department', required: true },
  name: { type: String, required: true },
  description: { type: String },
  responsibilities: { type: String },
  SOPs: { type: String }, // URL or file path to SOP file
  requirements: { type: String },
  salary: { type: String },
  salary_in_USDT: { type: String },
  note: { type: String },
});

// Division Position Schema
const divisionPositionSchema = new Schema({
  position_id: { type: String, unique: true, required: true },
  division_id: { type: Schema.Types.ObjectId, ref: 'Division', required: true },
  name: { type: String, required: true },
  description: { type: String },
  responsibilities: { type: String },
  SOPs: { type: String }, // URL or file path to SOP file
  requirements: { type: String },
  salary: { type: String },
  salary_in_USDT: { type: String },
  note: { type: String },
});

// Office Position Schema
const officePositionSchema = new Schema({
  position_id: { type: String, unique: true, required: true },
  office_id: { type: Schema.Types.ObjectId, ref: 'Office', required: true },
  name: { type: String, required: true },
  description: { type: String },
  responsibilities: { type: String },
  SOPs: { type: String }, // URL or file path to SOP file
  requirements: { type: String },
  salary: { type: String },
  salary_in_USDT: { type: String },
  note: { type: String },
});

// Export all models
export const Department = model('Department', departmentSchema);
export const Division = model('Division', divisionSchema);
export const Office = model('Office', officeSchema);
export const DeptPosition = model('DeptPosition', deptPositionSchema);
export const DivisionPosition = model('DivisionPosition', divisionPositionSchema);
export const OfficePosition = model('OfficePosition', officePositionSchema);
