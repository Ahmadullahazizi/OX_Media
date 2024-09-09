import {
  deleteFileFromCloudnary,
  uploadFileOnCloudnary,
} from "../../helper/cloudnaryHelper.js";
import { BranchManager, Branch } from "../../models/growth/brachSchema.js";

//Branch manager Controller
//Add a new Branch Manager
const addbranchmanager = async (req, res) => {
  try {
    const { name, email, phone_number, status, position, joining_date } =
      req.body;
    const contract_file = req.file?.fieldname;
    const contract_filePath = req.file?.path;
    if (
      !name ||
      !email ||
      !phone_number ||
      !status ||
      !position ||
      !joining_date ||
      !contract_file ||
      !contract_filePath
    ) {
      return res
        .status(400)
        .send({ success: false, message: "All field required" });
    }
    //Uploading file on Cloudnary
    const { secure_url, public_id } = await uploadFileOnCloudnary(
      contract_filePath,
      "Contract_Files"
    );
    if (!secure_url) {
      return res.status(400).send({
        success: false,
        message: "Error While Uploading File",
      });
    }

    const Manager = await BranchManager.create({
      name,
      email,
      phone_number,
      status,
      position,
      joining_date,
      contract_file: {
        secure_url,
        public_id,
      },
    });
    return res.status(201).send({
      success: true,
      message: "Manager Created Successfully !!",
      Manager,
    });
  } catch (error) {
    console.log(`fail to Add Manager with Error - ${error}`);
    return res.status(400).send({
      success: false,
      message: "Failed to add branch manager",
      error: "Error message explaining the issue",
    });
  }
};

//Get All Manager detail
const getAllManager = async (req, res) => {
  try {
    const Manager = await BranchManager.find({});
    return res.status(200).send({
      success: true,
      totle: Manager.length,
      message: "Manager Data Fetch",
      Manager,
    });
  } catch (error) {
    console.log(`getAllManager failled Error - ${error}`);
    return res.status(400).send({
      success: false,
      message: "Failled to get Manager Data",
    });
  }
};

const updateManager = async (req, res) => {
  try {
    const { managerid } = req.params;
    const { name, email, phone_number, status, position, joining_date } =
      req.body;
    const contract_filePath = req.file?.path;

    const Manager = await BranchManager.findById(managerid);
    console.log(Manager);
    if (!Manager) {
      return res.status(401).send({
        success: false,
        message: "Manager Not Found",
      });
    }
    //update any of the field that user update
    if (name) Manager.name = name;
    if (email) Manager.email = email;
    if (phone_number) Manager.phone_number = phone_number;
    if (status) Manager.status = status;
    if (position) Manager.position = position;
    if (joining_date) Manager.joining_date = joining_date;

    //upload new manager file on cloudinary
    if (contract_filePath) {
      const { secure_url, public_id } = await uploadFileOnCloudnary(
        contract_filePath,
        "Contract_Files"
      );
      // delete File from Cloudinary
      if (Manager.contract_file && Manager.contract_file.public_id) {
        await deleteFileFromCloudnary(Manager.contract_file.public_id);
      }
      Manager.contract_file = {
        secure_url,
        public_id,
      };
    }
    await Manager.save();
    return res.status(200).send({
      success: true,
      message: "Manager Details Updated",
    });
  } catch (error) {
    console.log(`Update Manager Controller failled Error - ${error}`);
    return res.status(400).send({
      success: false,
      message: "Error While Updating manager details",
    });
  }
};

//Get Single Manager detail
const getSingleManager = async (req, res) => {
  try {
    const { managerid } = req.params;
    console.log(managerid);
    const manager = await BranchManager.findById(managerid);
    console.log(manager);
    if (!manager) {
      return res
        .status(404)
        .send({ success: false, message: "Manager not Found" });
    }
    //Success Respose when new category added to DB
    return res.status(201).send({
      success: true,
      message: "Manager Fetch SucessFully",
      manager,
    });
  } catch (error) {
    console.log(`getSingleManagerController failled Error - ${error}`);
    return res.status(400).send({
      success: false,
      message: "getSingleManagerController Failled",
    });
  }
};

