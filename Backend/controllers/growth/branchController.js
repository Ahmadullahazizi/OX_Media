import {
  deleteFileFromCloudnary,
  uploadFileOnCloudnary,
} from "../../helper/cloudnaryHelper.js";
import { Branch } from "../../models/growth/brachSchema.js";

// -----------------BRANCH------------------
//Add a new Branch Manager
const addbranch = async (req, res) => {
  try {
    const {
      branch_name,
      description,
      country,
      local_currency,
      local_currency_abbr,
      local_language,
      branch_website_link,
      note,
    } = req.body;

    if (
      !branch_name ||
      !description ||
      !country ||
      !local_currency ||
      !local_currency_abbr ||
      !local_language ||
      !branch_website_link
    ) {
      return res.status(400).send({ success: false, message: "All fields are required" });
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
      country,
      local_currency,
      local_currency_abbr,
      local_language,
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
    //Success Response when new category added to DB
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
      description,
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
    if (description) branch.description = description;
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
  addbranch, 
  getAllBranch,
  getSingleBranch,
  updateBranch,
  deleteBranch
};
