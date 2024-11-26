import {
  deleteFileFromCloudnary,
  uploadFileOnCloudnary,
} from "../../helper/cloudnaryHelper.js";
import { Branch } from "../../models/growth/brachSchema.js";
import {
  Niche,
  SubNiche,
  SubNicheService,
  subNicheSubService,
} from "../../models/growth/nichSchema.js";

// ---------NICHE -----
//Add a new Niche
const addNiche = async (req, res) => {
  try {
    const { name, branch, description } = req.body;
    const research_file = req.file?.fieldname;
    const research_filePath = req.file?.path;

    if (!name || !branch || !description) {
      return res
        .status(400)
        .send({ success: false, message: "All field required" });
    }
    // Fetch the Branch
    const branchid = await Branch.findById(branch);

    if (!branchid) {
      return res
        .status(404)
        .send({ success: false, message: "BRanch not found" });
    }
    console.log("Branch found:", branchid._id);

    //Uploading file on Cloudnary
    const { secure_url, public_id } = await uploadFileOnCloudnary(
      research_filePath,
      "research_file"
    );
    if (!secure_url) {
      return res.status(400).send({
        success: false,
        message: "Error While Uploading File",
      });
    }

    const niche = await Niche.create({
      name,
      branch: branchid._id,
      description,
      research_file: {
        secure_url,
        public_id,
      },
    });
    return res.status(201).send({
      success: true,
      message: "Niche Created Successfully !!",
      niche,
    });
  } catch (error) {
    console.log(`fail to Add Niche with Error - ${error}`);
    return res.status(400).send({
      success: false,
      message: "Failed to add Niche",
      error: "Error message explaining the issue",
    });
  }
};
//Get all niches
const getAllNiche = async (req, res) => {
  try {
    const niches = await Niche.find({});
    return res.status(200).send({
      success: true,
      totle: niches.length,
      message: "Niche Data Fetch",
      niches,
    });
  } catch (error) {
    console.log(`getAllNiche failled Error - ${error}`);
    return res.status(400).send({
      success: false,
      message: "Failled to get Niche Data",
    });
  }
};
//Get Single niche detail
const getSingleNiche = async (req, res) => {
  try {
    const { nicheid } = req.params;
    console.log(nicheid);
    const niche = await Niche.findById(nicheid);
    console.log(niche);
    if (!niche) {
      return res
        .status(404)
        .send({ success: false, message: "Niche not Found" });
    }
    //Success Respose when new category added to DB
    return res.status(201).send({
      success: true,
      message: "Niche Fetch SucessFully",
      niche,
    });
  } catch (error) {
    console.log(`GetSingleNiche failled Error - ${error}`);
    return res.status(400).send({
      success: false,
      message: "GetSingleNiche Controller Failled",
    });
  }
};
//update niche
const updateNiche = async (req, res) => {
  try {
    const { name, description } = req.body;
    const { nicheid } = req.params;
    const research_filePath = req.file?.path;

    const niche = await Niche.findById(nicheid);
    console.log(niche);
    if (!niche) {
      return res.status(401).send({
        success: false,
        message: "Niche Not Found",
      });
    }
    //update any of the field that user update
    if (name) niche.name = name;
    if (description) niche.description = description;
    //upload new manager file on cloudinary
    if (research_filePath) {
      const { secure_url, public_id } = await uploadFileOnCloudnary(
        research_filePath,
        "research_file"
      );
      // delete File from Cloudinary
      if (niche.research_file && niche.research_file.public_id) {
        await deleteFileFromCloudnary(niche.research_file.public_id);
      }
      niche.research_file = {
        secure_url,
        public_id,
      };
    }

    await niche.save();
    return res.status(200).send({
      success: true,
      message: "niche Details Updated",
    });
  } catch (error) {
    console.log(`Update niche Controller failled Error - ${error}`);
    return res.status(400).send({
      success: false,
      message: "Error While Updating niche details",
    });
  }
};
//Delete niche
const deleteNiche = async (req, res) => {
  try {
    const { nicheid } = req.params;
    console.log(nicheid);
    const niche = await Niche.findById(nicheid);
    if (!niche) {
      return res
        .status(404)
        .send({ success: false, message: "Niche not Found" });
    }
    // delete File from cloudany
    if (niche.research_file && niche.research_file.public_id) {
      await deleteFileFromCloudnary(niche.research_file.public_id);
    }

    await Niche.findByIdAndDelete(nicheid);

    return res.status(200).send({
      success: true,
      message: "Niche Deleted Successfully",
    });
  } catch (error) {
    console.log(`Delete Niche Controller failled Error - ${error}`);
    return res.status(400).send({
      success: false,
      message: "Unable to delete data",
    });
  }
};

