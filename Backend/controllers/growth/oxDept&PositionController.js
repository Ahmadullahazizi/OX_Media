import {
  deleteFileFromCloudnary,
  uploadFileOnCloudnary,
} from "../../helper/cloudnaryHelper.js";
import { Branch, BranchManager } from "../../models/growth/brachSchema.js";
import {
  Department,
  Division,
  Office,
  DeptPosition,
  DivisionPosition,
  OfficePosition,
} from "../../models/growth/oxDept&PositionSchema.js";

///-------------OFFICE---------

const addOffice = async (req, res) => {
  const { branch, name, status, weakness, strength } = req.body;

  // Verify that the importance_level is valid
  const validStatus = ["active", "inactive"];
  if (!validStatus.includes(status)) {
    return res.status(400).send({
      success: false,
      message: "Invalid Status!",
    });
  }
  // Fetch the Branch
  const branchid = await Branch.findById(branch);
  if (!branchid) {
    return res
      .status(404)
      .send({ success: false, message: "Branch not found" });
  }

  try {
    const office = new Office({
      branch: branchid,
      name,
      status,
      weakness,
      strength,
    });

    await office.save();
    res
      .status(201)
      .json({ message: "Office created successfully", department: office });
  } catch (error) {
    res.status(500).json({ message: "Error creating Office", error });
  }
};
//update office
const updateOffice = async (req, res) => {
  try {
    const { branch, name, status, weakness, strength } = req.body;
    const { officeID } = req.params;
    const office = await Office.findById(officeID);
    console.log(office);
    if (!office) {
      return res.status(401).send({
        success: false,
        message: "Office Not Found",
      });
    }
    // Verify that the importance_level is valid
    const validStatus = ["active", "inactive"];
    if (!validStatus.includes(status)) {
      return res.status(400).send({
        success: false,
        message: "Invalid Status!",
      });
    }
    // Fetch the Branch
    const branchid = await Branch.findById(branch);
    if (!branchid) {
      return res
        .status(404)
        .send({ success: false, message: "Branch not found" });
    }

    if (name) office.name = name;
    if (status) office.status = status;
    if (weakness) office.weakness = weakness;
    if (strength) office.strength = strength;

    await office.save();
    return res.status(200).send({
      success: true,
      message: "Office Details Updated",
    });
    res
      .status(201)
      .json({ message: "Office created successfully", department: office });
  } catch (error) {
    res.status(500).json({ message: "Error creating Office", error });
  }
};
// Get all Office
const getOffice = async (req, res) => {
  try {
    const departments = await Office.find({});
    return res.status(200).send({
      success: true,
      total: departments.length,
      message: "All Office Fetch",
      departments,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching Office", error });
  }
};
// Get a Office by ID
const getOfficeById = async (req, res) => {
  try {
    const { officeID } = req.params;
    const office = await Office.findById(officeID);
    if (!office) {
      return res.status(404).json({ message: "Office not found" });
    }
    res.status(200).json(office);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Office", error });
  }
};
// Delete a Office by ID
const deleteOffice = async (req, res) => {
  try {
    const { officeID } = req.params;
    const office = await Office.findByIdAndDelete(officeID);
    if (!office) {
      return res.status(404).json({ message: "Office not found" });
    }
    res.status(200).json({ message: "Office deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting Office", error });
  }
};

///-------------DEPARTMENT---------
const addDepartment = async (req, res) => {
  const { office, name, description, level, status } = req.body;
  const SOP_file = req.file?.fieldname;
  const SOP_filePath = req.file?.path;

  // Verify that the Level is valid
  const validLevel = ["A", "B", "C"];
  if (!validLevel.includes(level)) {
    return res.status(400).send({
      success: false,
      message: "Invalid level!",
    });
  }

  // Verify that the importance_level is valid
  const validStatus = ["active", "inactive"];
  if (!validStatus.includes(status)) {
    return res.status(400).send({
      success: false,
      message: "Invalid Status!",
    });
  }
  //Uploading file on Cloudnary
  const { secure_url, public_id } = await uploadFileOnCloudnary(
    SOP_filePath,
    "SOP_file"
  );
  if (!secure_url) {
    return res.status(400).send({
      success: false,
      message: "Error While Uploading File",
    });
  }
  // Fetch the Office by id
  const officeid = await Office.findById(office);
  if (!officeid) {
    return res
      .status(404)
      .send({ success: false, message: "Officeid not found" });
  }
  try {
    const newDepartment = new Department({
      office: officeid,
      name,
      description,
      SOP_file: {
        secure_url,
        public_id,
      },
      level,
      status,
    });

    await newDepartment.save();
    res.status(201).json({
      message: "Department created successfully",
      department: newDepartment,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating department", error });
  }
};

// Update a department by ID
const updateDepartment = async (req, res) => {
  try {
    const { name, description, level, status } = req.body;

    const SOP_filePath = req.file?.path;

    const { deptID } = req.params;
    const department = await Department.findById(deptID);
    console.log(department);
    if (!department) {
      return res.status(401).send({
        success: false,
        message: "department Not Found",
      });
    }
    //upload new media file on cloudinary
    if (SOP_filePath) {
      const { secure_url, public_id } = await uploadFileOnCloudnary(
        SOP_filePath,
        "SOP_file"
      );
      // delete File from Cloudinary
      if (department.SOP_file && department.SOP_file.public_id) {
        await deleteFileFromCloudnary(department.SOP_file.public_id);
      }
      department.SOP_file = {
        secure_url,
        public_id,
      };
    }

    //update any of the field that user update
    if (name) department.name = name;
    if (description) department.description = description;
    if (level) department.level = level;
    if (status) department.status = status;
    await department.save();
    res.status(200).json({
      message: "Department updated successfully",
      department: department,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating department", error });
  }
};

// Get all departments
const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find({});
    return res.status(200).send({
      success: true,
      total: departments.length,
      message: "All Departments Fetch",
      departments,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching departments", error });
  }
};

// Get a department by ID
const getDepartmentById = async (req, res) => {
  try {
    const { deptID } = req.params;
    const department = await Department.findById(deptID).populate("office");
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }
    res.status(200).json(department);
  } catch (error) {
    res.status(500).json({ message: "Error fetching department", error });
  }
};

// Delete a department by ID
const deleteDepartment = async (req, res) => {
  try {
    const { deptID } = req.params;
    const deletedDepartment = await Department.findByIdAndDelete(deptID);
    if (!deletedDepartment) {
      return res.status(404).json({ message: "Department not found" });
    }
    res.status(200).json({ message: "Department deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting department", error });
  }
};

//----------- DIVISION--------
const addDivision = async (req, res) => {
  const { name, description, status, date_added, weakness, strength, dept } =
    req.body;
  const SOP_file = req.file?.fieldname;
  const SOP_filePath = req.file?.path;

  // Verify that the importance_level is valid
  const validStatus = ["active", "inactive"];
  if (!validStatus.includes(status)) {
    return res.status(400).send({
      success: false,
      message: "Invalid Status!",
    });
  }
  //Uploading file on Cloudnary
  const { secure_url, public_id } = await uploadFileOnCloudnary(
    SOP_filePath,
    "SOP_file"
  );
  if (!secure_url) {
    return res.status(400).send({
      success: false,
      message: "Error While Uploading File",
    });
  }
  // Fetch the Department
  const deptid = await Department.findById(dept);
  if (!deptid) {
    return res
      .status(404)
      .send({ success: false, message: "Department not found" });
  }

  try {
    const newDivision = new Division({
      name,
      description,
      SOP_file: {
        secure_url,
        public_id,
      },
      weakness,
      strength,
      status,
      date_added,
      dept: deptid,
    });

    await newDivision.save();
    res.status(201).json({
      message: "Division created successfully",
      division: newDivision,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating Division", error });
  }
};
// Update a department by ID
const updateDivision = async (req, res) => {
  try {
    const { name, description, status, date_added, weakness, strength } =
      req.body;
    const SOP_filePath = req.file?.path;

    const { divID } = req.params;
    const division = await Division.findById(divID);
    console.log(division);
    if (!division) {
      return res.status(401).send({
        success: false,
        message: "Division Not Found",
      });
    }
    //upload new media file on cloudinary
    if (SOP_filePath) {
      const { secure_url, public_id } = await uploadFileOnCloudnary(
        SOP_filePath,
        "SOP_file"
      );
      // delete File from Cloudinary
      if (division.SOP_file && division.SOP_file.public_id) {
        await deleteFileFromCloudnary(division.SOP_file.public_id);
      }
      division.SOP_file = {
        secure_url,
        public_id,
      };
    }

    //update any of the field that user update
    if (name) division.name = name;
    if (description) division.description = description;
    if (date_added) division.date_added = date_added;
    if (weakness) division.weakness = weakness;
    if (strength) division.strength = strength;
    if (status) division.status = status;
    await division.save();
    res.status(200).json({
      message: "Division updated successfully",
      department: division,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating division", error });
  }
};
// Get all division
const getDivisions = async (req, res) => {
  try {
    const division = await Division.find({});
    return res.status(200).send({
      success: true,
      total: division.length,
      message: "All division Fetch",
      division,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching division", error });
  }
};
// Get a division by ID
const getDivisionById = async (req, res) => {
  try {
    const { divID } = req.params;
    const division = await Division.findById(divID).populate("dept");
    if (!division) {
      return res.status(404).json({ message: "Division not found" });
    }
    res.status(200).json(division);
  } catch (error) {
    res.status(500).json({ message: "Error fetching division", error });
  }
};
// Delete a Division by ID
const deleteDivision = async (req, res) => {
  try {
    const { divID } = req.params;
    const division = await Division.findByIdAndDelete(divID);
    if (!division) {
      return res.status(404).json({ message: "Division not found" });
    }
    res.status(200).json({ message: "Division deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting Division", error });
  }
};

////---- POSITIONS-----------
//----------- DIVISION POSITION--------
const addDivisionposition = async (req, res) => {
  const {
    name,
    description,
    responsibilities,
    requirements,
    salary,
    salary_in_USDT,
    division,
    note,
  } = req.body;
  const SOP_file = req.file?.fieldname;
  const SOP_filePath = req.file?.path;

  //Uploading file on Cloudnary
  const { secure_url, public_id } = await uploadFileOnCloudnary(
    SOP_filePath,
    "SOP_file"
  );
  if (!secure_url) {
    return res.status(400).send({
      success: false,
      message: "Error While Uploading File",
    });
  }
  // Fetch the ddepartment
  const divid = await Division.findById(division);
  if (!divid) {
    return res
      .status(404)
      .send({ success: false, message: "Devision not found" });
  }
  try {
    const newPosition = new DivisionPosition({
      name,
      description,
      SOP_file: {
        secure_url,
        public_id,
      },
      responsibilities,
      salary,
      salary_in_USDT,
      requirements,
      note,
      division: divid,
    });

    await newPosition.save();
    res.status(201).json({
      message: "Position created successfully",
      division: newPosition,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating Position", error });
  }
};
// Update a division position by ID
const updateDivisionposition = async (req, res) => {
  try {
    const {
      name,
      description,
      responsibilities,
      requirements,
      salary,
      salary_in_USDT,
      note,
    } = req.body;
    const SOP_filePath = req.file?.path;
    const { positionID } = req.params;
    const position = await DivisionPosition.findById(positionID);
    console.log(position);
    if (!position) {
      return res.status(401).send({
        success: false,
        message: "Position Not Found",
      });
    }
    //upload new media file on cloudinary
    if (SOP_filePath) {
      const { secure_url, public_id } = await uploadFileOnCloudnary(
        SOP_filePath,
        "SOP_file"
      );
      // delete File from Cloudinary
      if (position.SOP_file && position.SOP_file.public_id) {
        await deleteFileFromCloudnary(position.SOP_file.public_id);
      }
      position.SOP_file = {
        secure_url,
        public_id,
      };
    }
    //update any of the field that user update
    if (name) position.name = name;
    if (description) position.description = description;
    if (responsibilities) position.responsibilities = responsibilities;
    if (requirements) position.requirements = requirements;
    if (salary) position.salary = salary;
    if (salary_in_USDT) position.salary_in_USDT = salary_in_USDT;
    if (note) position.note = note;
    await position.save();
    res.status(200).json({
      message: "Position updated successfully",
      position: position,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating position", error });
  }
};
// Get all Division position
const getDivisionpositions = async (req, res) => {
  try {
    const position = await DivisionPosition.find({});
    return res.status(200).send({
      success: true,
      total: position.length,
      message: "All position Fetch",
      position,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching positions", error });
  }
};
// Get a division position by ID
const getDivisionpositionById = async (req, res) => {
  try {
    const { positionID } = req.params;
    const position = await DivisionPosition.findById(positionID).populate("division");
    if (!position) {
      return res.status(404).json({ message: "Position not found" });
    }
    res.status(200).json(position);
  } catch (error) {
    res.status(500).json({ message: "Error fetching PositionID", error });
  }
};
// Delete a Division position by ID
const deleteDivisionposition = async (req, res) => {
  try {
    const { positionID } = req.params;
    const Position = await DivisionPosition.findByIdAndDelete(positionID);
    if (!Position) {
      return res.status(404).json({ message: "Position not found" });
    }
    res.status(200).json({ message: "Position deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting Position", error });
  }
};

////---- POSITIONS-----------
//----------- DEPARTMENT POSITION--------
const addDepartmentposition = async (req, res) => {
  const {
    name,
    description,
    responsibilities,
    requirements,
    salary,
    salary_in_USDT,
    dept,
    note,
  } = req.body;
  const SOP_file = req.file?.fieldname;
  const SOP_filePath = req.file?.path;

  //Uploading file on Cloudnary
  const { secure_url, public_id } = await uploadFileOnCloudnary(
    SOP_filePath,
    "SOP_file"
  );
  if (!secure_url) {
    return res.status(400).send({
      success: false,
      message: "Error While Uploading File",
    });
  }
  // Fetch the ddepartment
  const deptid = await Department.findById(dept);
  if (!deptid) {
    return res
      .status(404)
      .send({ success: false, message: "Devision not found" });
  }
  try {
    const newPosition = new DeptPosition({
      name,
      description,
      SOP_file: {
        secure_url,
        public_id,
      },
      responsibilities,
      salary,
      salary_in_USDT,
      requirements,
      note,
      dept: deptid,
    });

    await newPosition.save();
    res.status(201).json({
      message: "Position created successfully",
      division: newPosition,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating Position", error });
  }
};
// Update a division position by ID
const updateDepartmentposition = async (req, res) => {
  try {
    const {
      name,
      description,
      responsibilities,
      requirements,
      salary,
      salary_in_USDT,
      note,
    } = req.body;
    const SOP_filePath = req.file?.path;
    const { positionID } = req.params;
    const position = await DeptPosition.findById(positionID);
    console.log(position);
    if (!position) {
      return res.status(401).send({
        success: false,
        message: "Position Not Found",
      });
    }
    //upload new media file on cloudinary
    if (SOP_filePath) {
      const { secure_url, public_id } = await uploadFileOnCloudnary(
        SOP_filePath,
        "SOP_file"
      );
      // delete File from Cloudinary
      if (position.SOP_file && position.SOP_file.public_id) {
        await deleteFileFromCloudnary(position.SOP_file.public_id);
      }
      position.SOP_file = {
        secure_url,
        public_id,
      };
    }
    //update any of the field that user update
    if (name) position.name = name;
    if (description) position.description = description;
    if (responsibilities) position.responsibilities = responsibilities;
    if (requirements) position.requirements = requirements;
    if (salary) position.salary = salary;
    if (salary_in_USDT) position.salary_in_USDT = salary_in_USDT;
    if (note) position.note = note;
    await position.save();
    res.status(200).json({
      message: "Position updated successfully",
      position: position,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating position", error });
  }
};
// Get all Division position
const getDepartmentpositions = async (req, res) => {
  try {
    const position = await DeptPosition.find({});
    return res.status(200).send({
      success: true,
      total: position.length,
      message: "All position Fetch",
      position,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching positions", error });
  }
};
// Get a division position by ID
const getDepartmentpositionById = async (req, res) => {
  try {
    const { positionID } = req.params;
    const position = await DeptPosition.findById(positionID).populate("dept");
    if (!position) {
      return res.status(404).json({ message: "Position not found" });
    }
    res.status(200).json(position);
  } catch (error) {
    res.status(500).json({ message: "Error fetching PositionID", error });
  }
};
// Delete a Division position by ID
const deleteDepartmentposition = async (req, res) => {
  try {
    const { positionID } = req.params;
    const Position = await DeptPosition.findByIdAndDelete(positionID);
    if (!Position) {
      return res.status(404).json({ message: "Position not found" });
    }
    res.status(200).json({ message: "Position deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting Position", error });
  }
};

////---- POSITIONS-----------
//----------- DEPARTMENT POSITION--------
const addOfficetposition = async (req, res) => {
  const {
    name,
    description,
    responsibilities,
    requirements,
    salary,
    salary_in_USDT,
    office,
    note,
  } = req.body;
  const SOP_file = req.file?.fieldname;
  const SOP_filePath = req.file?.path;

  //Uploading file on Cloudnary
  const { secure_url, public_id } = await uploadFileOnCloudnary(
    SOP_filePath,
    "SOP_file"
  );
  if (!secure_url) {
    return res.status(400).send({
      success: false,
      message: "Error While Uploading File",
    });
  }
  // Fetch the ddepartment
  const id = await Office.findById(office);
  if (!id) {
    return res
      .status(404)
      .send({ success: false, message: "Devision not found" });
  }
  try {
    const newPosition = new OfficePosition({
      name,
      description,
      SOP_file: {
        secure_url,
        public_id,
      },
      responsibilities,
      salary,
      salary_in_USDT,
      requirements,
      note,
      office: id,
    });

    await newPosition.save();
    res.status(201).json({
      message: "Position created successfully",
      division: newPosition,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating Position", error });
  }
};
// Update a division position by ID
const updateOfficeposition = async (req, res) => {
  try {
    const {
      name,
      description,
      responsibilities,
      requirements,
      salary,
      salary_in_USDT,
      note,
    } = req.body;
    const SOP_filePath = req.file?.path;
    const { positionID } = req.params;
    const position = await OfficePosition.findById(positionID);
    console.log(position);
    if (!position) {
      return res.status(401).send({
        success: false,
        message: "Position Not Found",
      });
    }
    //upload new media file on cloudinary
    if (SOP_filePath) {
      const { secure_url, public_id } = await uploadFileOnCloudnary(
        SOP_filePath,
        "SOP_file"
      );
      // delete File from Cloudinary
      if (position.SOP_file && position.SOP_file.public_id) {
        await deleteFileFromCloudnary(position.SOP_file.public_id);
      }
      position.SOP_file = {
        secure_url,
        public_id,
      };
    }
    //update any of the field that user update
    if (name) position.name = name;
    if (description) position.description = description;
    if (responsibilities) position.responsibilities = responsibilities;
    if (requirements) position.requirements = requirements;
    if (salary) position.salary = salary;
    if (salary_in_USDT) position.salary_in_USDT = salary_in_USDT;
    if (note) position.note = note;
    await position.save();
    res.status(200).json({
      message: "Position updated successfully",
      position: position,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating position", error });
  }
};
// Get all Division position
const getOfficepositions = async (req, res) => {
  try {
    const position = await OfficePosition.find({});
    return res.status(200).send({
      success: true,
      total: position.length,
      message: "All position Fetch",
      position,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching positions", error });
  }
};
// Get a division position by ID
const getOfficepositionById = async (req, res) => {
  try {
    const { positionID } = req.params;
    const position = await OfficePosition.findById(positionID).populate("office");
    if (!position) {
      return res.status(404).json({ message: "Position not found" });
    }
    res.status(200).json(position);
  } catch (error) {
    res.status(500).json({ message: "Error fetching PositionID", error });
  }
};
// Delete a Division position by ID
const deleteOfficeposition = async (req, res) => {
  try {
    const { positionID } = req.params;
    const Position = await OfficePosition.findByIdAndDelete(positionID);
    if (!Position) {
      return res.status(404).json({ message: "Position not found" });
    }
    res.status(200).json({ message: "Position deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting Position", error });
  }
};


export {
  addDepartment,
  getDepartmentById,
  getDepartments,
  updateDepartment,
  deleteDepartment,
  addOffice,
  getOffice,
  getOfficeById,
  updateOffice,
  deleteOffice,
  addDivision,
  getDivisionById,
  getDivisions,
  deleteDivision,
  updateDivision,
  addDivisionposition,
  getDivisionpositionById,
  getDivisionpositions,
  deleteDivisionposition,
  updateDivisionposition,
  addDepartmentposition,
  getDepartmentpositionById,
  getDepartmentpositions,
  updateDepartmentposition,
  deleteDepartmentposition,
  addOfficetposition,
  updateOfficeposition,
  deleteOfficeposition,
  getOfficepositionById,
  getOfficepositions
};
