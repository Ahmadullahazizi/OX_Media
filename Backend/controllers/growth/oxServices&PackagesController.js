import {
  deleteFileFromCloudnary,
  uploadFileOnCloudnary,
} from "../../helper/cloudnaryHelper.js";
import { Branch } from "../../models/growth/brachSchema.js";
import {
  OXPackages,
  OXServices,
  OXServicesPackages,
  ServiceDeliverables,
} from "../../models/growth/oxService&PackagesSchema.js";

//--------OX SERVICES----------

const addoxservice = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    console.log("SOP file:", req.file);
    const {
      service_name,
      description,
      importance,
      status,
      ourWeakness,
      ourStrength,
      note,
    } = req.body;
    const SOP_file = req.file?.fieldname;
    const SOP_filePath = req.file?.path;
    if (
      !service_name ||
      !importance ||
      !description ||
      !status ||
      !ourStrength ||
      !ourWeakness ||
      !note
    ) {
      return res
        .status(400)
        .send({ success: false, message: "All field required" });
    }
    // Verify that the importance_level is valid
    const validImportance = ["high", "mid", "low"];
    if (!validImportance.includes(importance)) {
      return res.status(400).send({
        success: false,
        message: "Invalid Importance level!",
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
    const Services = await OXServices.create({
      service_name,
      description,
      status,
      importance,
      ourWeakness,
      ourStrength,
      note,
      SOP_file: {
        secure_url,
        public_id,
      },
    });
    return res.status(201).send({
      success: true,
      message: "OX Service Created Successfully !!",
      Services,
    });
  } catch (error) {
    console.log(`failed to Add OX Service with Error - ${error}`);
    return res.status(400).send({
      success: false,
      message: "Failed to add OX Service",
      error: error.message,
    });
  }
};
//update Service
const updateOXservice = async (req, res) => {
  try {
    const {
      service_name,
      description,
      importance,
      status,
      ourWeakness,
      ourStrength,
      note,
    } = req.body;

    const SOP_filePath = req.file?.path;

    const { serviceID } = req.params;
    const service = await OXServices.findById(serviceID);
    console.log(service);
    if (!service) {
      return res.status(401).send({
        success: false,
        message: "Service Not Found",
      });
    }
    //update any of the field that user update
    if (service_name) service.service_name = service_name;
    if (description) service.description = description;
    if (importance) service.importance = importance;
    if (status) service.status = status;
    if (ourWeakness) service.ourWeakness = ourWeakness;
    if (ourStrength) service.ourStrength = ourStrength;
    if (note) service.note = note;

    //upload new media file on cloudinary
    if (SOP_filePath) {
      const { secure_url, public_id } = await uploadFileOnCloudnary(
        SOP_filePath,
        "SOP_file"
      );
      // delete File from Cloudinary
      if (service.SOP_file && service.SOP_file.public_id) {
        await deleteFileFromCloudnary(service.SOP_file.public_id);
      }
      service.SOP_file = {
        secure_url,
        public_id,
      };
    }

    await service.save();
    return res.status(200).send({
      success: true,
      message: "Service Details Updated",
    });
  } catch (error) {
    console.log(`Update service Controller failled Error - ${error}`);
    return res.status(400).send({
      success: false,
      message: "Error While Updating service details",
    });
  }
};

//Get all Keyword
const getAllOXservices = async (req, res) => {
  try {
    const service = await OXServices.find({});
    return res.status(200).send({
      success: true,
      total: service.length,
      message: "All service Fetch",
      service,
    });
  } catch (error) {
    console.log(`Get All service failled Error - ${error}`);
    return res.status(400).send({
      success: false,
      message: "Failled to get service",
    });
  }
};
//Get Single Keyword detail
const getSingleOXservice = async (req, res) => {
  try {
    const { serviceID } = req.params;
    console.log(serviceID);
    const service = await OXServices.findById(serviceID);
    console.log(service);
    if (!service) {
      return res
        .status(404)
        .send({ success: false, message: "Service not Found" });
    }
    return res.status(201).send({
      success: true,
      message: "Service Fetch SucessFully",
      service,
    });
  } catch (error) {
    console.log(`Get Single service failled Error - ${error}`);
    return res.status(400).send({
      success: false,
      message: "Get Single service Controller Failled",
    });
  }
};
//Delete Keyword type
const DeleteOXservice = async (req, res) => {
  try {
    const { serviceID } = req.params;
    console.log(serviceID);
    const service = await OXServices.findById(serviceID);
    if (!service) {
      return res
        .status(404)
        .send({ success: false, message: "Service not Found" });
    }

    await OXServices.findByIdAndDelete(serviceID);

    return res.status(200).send({
      success: true,
      message: "Service Deleted Successfully",
    });
  } catch (error) {
    console.log(`Delete service Controller failled Error - ${error}`);
    return res.status(400).send({
      success: false,
      message: "Unable to delete data",
    });
  }
};

//--------OX PACKAGES----------

const addOxPackages = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    const {
      branch,
      pkg_name,
      description,
      duration,
      status,
      eligibility,
      price_before_discount,
      price_after_discount,
    } = req.body;

    if (
      !branch ||
      !pkg_name ||
      !duration ||
      !description ||
      !status ||
      !eligibility ||
      !price_before_discount ||
      !price_after_discount
    ) {
      return res
        .status(400)
        .send({ success: false, message: "All field required" });
    }
    // Fetch the Branch
    const branchid = await Branch.findById(branch);
    if (!branchid) {
      return res
        .status(404)
        .send({ success: false, message: "Branch not found" });
    }

    // Verify that the status is valid
    const validStatus = ["active", "inactive"];
    if (!validStatus.includes(status)) {
      return res.status(400).send({
        success: false,
        message: "Invalid Status!",
      });
    }
    console.log(validStatus)
    // Convert duration to days if needed
    let durationInDays = parseInt(duration); // Default is days if it's a number

    if (duration.includes("week")) {
      durationInDays = parseInt(duration) * 7; // Convert weeks to days
    } else if (duration.includes("month")) {
      durationInDays = parseInt(duration) * 30; // Convert months to days
    } else if (duration.includes("year")) {
      durationInDays = parseInt(duration) * 365; // Convert years to days
    } else if (isNaN(durationInDays)) {
      return res.status(400).json({
        success: false,
        message:
          "Duration must be a number or a valid time unit in days, weeks, months, or years.",
      });
    }
    console.log(durationInDays);
    const newPackage = await OXPackages.create({
      branch: branchid,
      pkg_name,
      description,
      status,
      eligibility,
      price_after_discount,
      price_after_discount,
      duration, //already in days
    });

    return res.status(201).send({
      success: true,
      message: "OX Package Created Successfully !!",
      newPackage,
    });
  } catch (error) {
    console.log(`failed to Add OX Package with Error - ${error}`);
    return res.status(400).send({
      success: false,
      message: "Failed to add OX Package",
      error: error,
    });
  }
};
//update Service
const updateOXPackages = async (req, res) => {
  try {
    const {
      pkg_name,
      description,
      duration,
      status,
      eligibility,
      price_before_discount,
      price_after_discount,
    } = req.body;
    const { packageID } = req.params;
    const Package = await OXPackages.findById(packageID);
    console.log(Package);
    if (!Package) {
      return res.status(401).send({
        success: false,
        message: "Package Not Found",
      });
    }
    // Verify that the status is valid
    const validStatus = ["active", "inactive"];
    if (!validStatus.includes(status)) {
      return res.status(400).send({
        success: false,
        message: "Invalid Status!",
      });
    }
    // Convert duration to days if needed
    let durationInDays = parseInt(duration); // Default is days if it's a number

    if (duration.includes("week")) {
      durationInDays = parseInt(duration) * 7; // Convert weeks to days
    } else if (duration.includes("month")) {
      durationInDays = parseInt(duration) * 30; // Convert months to days
    } else if (duration.includes("year")) {
      durationInDays = parseInt(duration) * 365; // Convert years to days
    } else if (isNaN(durationInDays)) {
      return res.status(400).json({
        success: false,
        message:
          "Duration must be a number or a valid time unit in days, weeks, months, or years.",
      });
    }

    //update any of the field that user update

    if (pkg_name) Package.pkg_name = pkg_name;
    if (description) Package.description = description;
    if (duration) Package.duration = duration;
    if (status) Package.status = status;
    if (eligibility) Package.eligibility = eligibility;
    if (price_before_discount)
      Package.price_before_discount = price_before_discount;
    if (price_after_discount)
      Package.price_after_discount = price_after_discount;

    await Package.save();
    return res.status(200).send({
      success: true,
      message: "Package Details Updated",
    });
  } catch (error) {
    console.log(`Update Package Controller failled Error - ${error}`);
    return res.status(400).send({
      success: false,
      message: "Error While Updating Package details",
    });
  }
};