// --------- SUB NICHE -----
//Add a new sub Niche
const addSubNiche = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    console.log("Research file:", req.file);
    const {
      niche,
      name,
      description,
      target_audience,
      market_trend,
      preferred_platform,
      ideal_social_media_link,
    } = req.body;
    const research_file = req.file?.fieldname;
    const research_filePath = req.file?.path;
    if (
      !name ||
      !niche ||
      !description ||
      !target_audience ||
      !market_trend ||
      !preferred_platform ||
      !ideal_social_media_link
    ) {
      return res
        .status(400)
        .send({ success: false, message: "All field required" });
    }
    // Fetch the subniche
    const nicheid = await Niche.findById(niche);

    if (!nicheid) {
      return res
        .status(404)
        .send({ success: false, message: "Nicheid not found" });
    }
    console.log("Niche found:", nicheid._id);

    //Uploading file on Cloudnary
    const { secure_url, public_id } = await uploadFileOnCloudnary(
      research_filePath,
      "research_file"
    );
    if (!secure_url) {
      return res.status(400).send({
        success: false,
        message: "Error While Uploading File",
      });
    }
    const subniche = await SubNiche.create({
      name,
      niche: nicheid._id,
      description,
      target_audience,
      market_trend,
      preferred_platform,
      ideal_social_media_link,
      research_file: {
        secure_url,
        public_id,
      },
    });
    return res.status(201).send({
      success: true,
      message: "Sub niche Created Successfully !!",
      subniche,
    });
  } catch (error) {
    console.log(`failed to Add Sub niche with Error - ${error}`);
    return res.status(400).send({
      success: false,
      message: "Failed to add Sub niche",
      error: error.message,
    });
  }
};
//Get All sub niche detail
const getAllSubNiche = async (req, res) => {
  try {
    const subNiche = await SubNiche.find({});
    return res.status(200).send({
      success: true,
      total: subNiche.length,
      message: "subNiche Data Fetch",
      subNiche,
    });
  } catch (error) {
    console.log(`getAllsubNiche failled Error - ${error}`);
    return res.status(400).send({
      success: false,
      message: "Failled to get subNiche Data",
    });
  }
};
//Get Single sub niche detail
const getSingleSubNiche = async (req, res) => {
  try {
    const { subid } = req.params;
    console.log(subid);
    const subniche = await SubNiche.findById(subid);
    console.log(subniche);
    if (!subniche) {
      return res
        .status(404)
        .send({ success: false, message: "Sub niche not Found" });
    }

    return res.status(201).send({
      success: true,
      message: "Sub niche Fetch SucessFully",
      subniche,
    });
  } catch (error) {
    console.log(`Sub niche Controller failled Error - ${error}`);
    return res.status(400).send({
      success: false,
      message: " Getting Single subNiche Failled",
    });
  }
};
//update a sub niche
const updatesubNiche = async (req, res) => {
  try {
    const { subid } = req.params;
    console.log(req.body);
    const {
      name,
      description,
      target_audience,
      market_trend,
      preferred_platform,
      ideal_social_media_link,
    } = req.body;

    const research_filePath = req.file?.path;

    const subNiche = await SubNiche.findById(subid);
    console.log(subNiche);
    if (!subNiche) {
      return res.status(401).send({
        success: false,
        message: "SubNiche Not Found",
      });
    }
    //update any of the field that user update
    if (name) subNiche.name = name;
    if (description) subNiche.description = description;
    if (target_audience) subNiche.target_audience = target_audience;
    if (market_trend) subNiche.market_trend = market_trend;
    if (preferred_platform) subNiche.preferred_platform = preferred_platform;
    if (ideal_social_media_link)
      subNiche.ideal_social_media_link = ideal_social_media_link;
    console.log(name);
    //upload new manager file on cloudinary
    if (research_filePath) {
      const { secure_url, public_id } = await uploadFileOnCloudnary(
        contract_filePath,
        "research_file"
      );
      // delete File from Cloudinary
      if (subNiche.research_file && subNiche.research_file.public_id) {
        await deleteFileFromCloudnary(subNiche.research_file.public_id);
      }
      subNiche.research_file = {
        secure_url,
        public_id,
      };
    }
    await subNiche.save();

    return res.status(200).send({
      success: true,
      message: "Sub niche Details Updated",
      subNiche,
    });
  } catch (error) {
    console.log(`Update Sub niche Controller failled Error - ${error}`);
    return res.status(400).send({
      success: false,
      message: "Error While Updating Sub niche details",
    });
  }
};