//Delete Manager
const deleteManager = async (req, res) => {
  try {
    const { managerid } = req.params;
    console.log(managerid);
    const manager = await BranchManager.findById(managerid);
    if (!manager) {
      return res
        .status(404)
        .send({ success: false, message: "Manager not Found" });
    }
    // delete File from cloudany
    if (manager.contract_file && manager.contract_file.public_id) {
      await deleteFileFromCloudnary(manager.contract_file.public_id);
    }

    await BranchManager.findByIdAndDelete(managerid);

    return res.status(200).send({
      success: true,
      message: "Manager Deleted Successfully",
    });
  } catch (error) {
    console.log(`deleteManager Controller failled Error - ${error}`);
    return res.status(400).send({
      success: false,
      message: "Unable to delete data",
    });
  }
};

// -----------------BRANCH------------------

//Add a new Branch Manager
const addbranch = async (req, res) => {
  try {
    const {
      branch_name,
      manager_id,
      description,
      date_added,
      country,
      local_currency,
      local_currency_abbr,
      local_language,
      branch_website_link,
      note,
    } = req.body;

    if (
      !branch_name ||
      !manager_id ||
      !description ||
      !date_added ||
      !country ||
      !local_currency ||
      !local_currency_abbr ||
      !local_language ||
      !branch_website_link
    ) {
      return res.status(400).send({ success: false, message: "All fields are required" });
    }

    const managerExists = await BranchManager.findById(manager_id);
    if (!managerExists) {
      return res.status(400).send({ success: false, message: "Invalid manager ID" });
    }

    console.log("Files received:", req.files);

    let legalDoc = { secure_url: "", public_id: "" };
    let projPlan = { secure_url: "", public_id: "" };

    // Upload legal_doc
    if (req.files && req.files.legal_doc && req.files.legal_doc[0].path) {
      try {
        const { secure_url, public_id } = await uploadFileOnCloudnary(req.files.legal_doc[0].path, "legal_doc");
        legalDoc = { secure_url, public_id };
      } catch (error) {
        return res.status(500).send({
          success: false,
          message: "Error uploading legal document to Cloudinary",
          error: error.message || JSON.stringify(error),
        });
      }
    }

    // Upload proj_plan
    if (req.files && req.files.proj_plan && req.files.proj_plan[0].path) {
      try {
        const { secure_url, public_id } = await uploadFileOnCloudnary(req.files.proj_plan[0].path, "proj_plan");
        projPlan = { secure_url, public_id };
      } catch (error) {
        return res.status(500).send({
          success: false,
          message: "Error uploading project plan to Cloudinary",
          error: error.message || JSON.stringify(error),
        });
      }
    }

    // Create the branch in the database
    const branch = await Branch.create({
      branch_name,
      description,
      date_added,
      country,
      local_currency,
      local_currency_abbr,
      local_language,
      manager_id,
      branch_website_link,
      note,
      legal_doc: legalDoc,
      proj_plan: projPlan,
    });

    return res.status(200).send({
      success: true,
      message: "Branch created successfully!",
      branch,
    });
  } catch (error) {
    console.error("Failed to add branch:", error);
    return res.status(500).send({
      success: false,
      message: "Failed to add branch",
      error: error.message || JSON.stringify(error),
    });
  }
};

//Get All Branch detail
const getAllBranch = async (req, res) => {
  try {
    const Branches = await Branch.find({});
    return res.status(200).send({
      success: true,
      totle: Branches.length,
      message: "Branch Data Fetch",
      Branches,
    });
  } catch (error) {
    console.log(`getAllBranche failled Error - ${error}`);
    return res.status(400).send({
      success: false,
      message: "Failled to get Branch Data",
    });
  }
};

//Get Single Manager detail
const getSingleBranch = async (req, res) => {
  try {
    const { branchid } = req.params;
    console.log(branchid);
    const branch = await Branch.findById(branchid);
    console.log(branch);
    if (!branch) {
      return res
        .status(404)
        .send({ success: false, message: "Branch not Found" });
    }
    //Success Respose when new category added to DB
    return res.status(201).send({
      success: true,
      message: "Branch Fetch SucessFully",
      branch,
    });
  } catch (error) {
    console.log(`getSingleBranchController failled Error - ${error}`);
    return res.status(400).send({
      success: false,
      message: "getSingleBranchController Failled",
    });
  }
};