//Get all Keyword
const getAllOXPackages = async (req, res) => {
  try {
    const Package = await OXPackages.find({});
    return res.status(200).send({
      success: true,
      total: Package.length,
      message: "All Package Fetch",
      Package,
    });
  } catch (error) {
    console.log(`Get All Package failled Error - ${error}`);
    return res.status(400).send({
      success: false,
      message: "Failled to get Package",
    });
  }
};
//Get Single Keyword detail
const getSingleOXPackages = async (req, res) => {
  try {
    const { packageID } = req.params;
    console.log(packageID);
    const Package = await OXPackages.findById(packageID);
    console.log(Package);
    if (!Package) {
      return res
        .status(404)
        .send({ success: false, message: "Package not Found" });
    }
    return res.status(201).send({
      success: true,
      message: "Package Fetch SucessFully",
      Package,
    });
  } catch (error) {
    console.log(`Get Single Package failled Error - ${error}`);
    return res.status(400).send({
      success: false,
      message: "Get Single Package Controller Failled",
    });
  }
};
//Delete Keyword type
const DeleteOXpackages = async (req, res) => {
  try {
    const { packageID } = req.params;
    console.log(packageID);
    const Package = await OXPackages.findById(packageID);
    if (!Package) {
      return res
        .status(404)
        .send({ success: false, message: "Package not Found" });
    }

    await OXPackages.findByIdAndDelete(packageID);

    return res.status(200).send({
      success: true,
      message: "Package Deleted Successfully",
    });
  } catch (error) {
    console.log(`Delete Package Controller failled Error - ${error}`);
    return res.status(400).send({
      success: false,
      message: "Unable to delete data",
    });
  }
};