//Delete sub niche
const deleteSubNiche = async (req, res) => {
  try {
    const { subid } = req.params;
    console.log(subid);
    const subNiche = await SubNiche.findById(subid);
    if (!subNiche) {
      return res
        .status(404)
        .send({ success: false, message: "subNiche not Found" });
    }
    // delete File from cloudany
    if (subNiche.research_file && subNiche.research_file.public_id) {
      await deleteFileFromCloudnary(subNiche.research_file.public_id);
    }

    await SubNiche.findByIdAndDelete(subid);

    return res.status(200).send({
      success: true,
      message: "SubNiche Deleted Successfully",
    });
  } catch (error) {
    console.log(`SubNiche Delete Controller failled Error - ${error}`);
    return res.status(400).send({
      success: false,
      message: "Unable to delete data",
    });
  }
};

// --------- SUB NICHE SERVICES-----

//Add a new services
const addservice = async (req, res) => {
  try {
    const {
      service_name,
      description,
      name_in_local_language,
      description_in_local_language,
      subniche,
    } = req.body;

    if (!service_name || !subniche) {
      return res.status(400).send({
        success: false,
        message: "service_name & subniche field required",
      });
    }
    // Fetch the subniche
    const subnicheid = await SubNiche.findById(subniche);
    if (!subnicheid) {
      return res
        .status(404)
        .send({ success: false, message: "Subniche not found" });
    }
    const Service = await SubNicheService.create({
      service_name,
      description,
      name_in_local_language,
      description_in_local_language,
      subniche: subnicheid,
    });
    return res.status(201).send({
      success: true,
      message: "Sub niche Service Created Successfully !!",
      Service,
    });
  } catch (error) {
    console.log(`fail to Add Service with Error - ${error}`);
    return res.status(400).send({
      success: false,
      message: "Failed to add Service",
      error: "Error message explaining the issue",
    });
  }
};
//Get all services
const getAllservices = async (req, res) => {
  try {
    const Services = await SubNicheService.find({});
    return res.status(200).send({
      success: true,
      totle: Services.length,
      message: "Services Data Fetch",
      Services,
    });
  } catch (error) {
    console.log(`getAllservices failled Error - ${error}`);
    return res.status(400).send({
      success: false,
      message: "Failled to get Services Data",
    });
  }
};
//this controller get all services on the bases of sub niche id
const getAllSubNicheservices = async (req, res) => {
  try {
    const { subid } = req.params;
    const Services = await SubNicheService.find({ subniche: subid });
    if (!Services || Services.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No services found for this sub-niche",
      });
    }
    return res.status(200).send({
      success: true,
      totle: Services.length,
      message: "Services Data Fetch",
      Services,
    });
  } catch (error) {
    console.log(`getAllservices failled Error - ${error}`);
    return res.status(400).send({
      success: false,
      message: "Failled to get Services Data",
    });
  }
};

//Get Single services detail
const getSingleService = async (req, res) => {
  try {
    const { serviceid } = req.params;
    console.log(serviceid);
    const service = await SubNicheService.findById(serviceid);
    console.log(service);
    if (!service) {
      return res
        .status(404)
        .send({ success: false, message: "Service not Found" });
    }
    //Success Respose when new category added to DB
    return res.status(201).send({
      success: true,
      message: "Service Fetch SucessFully",
      service,
    });
  } catch (error) {
    console.log(`getSingleService failled Error - ${error}`);
    return res.status(400).send({
      success: false,
      message: "getSingleService Controller Failled",
    });
  }
};

//update services
const updateSubNicheService = async (req, res) => {
  try {
    const {
      service_name,
      description,
      name_in_local_language,
      description_in_local_language,
      subniche,
    } = req.body;
    const { serviceid } = req.params;
    console.log(serviceid);

    const service = await SubNicheService.findById(serviceid);
    console.log(service);
    if (!service) {
      return res.status(401).send({
        success: false,
        message: "service Not Found",
      });
    }
    //update any of the field that user update
    if (service_name) service.service_name = service_name;
    if (description) service.description = description;
    if (name_in_local_language)
      service.name_in_local_language = name_in_local_language;
    if (description_in_local_language)
      service.description_in_local_language = description_in_local_language;
    if (subniche) service.subniche = subniche;

    await service.save();
    return res.status(200).send({
      success: true,
      message: "Service Details Updated",
    });
  } catch (error) {
    console.log(`Update Service Controller failled Error - ${error}`);
    return res.status(400).send({
      success: false,
      message: "Error While Updating Service details",
    });
  }
};

