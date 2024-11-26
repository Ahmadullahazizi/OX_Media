import {
  deleteFileFromCloudnary,
  uploadFileOnCloudnary,
} from "../../helper/cloudnaryHelper.js";
import { Branch } from "../../models/growth/brachSchema.js";
import {
  agencyPackages,
  agencyServices,
  agencyServicesPackages,
  ServiceDeliverables,
 
} from "../../models/growth/agencyService&PackagesSchema.js";
import { Department, Division, Office } from "../../models/growth/agencyDept&PositionSchema.js";

//--------agency SERVICES----------

const addagencyservice = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    console.log("SOP file:", req.file);
    const {
      service_name,
      branch,
      related_office,
      related_dept,
      related_division,
      description,
      importance,
      status,
      ourWeakness,
      ourStrength,
      note,
      price_USD,
      discounted_price_USD,
      price_localcurrency,
      discounted_price_localcurrency,
      marketvalue_USD,
      marketvalue_localcurrency,
    } = req.body;
    const SOP_file = req.file?.fieldname;
    const SOP_filePath = req.file?.path;
    if (
      !service_name ||
      !importance ||
      !description ||
      !status ||
      !branch ||
      !related_office
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

    // Fetch the Branch
    const branchid = await Branch.findById(branch);
    if (!branchid) {
      return res
        .status(404)
        .send({ success: false, message: "Branch not found" });
    }
    // Fetch the Office
    const officeid = await Office.findById(related_office);
    if (!officeid) {
      return res
        .status(404)
        .send({ success: false, message: "Office not found" });
    }
     // Fetch the Dept
     const deptid = await Department.findById(related_dept);
     if (!deptid) {
       return res
         .status(404)
         .send({ success: false, message: "Department not found" });
     }
      // Fetch the Dept
      const divid = await Division.findById(related_division);
      if (!divid) {
        return res
          .status(404)
          .send({ success: false, message: "Division not found" });
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
    const Services = await agencyServices.create({
      service_name,
      branch: branchid,
      related_office: officeid,
      related_dept : deptid,
      related_division: divid,
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
      price_USD,
      discounted_price_USD,
      price_localcurrency,
      discounted_price_localcurrency,
      marketvalue_USD,
      marketvalue_localcurrency,
    });
    return res.status(201).send({
      success: true,
      message: "agency Service Created Successfully !!",
      Services,
    });
  } catch (error) {
    console.log(`failed to Add agency Service with Error - ${error}`);
    return res.status(400).send({
      success: false,
      message: "Failed to add agency Service",
      error: error.message,
    });
  }
};
//update Service
const updateagencyservice = async (req, res) => {
  try {
    const {
      service_name,
      description,
      branch,
      related_office,
      related_dept,
      related_division,
      importance,
      status,
      ourWeakness,
      ourStrength,
      note,
      price_USD,
      discounted_price_USD,
      price_localcurrency,
      discounted_price_localcurrency,
      marketvalue_USD,
      marketvalue_localcurrency,
    } = req.body;

    const SOP_filePath = req.file?.path;

    const { serviceID } = req.params;
    const service = await agencyServices.findById(serviceID);
    console.log(service);
    if (!service) {
      return res.status(401).send({
        success: false,
        message: "Service Not Found",
      });
    }
    //update any of the field that user update
    if (service_name) service.service_name = service_name;
    if (branch) service.branch = branch;
    if (related_office) service.related_office = related_office;
    if (related_dept) service.related_dept = related_dept;
    if (related_division) service.related_division = related_division;
    if (description) service.description = description;
    if (importance) service.importance = importance;
    if (status) service.status = status;
    if (ourWeakness) service.ourWeakness = ourWeakness;
    if (ourStrength) service.ourStrength = ourStrength;
    if (note) service.note = note;
    if (price_USD) service.price_USD = price_USD;
    if (price_localcurrency) service.price_localcurrency = price_localcurrency;
    if (discounted_price_USD) service.discounted_price_USD = discounted_price_USD;
    if (discounted_price_localcurrency) service.discounted_price_localcurrency = discounted_price_localcurrency;
    if (marketvalue_USD) service.marketvalue_USD = marketvalue_USD;
    if (marketvalue_localcurrency) service.marketvalue_localcurrency = marketvalue_localcurrency;


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
const getAllagencyservices = async (req, res) => {
  try {
    const service = await agencyServices.find({})
    .populate("branch" , "branch_name")
    .populate("related_office" , "name")
    .populate("related_dept" , "name")
    .populate("related_division" , "name");
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
const getSingleagencyservice = async (req, res) => {
  try {
    const { serviceID } = req.params;
    console.log(serviceID);
    const service = await agencyServices.findById(serviceID);
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
const Deleteagencyservice = async (req, res) => {
  try {
    const { serviceID } = req.params;
    console.log(serviceID);
    const service = await agencyServices.findById(serviceID);
    if (!service) {
      return res
        .status(404)
        .send({ success: false, message: "Service not Found" });
    }

    await agencyServices.findByIdAndDelete(serviceID);

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

//--------agency PACKAGES----------

const addagencyPackages = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    const {
      branch,
      pkg_name,
      description,
      duration,
      status,
      eligibility,
      suitablefor,
      price_USD,
      discounted_price_USD,
      price_localcurrency,
      discounted_price_localcurrency,
      marketvalue_USD,
      marketvalue_localcurrency,
    } = req.body;

    if (
      !branch ||
      !pkg_name ||
      !duration ||
      !description ||
      !status 
     
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
    const newPackage = await agencyPackages.create({
      branch: branchid,
      pkg_name,
      description,
      status,
      eligibility,
      suitablefor,
      price_USD,
      discounted_price_USD,
      price_localcurrency,
      discounted_price_localcurrency,
      marketvalue_USD,
      marketvalue_localcurrency,
      duration, //already in days
    });

    return res.status(201).send({
      success: true,
      message: "agency Package Created Successfully !!",
      newPackage,
    });
  } catch (error) {
    console.log(`failed to Add agency Package with Error - ${error}`);
    return res.status(400).send({
      success: false,
      message: "Failed to add agency Package",
      error: error,
    });
  }
};
//update Service
const updateagencyPackages = async (req, res) => {
  try {
    const {
      pkg_name,
      description,
      duration,
      status,
      eligibility,
      price_USD,
      discounted_price_USD,
      price_localcurrency,
      discounted_price_localcurrency,
      marketvalue_USD,
      marketvalue_localcurrency,
    } = req.body;
    const { packageID } = req.params;
    const Package = await agencyPackages.findById(packageID);
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
    if (price_USD) service.price_USD = price_USD;
    if (price_localcurrency) service.price_localcurrency = price_localcurrency;
    if (discounted_price_USD) service.discounted_price_USD = discounted_price_USD;
    if (discounted_price_localcurrency) service.discounted_price_localcurrency = discounted_price_localcurrency;
    if (marketvalue_USD) service.marketvalue_USD = marketvalue_USD;
    if (marketvalue_localcurrency) service.marketvalue_localcurrency = marketvalue_localcurrency;

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
const getAllagencyPackages = async (req, res) => {
  try {
    const Package = await agencyPackages.find({});
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
const getSingleagencyPackages = async (req, res) => {
  try {
    const { packageID } = req.params;
    console.log(packageID);
    const Package = await agencyPackages.findById(packageID);
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
const Deleteagencypackages = async (req, res) => {
  try {
    const { packageID } = req.params;
    console.log(packageID);
    const Package = await agencyPackages.findById(packageID);
    if (!Package) {
      return res
        .status(404)
        .send({ success: false, message: "Package not Found" });
    }

    await agencyPackages.findByIdAndDelete(packageID);

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

/////---------- SERVICES TO PACKAGES-----------
// Create agency Services Package with Validation
const addagencyServicesPackage = async (req, res) => {
  try {
    const { agency_service, agencypkg, serviceDeliverables, description, info, condition, durationInDays } = req.body;

    // Validate required fields
    if (!agency_service || !agencypkg) {
      return res.status(400).json({
        success: false,
        message: "agency Service and agency Package are required",
      });
    }

    // Check if the referenced agency Service exists
    const serviceExists = await agencyServices.findById(agency_service);
    if (!serviceExists) {
      return res.status(404).json({
        success: false,
        message: "agency Service not found",
      });
    }

    // Check if the referenced agency Package exists
    const packageExists = await agencyPackages.findById(agencypkg);
    if (!packageExists) {
      return res.status(404).json({
        success: false,
        message: "agency Package not found",
      });
    }

    // Check if the referenced agency Service exists
    const servicedeliverables = await ServiceDeliverables.findById(serviceDeliverables);
    if (!servicedeliverables) {
      return res.status(404).json({
        success: false,
        message: "servicedeliverables not found",
      });
    }

    // Create the new entry
    const newServicePackage = await agencyServicesPackages.create({
      agency_service,
      agencypkg,
      description,
      info, 
      condition,
      serviceDeliverables,
      durationInDays
    });

    return res.status(201).json({
      success: true,
      message: "agency Services Package created successfully",
      data: newServicePackage,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create agency Services Package",
      error: error.message,
    });
  }
};

// Get All agency Services Packages
const getAllagencyServicesPackages = async (req, res) => {
  try {
    const servicePackages = await agencyServicesPackages.find()
      .populate("agency_service" , "service_name") // Populating the referenced services
      .populate("agencypkg" , "pkg_name")
      .populate("serviceDeliverables", "name"); // Populating the referenced packages

    return res.status(200).json({
      success: true,
      data: servicePackages,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve agency Services Packages",
      error: error.message,
    });
  }
};

// Get agency Services Package by ID
const getagencyServicesPackageById = async (req, res) => {
  try {
    const { id } = req.params;
    const servicePackage = await agencyServicesPackages.findById(id)
    .populate("agency_service" , "service_name") // Populating the referenced services
    .populate("agencypkg" , "pkg_name")
    .populate("serviceDeliverables", "name"); // Populating the referenced packages

    if (!servicePackage) {
      return res.status(404).json({
        success: false,
        message: "agency Services Package not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: servicePackage,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve agency Services Package",
      error: error.message,
    });
  }
};

// Update agency Services Package by ID with Validation
const updateagencyServicesPackage = async (req, res) => {
  try {
    const { id } = req.params;
    const { agency_service, agencypkg, serviceDeliverable, description, status, durationInDays } = req.body;

    // Check if agency Service exists if it's being updated
    if (agency_service) {
      const serviceExists = await agencyServices.findById(agency_service);
      if (!serviceExists) {
        return res.status(404).json({
          success: false,
          message: "agency Service not found",
        });
      }
    }

    // Check if agency Package exists if it's being updated
    if (agencypkg) {
      const packageExists = await agencyPackages.findById(agencypkg);
      if (!packageExists) {
        return res.status(404).json({
          success: false,
          message: "agency Package not found",
        });
      }
    }

    
    // Check if Deliverables exists if it's being updated
    if (serviceDeliverable) {
      const ServiceDeliverable = await ServiceDeliverables.findById(serviceDeliverable);
      if (!ServiceDeliverable) {
        return res.status(404).json({
          success: false,
          message: "ServiceDeliverable not found",
        });
      }
    }

    // Update the package
    const updatedPackage = await agencyServicesPackages.findByIdAndUpdate(
      id,
      { agency_service, agencypkg, description, status , durationInDays, serviceDeliverable },
      { new: true, runValidators: true }
    );

    if (!updatedPackage) {
      return res.status(404).json({
        success: false,
        message: "agency Services Package not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "agency Services Package updated successfully",
      data: updatedPackage,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update agency Services Package",
      error: error.message,
    });
  }
};

// Delete agency Services Package by ID
const deleteagencyServicesPackage = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPackage = await agencyServicesPackages.findByIdAndDelete(id);

    if (!deletedPackage) {
      return res.status(404).json({
        success: false,
        message: "agency Services Package not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "agency Services Package deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete agency Services Package",
      error: error.message,
    });
  }
};

//----------SERVICES DELIVERABLE----------
// Create a new Service Deliverableagency
const createServiceDeliverable = async (req, res) => {
  try {
    const { agency_service, name, description } = req.body;
    console.log(req.body);
    // Validate required fields
    if (!agency_service) {
      return res.status(400).json({
        success: false,
        message: "agency Service required",
      });
    }

    // Check if the referenced agency Service exists
    const serviceExists = await agencyServices.findById(agency_service);
    if (!serviceExists) {
      return res.status(404).json({
        success: false,
        message: "agency Service not found",
      });
    }

    // Create the new entry
    const newDeliverable = await ServiceDeliverables.create({
      agency_service: serviceExists,
      name,
      description,
    });

    return res.status(201).json({
      success: true,
      message: "agency Services Deliverable created successfully",
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
      "agency_service"
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
      "agency_service"
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
    const { agency_service, name, description } = req.body;
    const updatedServiceDeliverable =
      await ServiceDeliverables.findByIdAndUpdate(
        id,
        { agency_service, name, description },
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


//----------SERVICES DELIVERABLE----------
// Create a new Service Deliverableagency
// const createServicepkgDeliverable = async (req, res) => {
//   try {
//     const { agency_sp, description } = req.body;
//     console.log(req.body);
//     // Validate required fields
//     if (!agency_sp) {
//       return res.status(400).json({
//         success: false,
//         message: "agency Service pkg required",
//       });
//     }

//     // Check if the referenced agency Service exists
//     const spExists = await agencyServicesPackages.findById(agency_sp);
//     if (!spExists) {
//       return res.status(404).json({
//         success: false,
//         message: "agency Service PKG not found",
//       });
//     }

//     // Create the new entry
//     const newDeliverable = await ServicePKGDeliverables.create({
//       agency_sp: spExists,
//       description,
//     });

//     return res.status(201).json({
//       success: true,
//       message: "agency Services Deliverable created successfully",
//       data: newDeliverable,
//     });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error creating service deliverable", error });
//   }
// };

// // Get all Service pkg Deliverables
// const getAllServicepkgDeliverables = async (req, res) => {
//   try {
//     const servicepkgDeliverables = await ServicePKGDeliverables.find().populate(
//       "agency_sp"
//     );
//     res.status(200).json(servicepkgDeliverables);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error fetching service pkg deliverables", error });
//   }
// };

// // Get a single Service Deliverable by ID
// const getServicepkgDeliverableById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const servicepkgDeliverable = await ServicePKGDeliverables.findById(id).populate(
//       "agency_sp"
//     );
//     if (!servicepkgDeliverable) {
//       return res.status(404).json({ message: "Service deliverable not found" });
//     }
//     res.status(200).json(servicepkgDeliverable);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error fetching service deliverable", error });
//   }
// };

// // Update a Service Deliverable by ID
// const updateServicepkgDeliverable = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { agency_sp, description } = req.body;
//     const updatedServicepkgDeliverable =
//       await ServicePKGDeliverables.findByIdAndUpdate(
//         id,
//         { agency_sp, name, description },
//         { new: true, runValidators: true }
//       );
//     if (!updatedServicepkgDeliverable) {
//       return res.status(404).json({ message: "Service deliverable not found" });
//     }
//     res.status(200).json(updatedServicepkgDeliverable);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error updating service deliverable", error });
//   }
// };

// // Delete a Service Deliverable by ID
// const deleteServicepkgDeliverable = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deletedServicepkgDeliverable =
//       await ServicePKGDeliverables.findByIdAndDelete(id);
//     if (!deletedServicepkgDeliverable) {
//       return res.status(404).json({ message: "Service PKG deliverable not found" });
//     }
//     res
//       .status(200)
//       .json({ message: "Service PKG deliverable deleted successfully" });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error deleting service PKG deliverable", error });
//   }
// };

export {
  addagencyservice,
  Deleteagencyservice,
  getAllagencyservices,
  getSingleagencyservice,
  updateagencyservice,
  addagencyPackages,
  getAllagencyPackages,
  getSingleagencyPackages,
  updateagencyPackages,
  Deleteagencypackages,
  addagencyServicesPackage,
  getAllagencyServicesPackages,
  getagencyServicesPackageById,
  updateagencyServicesPackage,
  deleteagencyServicesPackage,
  createServiceDeliverable,
  getAllServiceDeliverables,
  getServiceDeliverableById,
  deleteServiceDeliverable,
  updateServiceDeliverable,

};