// Create OX Services Package with Validation
const addOxServicesPackage = async (req, res) => {
  try {
    const { ox_service, oxpkg, description, status } = req.body;

    // Validate required fields
    if (!ox_service || !oxpkg) {
      return res.status(400).json({
        success: false,
        message: "OX Service and OX Package are required",
      });
    }

    // Check if the referenced OX Service exists
    const serviceExists = await OXServices.findById(ox_service);
    if (!serviceExists) {
      return res.status(404).json({
        success: false,
        message: "OX Service not found",
      });
    }

    // Check if the referenced OX Package exists
    const packageExists = await OXPackages.findById(oxpkg);
    if (!packageExists) {
      return res.status(404).json({
        success: false,
        message: "OX Package not found",
      });
    }

    // Create the new entry
    const newServicePackage = await OXServicesPackages.create({
      ox_service,
      oxpkg,
      description,
      status,
    });

    return res.status(201).json({
      success: true,
      message: "OX Services Package created successfully",
      data: newServicePackage,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create OX Services Package",
      error: error.message,
    });
  }
};

// Get All OX Services Packages
const getAllOxServicesPackages = async (req, res) => {
  try {
    const servicePackages = await OXServicesPackages.find()
      .populate("ox_service") // Populating the referenced services
      .populate("oxpkg"); // Populating the referenced packages

    return res.status(200).json({
      success: true,
      data: servicePackages,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve OX Services Packages",
      error: error.message,
    });
  }
};