//Delete Sub niche Services
const deleteService = async (req, res) => {
  try {
    const { serviceid } = req.params;
    console.log(serviceid);
    const service = await SubNicheService.findById(serviceid);
    if (!service) {
      return res
        .status(404)
        .send({ success: false, message: "Service not Found" });
    }

    await SubNicheService.findByIdAndDelete(serviceid);

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

//Add a new services
const addSubservice = async (req, res) => {
  try {
    const {
      service_name,
      description,
      name_in_local_language,
      description_in_local_language,
      service,
    } = req.body;

    if (!service_name || !service) {
      return res.status(400).send({
        success: false,
        message: "All field are required",
      });
    }
    // Fetch the subniche
    const serviceid = await SubNicheService.findById(service);
    if (!serviceid) {
      return res
        .status(404)
        .send({ success: false, message: "Service not found" });
    }
    const SubService = await subNicheSubService.create({
      service_name,
      description,
      name_in_local_language,
      description_in_local_language,
      service: serviceid,
    });
    return res.status(201).send({
      success: true,
      message: "Sub Service Created Successfully !!",
      SubService,
    });
  } catch (error) {
    console.log(`fail to Add SubService with Error - ${error}`);
    return res.status(400).send({
      success: false,
      message: "Failed to add SubService",
      error: "Error message explaining the issue",
    });
  }
};
//Get all services
const getAllSubservices = async (req, res) => {
  try {
    const Services = await subNicheSubService.find({});
    return res.status(200).send({
      success: true,
      totle: Services.length,
      message: "Services Data Fetch",
      Services,
    });
  } catch (error) {
    console.log(`getAllservices failled Error - ${error}`);
    return res.status(400).send({
      success: false,
      message: "Failled to get Services Data",
    });
  }
};
//this controller get all services on the bases of sub niche id
const getSingleSubNicheSubservices = async (req, res) => {
  try {
    const { serid } = req.params;
    const SubServices = await subNicheSubService.findById(serid);
    if (!SubServices || SubServices.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No Sub services found for this sub-niche",
      });
    }
    return res.status(200).send({
      success: true,
      totle: SubServices.length,
      message: "Sub Services Data Fetch",
      SubServices,
    });
  } catch (error) {
    console.log(`getSignleSubservices failled Error - ${error}`);
    return res.status(400).send({
      success: false,
      message: "Failled to get Sub Services Data",
    });
  }
};

//Get Single services detail
const getServicesofSingleService = async (req, res) => {
  try {
    const { serid } = req.params;
    const Service = await subNicheSubService.find({ service : serid });
    console.log(Service)
    if (!Service || Service.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No Subservices found for this Service",
      });
    }
    return res.status(200).send({
      success: true,
      totle: Service.length,
      message: "Services Data Fetch",
      Service,
    });
  } catch (error) {
    console.log(`getAllservicesforSingle Service failled Error - ${error}`);
    return res.status(400).send({
      success: false,
      message: "Failled to get Services Data",
    });
  }
};

//update services
const updateSubNicheSubService = async (req, res) => {
  try {
    const {
      service_name,
      description,
      name_in_local_language,
      description_in_local_language,
      subniche,
    } = req.body;
    const { serid } = req.params;
    console.log(serid);

    const service = await subNicheSubService.findById(serid);
    console.log(service);
    if (!service) {
      return res.status(401).send({
        success: false,
        message: "subservice Not Found",
      });
    }
    //update any of the field that user update
    if (service_name) service.service_name = service_name;
    if (description) service.description = description;
    if (name_in_local_language)
      service.name_in_local_language = name_in_local_language;
    if (description_in_local_language)
      service.description_in_local_language = description_in_local_language;
    if (subniche) service.subniche = subniche;

    await service.save();
    return res.status(200).send({
      success: true,
      message: "SubService Details Updated",
    });
  } catch (error) {
    console.log(`Update SubService Controller failled Error - ${error}`);
    return res.status(400).send({
      success: false,
      message: "Error While Updating SubService details",
    });
  }
};

//Delete Sub niche Services
const deleteSubService = async (req, res) => {
  try {
    const { serid } = req.params;
    console.log(serid);
    const Subservice = await subNicheSubService.findById(serid);
    if (!Subservice) {
      return res
        .status(404)
        .send({ success: false, message: "SubService not Found" });
    }

    await subNicheSubService.findByIdAndDelete(serid);

    return res.status(200).send({
      success: true,
      message: "Sub Service Deleted Successfully",
    });
  } catch (error) {
    console.log(`Delete sub service Controller failled Error - ${error}`);
    return res.status(400).send({
      success: false,
      message: "Unable to delete data",
    });
  }
};



export {
  addNiche,
  getAllNiche,
  getSingleNiche,
  updateNiche,
  deleteNiche,
  addSubNiche,
  getAllSubNiche,
  getSingleSubNiche,
  updatesubNiche,
  deleteSubNiche,
  addservice,
  getAllservices,
  getAllSubNicheservices,
  getSingleService,
  updateSubNicheService,
  deleteService,
  addSubservice,
  getSingleSubNicheSubservices,
  getAllSubservices,
  updateSubNicheSubService,
  deleteSubService,
  getServicesofSingleService,
};