//Update branch details
const updateBranch = async (req, res) => {
  try {
    const { branchid } = req.params;
    const {
      branch_name,
      manager_id,
      description,
      date_added,
      country,
      local_currency,
      local_currency_abbr,
      local_language,
      branch_website_link,
      note,
    } = req.body;

    const branch = await Branch.findById(branchid);
    console.log(branch);
    if (!branch) {
      return res.status(401).send({
        success: false,
        message: "Branch Not Found",
      });
    }
    console.log("Files received:", req.files);

    // Handle the legal_doc update
    if (req.files && req.files.legal_doc && req.files.legal_doc[0].path) {
      try {
        // If there's an existing document, delete it from Cloudinary
        if (branch.legal_doc && branch.legal_doc.public_id) {
          await deleteFileFromCloudnary(branch.legal_doc.public_id);
        }
        // Upload the new document
        const { secure_url, public_id } = await uploadFileOnCloudnary(req.files.legal_doc[0].path, "legal_doc");
        branch.legal_doc = { secure_url, public_id };
      } catch (error) {
        return res.status(500).send({
          success: false,
          message: "Error uploading legal document to Cloudinary",
          error: error.message || JSON.stringify(error),
        });
      }
    }

    // Handle the proj_plan update
    if (req.files && req.files.proj_plan && req.files.proj_plan[0].path) {
      try {
        // If there's an existing project plan, delete it from Cloudinary
        if (branch.proj_plan && branch.proj_plan.public_id) {
          await deleteFileFromCloudnary(branch.proj_plan.public_id);
        }
        // Upload the new project plan
        const { secure_url, public_id } = await uploadFileOnCloudnary(req.files.proj_plan[0].path, "proj_plan");
        branch.proj_plan = { secure_url, public_id };
      } catch (error) {
        return res.status(500).send({
          success: false,
          message: "Error uploading project plan to Cloudinary",
          error: error.message || JSON.stringify(error),
        });
      }
    }

    //update any of the field that user update
    if (branch_name) branch.branch_name = branch_name;
    if (manager_id) branch.manager_id = manager_id;
    if (description) branch.description = description;
    if (date_added) branch.date_added = date_added;
    if (country) branch.country = country;
    if (local_currency) branch.local_currency = local_currency;
    if (local_currency_abbr) branch.local_currency_abbr = local_currency_abbr;
    if (local_language) branch.local_language = local_language;
    if (branch_website_link) branch.branch_website_link = branch_website_link;
    if (note) branch.note = note;
    //save updates    
    await branch.save();

    return res.status(200).send({
      success: true,
      message: "Branch Details Updated",
      branch
    });
  } catch (error) {
    console.log(`Update Branch Controller failled Error - ${error}`);
    return res.status(400).send({
      success: false,
      message: "Error While Updating branch details",
    });
  }
};

const deleteBranch = async (req, res) => {
  try {
    const { branchid } = req.params;
    console.log(branchid);
    const branch = await Branch.findById(branchid);
    if (!branch) {
      return res
        .status(404)
        .send({ success: false, message: "Branch not Found" });
    }
    // delete File from cloudany
    if (branch.legal_doc && branch.legal_doc.public_id) {
      await deleteFileFromCloudnary(branch.legal_doc.public_id);
    }
    if (branch.proj_plan && branch.proj_plan.public_id) {
      await deleteFileFromCloudnary(branch.proj_plan.public_id);
    }

    await Branch.findByIdAndDelete(branchid);

    return res.status(200).send({
      success: true,
      message: "Branch Deleted Successfully",
    });
  } catch (error) {
    console.log(`deleteBranch Controller failled Error - ${error}`);
    return res.status(400).send({
      success: false,
      message: "Unable to delete data",
    });
  }
};

export {
  addbranchmanager,
  getAllManager,
  getSingleManager,
  deleteManager,
  updateManager,
  addbranch, 
  getAllBranch,
  getSingleBranch,
  updateBranch,
  deleteBranch
};
