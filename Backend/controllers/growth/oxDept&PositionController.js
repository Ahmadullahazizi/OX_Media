import {
    deleteFileFromCloudnary,
    uploadFileOnCloudnary,
  } from "../../helper/cloudnaryHelper.js";
import { Branch } from "../../models/growth/brachSchema.js";
  import {
    Department,
    Division,
    Office,
    DeptPosition,
    DivisionPosition,
    OfficePosition
  } from "../../models/growth/oxDept&PositionSchema.js";


///-------------OFFICE---------

const addOffice = async (req, res) => {
    const {
      branch,
      name,
      status,
      weakness,
      strength
    } = req.body;

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
      branch:branchid,
      name,
      status,
      weakness,
      strength
      });
  
      await office.save();
      res.status(201).json({ message: 'Office created successfully', department: office });
    } catch (error) {
      res.status(500).json({ message: 'Error creating Office', error });
    }
  };
  
 //update office
 const updateOffice = async (req, res) => {
    try{
    const {
      branch,
      name,
      status,
      weakness,
      strength
    } = req.body;
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
      res.status(201).json({ message: 'Office created successfully', department: office });
 } catch (error) {
      res.status(500).json({ message: 'Error creating Office', error });
    }}

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
      res.status(500).json({ message: 'Error fetching Office', error });
    } };

  
  // Get a Office by ID
  const getOfficeById = async (req, res) => {
    try {
        const { officeID } = req.params;
      const office = await Office.findById(officeID);
      if (!office) {
        return res.status(404).json({ message: 'Office not found' });
      }
      res.status(200).json(office);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching Office', error });
    }
  };

  // Delete a Office by ID
  const deleteOffice = async (req, res) => {
    try {
        const { officeID } = req.params;
      const office = await Office.findByIdAndDelete(officeID);
      if (!office) {
        return res.status(404).json({ message: 'Office not found' });
      }
      res.status(200).json({ message: 'Office deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting Office', error });
    }
  };



///-------------DEPARTMENT---------
  const addDepartment = async (req, res) => {
    const {
      manager_id,
      office_id,
      name,
      description,
      level,
      status
    } = req.body;
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

    try {
      const newDepartment = new Department({
        manager_id,
        office_id,
        name,
        description,
        SOP_file: {
            secure_url,
            public_id,
          },
        level,
        status
      });
  
      await newDepartment.save();
      res.status(201).json({ message: 'Department created successfully', department: newDepartment });
    } catch (error) {
      res.status(500).json({ message: 'Error creating department', error });
    }
  };
  
  // Update a department by ID
  const updateDepartment = async (req, res) => {
    try {

    const {
        manager_id,
        office_id,
        name,
        description,
        level,
        status
      } = req.body;
     
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

      //update any of the field that user update
    if (name) department.name = name;
    if (description) department.description = description;
    if (level) department.level = level;
    if (manager_id) department.manager_id = manager_id;
    if (office_id) department.office_id = office_id;
    if (status) department.status = status;
  

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
    await department.save();
      res.status(200).json({ message: 'Department updated successfully', department: updatedDepartment });
    } catch (error) {
      res.status(500).json({ message: 'Error updating department', error });
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
      res.status(500).json({ message: 'Error fetching departments', error });
    }
  };
  
  // Get a department by ID
  const getDepartmentById = async (req, res) => {
    try {
        const { deptID } = req.params;
      const department = await Department.findById(deptID).populate('manager_id').populate('office_id');
      if (!department) {
        return res.status(404).json({ message: 'Department not found' });
      }
      res.status(200).json(department);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching department', error });
    }
  };

  // Delete a department by ID
  const deleteDepartment = async (req, res) => {
    try {
        const { deptID } = req.params;
      const deletedDepartment = await Department.findByIdAndDelete(deptID);
      if (!deletedDepartment) {
        return res.status(404).json({ message: 'Department not found' });
      }
      res.status(200).json({ message: 'Department deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting department', error });
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
  }