// Get OX Services Package by ID
const getOxServicesPackageById = async (req, res) => {
  try {
    const { id } = req.params;
    const servicePackage = await OXServicesPackages.findById(id)
      .populate("ox_service")
      .populate("oxpkg");

    if (!servicePackage) {
      return res.status(404).json({
        success: false,
        message: "OX Services Package not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: servicePackage,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve OX Services Package",
      error: error.message,
    });
  }
};

// Update OX Services Package by ID with Validation
const updateOxServicesPackage = async (req, res) => {
  try {
    const { id } = req.params;
    const { ox_service, oxpkg, description, status } = req.body;

    // Check if OX Service exists if it's being updated
    if (ox_service) {
      const serviceExists = await OXServices.findById(ox_service);
      if (!serviceExists) {
        return res.status(404).json({
          success: false,
          message: "OX Service not found",
        });
      }
    }

    // Check if OX Package exists if it's being updated
    if (oxpkg) {
      const packageExists = await OXPackages.findById(oxpkg);
      if (!packageExists) {
        return res.status(404).json({
          success: false,
          message: "OX Package not found",
        });
      }
    }

    // Update the package
    const updatedPackage = await OXServicesPackages.findByIdAndUpdate(
      id,
      { ox_service, oxpkg, description, status },
      { new: true, runValidators: true }
    );

    if (!updatedPackage) {
      return res.status(404).json({
        success: false,
        message: "OX Services Package not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "OX Services Package updated successfully",
      data: updatedPackage,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update OX Services Package",
      error: error.message,
    });
  }
};

// Delete OX Services Package by ID
const deleteOxServicesPackage = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPackage = await OXServicesPackages.findByIdAndDelete(id);

    if (!deletedPackage) {
      return res.status(404).json({
        success: false,
        message: "OX Services Package not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "OX Services Package deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete OX Services Package",
      error: error.message,
    });
  }
};

//----------SERVICES DELIVERABLE----------
// Create a new Service Deliverable
const createServiceDeliverable = async (req, res) => {
  try {
    const { ox_service, name, description } = req.body;
    console.log(req.body);
    // Validate required fields
    if (!ox_service) {
      return res.status(400).json({
        success: false,
        message: "OX Service required",
      });
    }

    // Check if the referenced OX Service exists
    const serviceExists = await OXServices.findById(ox_service);
    if (!serviceExists) {
      return res.status(404).json({
        success: false,
        message: "OX Service not found",
      });
    }

    // Create the new entry
    const newDeliverable = await ServiceDeliverables.create({
      ox_service: serviceExists,
      name,
      description,
    });

    return res.status(201).json({
      success: true,
      message: "OX Services Deliverable created successfully",
      data: newDeliverable,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating service deliverable", error });
  }
};

// Get all Service Deliverables
const getAllServiceDeliverables = async (req, res) => {
  try {
    const serviceDeliverables = await ServiceDeliverables.find().populate(
      "ox_service"
    );
    res.status(200).json(serviceDeliverables);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching service deliverables", error });
  }
};

// Get a single Service Deliverable by ID
const getServiceDeliverableById = async (req, res) => {
  try {
    const { id } = req.params;
    const serviceDeliverable = await ServiceDeliverables.findById(id).populate(
      "ox_service"
    );
    if (!serviceDeliverable) {
      return res.status(404).json({ message: "Service deliverable not found" });
    }
    res.status(200).json(serviceDeliverable);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching service deliverable", error });
  }
};

// Update a Service Deliverable by ID
const updateServiceDeliverable = async (req, res) => {
  try {
    const { id } = req.params;
    const { ox_service, name, description } = req.body;
    const updatedServiceDeliverable =
      await ServiceDeliverables.findByIdAndUpdate(
        id,
        { ox_service, name, description },
        { new: true, runValidators: true }
      );
    if (!updatedServiceDeliverable) {
      return res.status(404).json({ message: "Service deliverable not found" });
    }
    res.status(200).json(updatedServiceDeliverable);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating service deliverable", error });
  }
};

// Delete a Service Deliverable by ID
const deleteServiceDeliverable = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedServiceDeliverable =
      await ServiceDeliverables.findByIdAndDelete(id);
    if (!deletedServiceDeliverable) {
      return res.status(404).json({ message: "Service deliverable not found" });
    }
    res
      .status(200)
      .json({ message: "Service deliverable deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting service deliverable", error });
  }
};

export {
  addoxservice,
  DeleteOXservice,
  getAllOXservices,
  getSingleOXservice,
  updateOXservice,
  addOxPackages,
  getAllOXPackages,
  getSingleOXPackages,
  updateOXPackages,
  DeleteOXpackages,
  addOxServicesPackage,
  getAllOxServicesPackages,
  getOxServicesPackageById,
  updateOxServicesPackage,
  deleteOxServicesPackage,
  createServiceDeliverable,
  getAllServiceDeliverables,
  getServiceDeliverableById,
  deleteServiceDeliverable,
  updateServiceDeliverable,
};
