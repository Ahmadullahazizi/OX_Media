import { deleteFileFromCloudnary, uploadFileOnCloudnary } from "../../helper/cloudnaryHelper.js";
import { SubNiche, PostType, PostTypeSample, ReelType, ReelTypeSample, TechnologyType, WebsiteSample, AdsSample, LandingPage,Keyword } from "../../models/growth/nichSchema.js";

// ---------POST TYPE -----
//Add a new Post type
const addPostType = async (req, res) => {
  try {
    const { type_name, description, importance_level, subniche } = req.body;
    // Check if all required fields are provided
    if (!type_name || !description || !importance_level || !subniche) {
      return res.status(400).send({
        success: false,
        message: "All fields are required",
      });
    }
    // Verify that the importance_level is valid
    const validLevels = ["high", "med", "low"];
    if (!validLevels.includes(importance_level)) {
      return res.status(400).send({
        success: false,
        message: "Invalid importance level",
      });
    }

     // Fetch the subniche
     const subnicheid = await SubNiche.findById(subniche);
     if (!subnicheid) {
       return res
         .status(404)
         .send({ success: false, message: "Subniche not found" });
     }

    const posttype = await PostType.create({
      type_name,
      description,
      importance_level,
      subniche: subnicheid
    });
    return res.status(201).send({
      success: true,
      message: "Posttype Created Successfully !!",
      posttype,
    });
  } catch (error) {
    console.log(`fail to Add posttype with Error - ${error}`);
    return res.status(400).send({
      success: false,
      message: "Failed to add posttype",
      error: "Error message explaining the issue",
    });
  }
};
//update post type
const UpdatePostType = async (req, res) => {
  try {
    const { type_name, description, importance_level, subniche } = req.body;
    const { ptypeid } = req.params;
    const ptype = await PostType.findById(ptypeid);
    console.log(ptype);
    if (!ptype) {
      return res.status(401).send({
        success: false,
        message: "Post Type Not Found",
      });
    }
    //update any of the field that user update
    if (type_name) ptype.type_name = type_name;
    if (description) ptype.description = description;
    if (importance_level) ptype.importance_level = importance_level;
    if (subniche) ptype.subniche = subniche;

    await ptype.save();
    return res.status(200).send({
      success: true,
      message: "Post Type Details Updated",
    });
  } catch (error) {
    console.log(`Update Post Type Controller failled Error - ${error}`);
    return res.status(400).send({
      success: false,
      message: "Error While Updating Post Type details",
    });
  }
};
//Get all Post types
const getAllPostType = async (req, res) => {
  try {
    const posttype = await PostType.find({});
    return res.status(200).send({
      success: true,
      total: posttype.length,
      message: "AllPost Type Fetch",
      posttype,
    });
  } catch (error) {
    console.log(`getAllPostType failled Error - ${error}`);
    return res.status(400).send({
      success: false,
      message: "Failled to get Post types ",
    });
  }
};
//Get Single post type detail
const getSinglePostType = async (req, res) => {
  try {
    const { ptypeid } = req.params;
    console.log(ptypeid);
    const ptype = await PostType.findById(ptypeid);
    console.log(ptype);
    if (!ptype) {
      return res
        .status(404)
        .send({ success: false, message: "PostType not Found" });
    }
    //Success Respose when new category added to DB
    return res.status(201).send({
      success: true,
      message: "PostType Fetch SucessFully",
      ptype,
    });
  } catch (error) {
    console.log(`getSinglePostType failled Error - ${error}`);
    return res.status(400).send({
      success: false,
      message: "getSinglePostType Controller Failled",
    });
  }
};
//Delete post type
const DeletePostType = async (req, res) => {
  try {
    const { ptypeid } = req.params;
    console.log(ptypeid);
    const ptype = await PostType.findById(ptypeid);
    if (!ptype) {
      return res
        .status(404)
        .send({ success: false, message: "Post Type not Found" });
    }

    await PostType.findByIdAndDelete(ptypeid);

    return res.status(200).send({
      success: true,
      message: "Post Type Deleted Successfully",
    });
  } catch (error) {
    console.log(`Delete Post Type Controller failled Error - ${error}`);
    return res.status(400).send({
      success: false,
      message: "Unable to delete data",
    });
  }
};

//----------- POST SAMPLE -----------
//Add a new post type sample
const addPostTypeSample = async (req, res) => {
  try {
    console.log(req.body)
    const {
      name,
      description,
      postid,
    } = req.body;
    const media_file = req.file?.fieldname;
    const media_filePath = req.file?.path;

    if (!name || !postid || !media_file) {
      return res
        .status(400)
        .send({
          success: false,
          message: "All field required",
        });
    }
    // Fetch the subniche
    const posttypeid = await PostType.findById(postid);
    if (!posttypeid) {
      return res
        .status(404)
        .send({ success: false, message: "Posttype not found" });
    }
    //Uploading file on Cloudnary
    const { secure_url, public_id } = await uploadFileOnCloudnary(
      media_filePath,
      "media_file"
    );
    if (!secure_url) {
      return res.status(400).send({
        success: false,
        message: "Error While Uploading File",
      });
    }

    const ptype_Sample = await PostTypeSample.create({
      name,
      description,
      media_file: {
        secure_url,
        public_id,
      },
      postid: posttypeid,
    });
    return res.status(201).send({
      success: true,
      message: "Post Type Sample Successfully !!",
      ptype_Sample,
    });
  } catch (error) {
    console.log(`fail to Add Sample with Error - ${error}`);
    return res.status(400).send({
      success: false,
      message: "Failed to add Sample",
      error: "Error message explaining the issue",
    });
  }
};
//update a post sample
const updatePostTypeSample = async (req, res) => {
  try {
    const { sampleid } = req.params;
    console.log(req.body);
    const {
      name,
      description,
      postid,
    } = req.body;

    const media_filePath = req.file?.path;

    const Posttypesample = await PostTypeSample.findById(sampleid);
    console.log(Posttypesample);
    if (!Posttypesample) {
      return res.status(401).send({
        success: false,
        message: "Posttype Sample Not Found",
      });
    }
    //update any of the field that user update
    if (name) Posttypesample.name = name;
    if (description) Posttypesample.description = description;
    if (postid) Posttypesample.postid = postid;

    //upload new manager file on cloudinary
    if (media_filePath) {
      const { secure_url, public_id } = await uploadFileOnCloudnary(
        media_filePath,
        "media_file"
      );
      // delete File from Cloudinary
      if (Posttypesample.media_file && Posttypesample.media_file.public_id) {
        await deleteFileFromCloudnary(Posttypesample.media_file.public_id);
      }
      Posttypesample.media_file = {
        secure_url,
        public_id,
      };
    }
    await Posttypesample.save();

    return res.status(200).send({
      success: true,
      message: "PostType sample Updated",
      Posttypesample,
    });
  } catch (error) {
    console.log(`Update PostType sample controller failled Error - ${error}`);
    return res.status(400).send({
      success: false,
      message: "Error While UpdatingPostType sample details",
    });
  }
};
//Get All Post type samples
const getAllPtypeSample = async (req, res) => {
  try {
    const Samples = await PostTypeSample.find({});
    return res.status(200).send({
      success: true,
      total: Samples.length,
      message: "Post type Samples Fetched",
      Samples,
    });
  } catch (error) {
    console.log(`getAllPtypeSample failled Error - ${error}`);
    return res.status(400).send({
      success: false,
      message: "Failled to get Post type Sample Data",
    });
  }
};
//Get Single post detail
const getSinglePostTypeSample = async (req, res) => {
  try {
    const { sampleid } = req.params;
    console.log(sampleid);
    const sample = await PostTypeSample.findById(sampleid);
    console.log(sample);
    if (!sample) {
      return res
        .status(404)
        .send({ success: false, message: "Post sample not Found" });
    }
    //Success Respose when new category added to DB
    return res.status(201).send({
      success: true,
      message: "Post sample Fetch SucessFully",
      sample,
    });
  } catch (error) {
    console.log(`getSinglePostTypeSample failled Error - ${error}`);
    return res.status(400).send({
      success: false,
      message: "getSinglePostTypeSample Controller Failled",
    });
  }
};
//Delete post sample
const deletePostTypeSample = async (req, res) => {
  try {
    const { sampleid } = req.params;
    console.log(sampleid);
    const sample = await PostTypeSample.findById(sampleid);
    if (!sample) {
      return res
        .status(404)
        .send({ success: false, message: "Sample not Found" });
    }
    // delete File from cloudany
    if (sample.media_file && sample.media_file.public_id) {
      await deleteFileFromCloudnary(sample.media_file.public_id);
    }

    await PostTypeSample.findByIdAndDelete(sampleid);

    return res.status(200).send({
      success: true,
      message: "Sample Deleted Successfully",
    });
  } catch (error) {
    console.log(`Sample Delete Controller failled Error - ${error}`);
    return res.status(400).send({
      success: false,
      message: "Unable to delete data",
    });
  }
};


// ---------REEL TYPE -----
//Add a new reel type
const addReelType = async (req, res) => {
  try {
    const { type_name, description, importance_level, subniche } = req.body;
    // Check if all required fields are provided
    if (!type_name || !description || !importance_level || !subniche) {
      return res.status(400).send({
        success: false,
        message: "All fields are required",
      });
    }
    // Verify that the importance_level is valid
    const validLevels = ["high", "med", "low"];
    if (!validLevels.includes(importance_level)) {
      return res.status(400).send({
        success: false,
        message: "Invalid importance level",
      });
    }

     // Fetch the subniche
     const subnicheid = await SubNiche.findById(subniche);
     if (!subnicheid) {
       return res
         .status(404)
         .send({ success: false, message: "Subniche not found" });
     }

    const reeltype = await ReelType.create({
      type_name,
      description,
      importance_level,
      subniche: subnicheid
    });
    return res.status(201).send({
      success: true,
      message: "reeltype Created Successfully !!",
      reeltype,
    });
  } catch (error) {
    console.log(`fail to Add reeltype with Error - ${error}`);
    return res.status(400).send({
      success: false,
      message: "Failed to add reeltype",
      error: "Error message explaining the issue",
    });
  }
};
//update reel type
const UpdateReelType = async (req, res) => {
  try {
    const { type_name, description, importance_level, subniche } = req.body;
    const { rtypeid } = req.params;
    const rtype = await ReelType.findById(rtypeid);
    console.log(rtype);
    if (!rtype) {
      return res.status(401).send({
        success: false,
        message: "Reel Type Not Found",
      });
    }
    //update any of the field that user update
    if (type_name) rtype.type_name = type_name;
    if (description) rtype.description = description;
    if (importance_level) rtype.importance_level = importance_level;
    if (subniche) rtype.subniche = subniche;

    await rtype.save();
    return res.status(200).send({
      success: true,
      message: "Reel Type Details Updated",
    });
  } catch (error) {
    console.log(`Update Reel Type Controller failled Error - ${error}`);
    return res.status(400).send({
      success: false,
      message: "Error While Updating Reel Type details",
    });
  }
};
//Get all reel types
const getAllReelType = async (req, res) => {
  try {
    const reeltype = await ReelType.find({});
    return res.status(200).send({
      success: true,
      total: reeltype.length,
      message: "All Reel Type Fetch",
      reeltype,
    });
  } catch (error) {
    console.log(`GetAll reeltype failled Error - ${error}`);
    return res.status(400).send({
      success: false,
      message: "Failled to get Reel types ",
    });
  }
};
//Get Single reel detail
const getSingleReelType = async (req, res) => {
  try {
    const { rtypeid } = req.params;
    console.log(rtypeid);
    const rtype = await ReelType.findById(rtypeid);
    console.log(rtype);
    if (!rtype) {
      return res
        .status(404)
        .send({ success: false, message: "Reel Type not Found" });
    }
    //Success Respose when new category added to DB
    return res.status(201).send({
      success: true,
      message: "Reel Type Fetch SucessFully",
      rtype,
    });
  } catch (error) {
    console.log(`getSingleReelType failled Error - ${error}`);
    return res.status(400).send({
      success: false,
      message: "getSingleReelType Controller Failled",
    });
  }
};
//Delete reel type
const DeleteReelType = async (req, res) => {
  try {
    const { rtypeid } = req.params;
    console.log(rtypeid);
    const rtype = await ReelType.findById(rtypeid);
    if (!rtype) {
      return res
        .status(404)
        .send({ success: false, message: "Reel Type not Found" });
    }

    await ReelType.findByIdAndDelete(rtypeid);

    return res.status(200).send({
      success: true,
      message: "Reel Type Deleted Successfully",
    });
  } catch (error) {
    console.log(`Delete Reel Type Controller failled Error - ${error}`);
    return res.status(400).send({
      success: false,
      message: "Unable to delete data",
    });
  }
};

//----------- REEL SAMPLE -----------
//Add a new reel type sample
const addReelTypeSample = async (req, res) => {
  try {
    console.log(req.body)
    const {
      name,
      description,
      reelid,
    } = req.body;
    const media_file = req.file?.fieldname;
    const media_filePath = req.file?.path;

    if (!name || !reelid || !media_file) {
      return res
        .status(400)
        .send({
          success: false,
          message: "All field required",
        });
    }
    // Fetch the subniche
    const reeltypeid = await ReelType.findById(reelid);
    if (!reeltypeid) {
      return res
        .status(404)
        .send({ success: false, message: "Posttype not found" });
    }
    //Uploading file on Cloudnary
    const { secure_url, public_id } = await uploadFileOnCloudnary(
      media_filePath,
      "media_file"
    );
    if (!secure_url) {
      return res.status(400).send({
        success: false,
        message: "Error While Uploading File",
      });
    }

    const rtype_Sample = await ReelTypeSample.create({
      name,
      description,
      media_file: {
        secure_url,
        public_id,
      },
      reelid: reeltypeid,
    });
    return res.status(201).send({
      success: true,
      message: "Reel Type Sample Successfully !!",
      rtype_Sample,
    });
  } catch (error) {
    console.log(`fail to Add Sample with Error - ${error}`);
    return res.status(400).send({
      success: false,
      message: "Failed to add Sample",
      error: "Error message explaining the issue",
    });
  }
};
//update a sub Reel type sample
const updateReelTypeSample = async (req, res) => {
  try {
    const { sampleid } = req.params;
    console.log(req.body);
    const {
      name,
      description,
      reelid,
    } = req.body;

    const media_filePath = req.file?.path;

    const reeltypesample = await PostTypeSample.findById(sampleid);
    console.log(reeltypesample);
    if (!reeltypesample) {
      return res.status(401).send({
        success: false,
        message: "Reeltype Sample Not Found",
      });
    }
    //update any of the field that user update
    if (name) reeltypesample.name = name;
    if (description) reeltypesample.description = description;
    if (reelid) reeltypesample.reelid = reelid;

    //upload new manager file on cloudinary
    if (media_filePath) {
      const { secure_url, public_id } = await uploadFileOnCloudnary(
        media_filePath,
        "media_file"
      );
      // delete File from Cloudinary
      if (reeltypesample.media_file && reeltypesample.media_file.public_id) {
        await deleteFileFromCloudnary(reeltypesample.media_file.public_id);
      }
      reeltypesample.media_file = {
        secure_url,
        public_id,
      };
    }
    await reeltypesample.save();

    return res.status(200).send({
      success: true,
      message: "Reel Type sample Updated",
      reeltypesample,
    });
  } catch (error) {
    console.log(`Update reel Type sample controller failled Error - ${error}`);
    return res.status(400).send({
      success: false,
      message: "Error While Updating reel Type sample details",
    });
  }
};
//Get All Post type samples
const getAllRtypeSample = async (req, res) => {
  try {
    const Samples = await ReelTypeSample.find({});
    return res.status(200).send({
      success: true,
      total: Samples.length,
      message: "Reel type Samples Fetched",
      Samples,
    });
  } catch (error) {
    console.log(`getAll Reel type Sample failled Error - ${error}`);
    return res.status(400).send({
      success: false,
      message: "Failled to get Reel type Sample Data",
    });
  }
};
//Get Single Reel sample detail
const getSingleReelTypeSample = async (req, res) => {
  try {
    const { sampleid } = req.params;
    console.log(sampleid);
    const sample = await PostTypeSample.findById(sampleid);
    console.log(sample);
    if (!sample) {
      return res
        .status(404)
        .send({ success: false, message: "Reel sample not Found" });
    }
    //Success Respose when new category added to DB
    return res.status(201).send({
      success: true,
      message: "Reel sample Fetch SucessFully",
      sample,
    });
  } catch (error) {
    console.log(`getSingleReelTypeSample failled Error - ${error}`);
    return res.status(400).send({
      success: false,
      message: "getSingleReelTypeSample Controller Failled",
    });
  }
};
//Delete sample
const deleteReelTypeSample = async (req, res) => {
  try {
    const { sampleid } = req.params;
    console.log(sampleid);
    const sample = await ReelTypeSample.findById(sampleid);
    if (!sample) {
      return res
        .status(404)
        .send({ success: false, message: "Sample not Found" });
    }
    // delete File from cloudany
    if (sample.media_file && sample.media_file.public_id) {
      await deleteFileFromCloudnary(sample.media_file.public_id);
    }

    await ReelTypeSample.findByIdAndDelete(sampleid);

    return res.status(200).send({
      success: true,
      message: "Sample Deleted Successfully",
    });
  } catch (error) {
    console.log(`Sample Delete Controller failled Error - ${error}`);
    return res.status(400).send({
      success: false,
      message: "Unable to delete data",
    });
  }
};

//-------------TECH TYPE------
//Add a new services
const addTechTypeSample = async (req, res) => {
  try {
    const {
      name,
      description,
      name_in_local_language,
      description_in_local_language,
      subniche,
    } = req.body;

    if (!name || !subniche) {
      return res
        .status(400)
        .send({
          success: false,
          message: "name & subniche field required",
        });
    }
    // Fetch the subniche
    const subnicheid = await SubNiche.findById(subniche);
    if (!subnicheid) {
      return res
        .status(404)
        .send({ success: false, message: "Subniche not found" });
    }
    const Techtype = await TechnologyType.create({
      name,
      description,
      name_in_local_language,
      description_in_local_language,
      subniche: subnicheid,
    });
    return res.status(201).send({
      success: true,
      message: "Technology type added Successfully !!",
      Techtype,
    });
  } catch (error) {
    console.log(`fail to Add Technology type with Error - ${error}`);
    return res.status(400).send({
      success: false,
      message: "Failed to add Technology type",
      error: "Error message explaining the issue",
    });
  }
};
//get all technology types
const getAllTechTypeSample = async (req, res) => {
  try {
    const Techtypes = await TechnologyType.find({});
    return res.status(200).send({
      success: true,
      totle: Techtypes.length,
      message: "Techtypes Data Fetch",
      Techtypes,
    });
  } catch (error) {
    console.log(`Gett Techtypes failled Error - ${error}`);
    return res.status(400).send({
      success: false,
      message: "Failled to get Techtypes ",
    });
  }
};

//this controller get all tech on the bases of sub niche id
const getAllSubNichetech = async (req, res) => {
  try {
    const { subid } = req.params;
    const tech = await TechnologyType.find({subniche: subid});
    if (!tech || tech.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No technology found for this sub-niche",
      });
    }
    return res.status(200).send({
      success: true,
      totle: tech.length,
      message: "technology Data Fetch",
      tech,
    });
  } catch (error) {
    console.log(`getAlltechnology failled Error - ${error}`);
    return res.status(400).send({
      success: false,
      message: "Failled to get technology Data",
    });
  }
};

//Get Single technology detail
const getSingleTechTypeSample = async (req, res) => {
  try {
    const { techid } = req.params;
    console.log(techid);
    const tech = await TechnologyType.findById(techid);
    console.log(tech);
    if (!tech) {
      return res
        .status(404)
        .send({ success: false, message: "Technology not Found" });
    }
    //Success Respose when new category added to DB
    return res.status(201).send({
      success: true,
      message: "Technology Fetch SucessFully",
      tech,
    });
  } catch (error) {
    console.log(`GetSingleTechTypeSample failled Error - ${error}`);
    return res.status(400).send({
      success: false,
      message: "GetSingleTechTypeSample Controller Failled",
    });
  }
};

//update technology
const updateTechTypeSample = async (req, res) => {
  try {
    const {
      name,
      description,
      name_in_local_language,
      description_in_local_language,
      subniche,
    } = req.body;
    const { techid } = req.params;
    console.log(techid);

    const Technology = await TechnologyType.findById(techid);
    console.log(Technology);
    if (!Technology) {
      return res.status(401).send({
        success: false,
        message: "Technology Not Found",
      });
    }
    //update any of the field that user update
    if (name) Technology.name = name;
    if (description) Technology.description = description;
    if (name_in_local_language) Technology.name_in_local_language = name_in_local_language;
    if (description_in_local_language) Technology.description_in_local_language = description_in_local_language;
    if (subniche) Technology.subniche = subniche;

    await Technology.save();
    return res.status(200).send({
      success: true,
      message: "Technology Details Updated",
    });
  } catch (error) {
    console.log(`Update Technology Controller failled Error - ${error}`);
    return res.status(400).send({
      success: false,
      message: "Error While Updating Technology details",
    });
  }
};

//Delete sample
const deleteTechTypeSample = async (req, res) => {
  try {
    const { techid } = req.params;
    console.log(techid);
    const sample = await TechnologyType.findById(techid);
    if (!sample) {
      return res
        .status(404)
        .send({ success: false, message: "Sample not Found" });
    }
    // delete File from cloudany
    if (sample.media_file && sample.media_file.public_id) {
      await deleteFileFromCloudnary(sample.media_file.public_id);
    }

    await TechnologyType.findByIdAndDelete(techid);

    return res.status(200).send({
      success: true,
      message: "Sample Deleted Successfully",
    });
  } catch (error) {
    console.log(`Sample Delete Controller failled Error - ${error}`);
    return res.status(400).send({
      success: false,
      message: "Unable to delete data",
    });
  }
};

//----------- Website SAMPLE -----------
//Add a new Website sample
const addWebSample = async (req, res) => {
  try {
    console.log(req.body)
    const {
      name,
      description,
      web_url,
      subniche
    } = req.body;
    const media_file = req.file?.fieldname;
    const media_filePath = req.file?.path;

    if (!name || !subniche || !web_url) {
      return res
        .status(400)
        .send({
          success: false,
          message: "All field required",
        });
    }
    // Fetch the subniche
    const subNicheid = await SubNiche.findById(subniche);
    if (!subNicheid) {
      return res
        .status(404)
        .send({ success: false, message: "SubNicheid not found" });
    }
    //Uploading file on Cloudnary
    const { secure_url, public_id } = await uploadFileOnCloudnary(
      media_filePath,
      "media_file"
    );
    if (!secure_url) {
      return res.status(400).send({
        success: false,
        message: "Error While Uploading File",
      });
    }

    const webSample = await WebsiteSample.create({
      name,
      description,
      web_url,
      media_file: {
        secure_url,
        public_id,
      },
      subniche: subNicheid,
    });
    return res.status(201).send({
      success: true,
      message: "Website Sample Successfully !!",
      webSample,
    });
  } catch (error) {
    console.log(`fail to Add Sample with Error - ${error}`);
    return res.status(400).send({
      success: false,
      message: "Failed to add Sample",
      error: "Error message explaining the issue",
    });
  }
};
//update a Website sample
const updateWebSample = async (req, res) => {
  try {
    const { webid } = req.params;
    console.log(req.body);
    const {
      name,
      description,
      web_url,
      subniche
    } = req.body;

    const media_filePath = req.file?.path;

    const webSample = await WebsiteSample.findById(webid);
    console.log(webSample);
    if (!webSample) {
      return res.status(401).send({
        success: false,
        message: "webSample Not Found",
      });
    }
    //update any of the field that user update
    if (name) webSample.name = name;
    if (description) webSample.description = description;
    if (web_url) webSample.web_url = web_url;
    if (subniche) webSample.subniche = subniche;

    //upload new media file on cloudinary
    if (media_filePath) {
      const { secure_url, public_id } = await uploadFileOnCloudnary(
        media_filePath,
        "media_file"
      );
      // delete File from Cloudinary
      if (webSample.media_file && webSample.media_file.public_id) {
        await deleteFileFromCloudnary(webSample.media_file.public_id);
      }
      webSample.media_file = {
        secure_url,
        public_id,
      };
    }
    await webSample.save();

    return res.status(200).send({
      success: true,
      message: "Website sample Updated",
      webSample,
    });
  } catch (error) {
    console.log(`Update web sample controller failled Error - ${error}`);
    return res.status(400).send({
      success: false,
      message: "Error While Updating Website sample details",
    });
  }
};
//Get All Website samples
const getAllWebSample = async (req, res) => {
  try {
    const Samples = await WebsiteSample.find({});
    return res.status(200).send({
      success: true,
      total: Samples.length,
      message: "Web type Samples Fetched",
      Samples,
    });
  } catch (error) {
    console.log(`getAllWebSample failled Error - ${error}`);
    return res.status(400).send({
      success: false,
      message: "Failled to get Website Sample ",
    });
  }
};
//Get Single Website sample
const getSingleWebSample = async (req, res) => {
  try {
    const { webid } = req.params;
    console.log(webid);
    const sample = await WebsiteSample.findById(webid);
    console.log(sample);
    if (!sample) {
      return res
        .status(404)
        .send({ success: false, message: "Website sample not Found" });
    }
 
    return res.status(201).send({
      success: true,
      message: "Website sample Fetch SucessFully",
      sample,
    });
  } catch (error) {
    console.log(`Get Single WebsiteSample failled Error - ${error}`);
    return res.status(400).send({
      success: false,
      message: "Get Single Website Sample Controller Failled",
    });
  }
};

//Delete Website sample
const deleteWebSample = async (req, res) => {
  try {
    const { webid } = req.params;
    console.log(webid);
    const sample = await WebsiteSample.findById(webid);
    if (!sample) {
      return res
        .status(404)
        .send({ success: false, message: "Sample not Found" });
    }
    // delete File from cloudany
    if (sample.media_file && sample.media_file.public_id) {
      await deleteFileFromCloudnary(sample.media_file.public_id);
    }

    await WebsiteSample.findByIdAndDelete(webid);

    return res.status(200).send({
      success: true,
      message: "Sample Deleted Successfully",
    });
  } catch (error) {
    console.log(`Sample Delete Controller failled Error - ${error}`);
    return res.status(400).send({
      success: false,
      message: "Unable to delete data",
    });
  }
};


//----------- Website SAMPLE -----------
//Add a new ads sample
const addAdsSample = async (req, res) => {
  try {
    console.log(req.body)
    const {
      name,
      description,
      ad_type,
      subniche
    } = req.body;
    const media_file = req.file?.fieldname;
    const media_filePath = req.file?.path;

    if (!name || !subniche || !ad_type) {
      return res
        .status(400)
        .send({
          success: false,
          message: "All field required",
        });
    }
    // Fetch the subniche
    const subNicheid = await SubNiche.findById(subniche);
    if (!subNicheid) {
      return res
        .status(404)
        .send({ success: false, message: "SubNicheid not found" });
    }
    //Uploading file on Cloudnary
    const { secure_url, public_id } = await uploadFileOnCloudnary(
      media_filePath,
      "media_file"
    );
    if (!secure_url) {
      return res.status(400).send({
        success: false,
        message: "Error While Uploading File",
      });
    }

    const absSample = await AdsSample.create({
      name,
      description,
      ad_type,
      media_file: {
        secure_url,
        public_id,
      },
      subniche: subNicheid,
    });
    return res.status(201).send({
      success: true,
      message: "AbsSample added Successfully !!",
      absSample,
    });
  } catch (error) {
    console.log(`fail to Add Sample with Error - ${error}`);
    return res.status(400).send({
      success: false,
      message: "Failed to add Sample",
      error: "Error message explaining the issue",
    });
  }
};
//update a ads sample
const updateAdsSample = async (req, res) => {
  try {
    const { adsid } = req.params;
    console.log(req.body);
    const {
      name,
      description,
      ad_type,
      subniche
    } = req.body;

    const media_filePath = req.file?.path;

    const absSample = await AdsSample.findById(adsid);
    console.log(absSample);
    if (!absSample) {
      return res.status(401).send({
        success: false,
        message: "absSample Not Found",
      });
    }
    //update any of the field that user update
    if (name) absSample.name = name;
    if (description) absSample.description = description;
    if (ad_type) absSample.ad_type = ad_type;
    if (subniche) absSample.subniche = subniche;

    //upload new media file on cloudinary
    if (media_filePath) {
      const { secure_url, public_id } = await uploadFileOnCloudnary(
        media_filePath,
        "media_file"
      );
      // delete File from Cloudinary
      if (absSample.media_file && absSample.media_file.public_id) {
        await deleteFileFromCloudnary(absSample.media_file.public_id);
      }
      absSample.media_file = {
        secure_url,
        public_id,
      };
    }
    await absSample.save();

    return res.status(200).send({
      success: true,
      message: "AbsSample Updated",
      absSample,
    });
  } catch (error) {
    console.log(`Update absSample controller failled Error - ${error}`);
    return res.status(400).send({
      success: false,
      message: "Error While Updating absSample details",
    });
  }
};
//Get All ads samples
const getAllAdsSample = async (req, res) => {
  try {
    const Samples = await AdsSample.find({});
    return res.status(200).send({
      success: true,
      total: Samples.length,
      message: "Ads type Samples Fetched",
      Samples,
    });
  } catch (error) {
    console.log(`getAllAdsSample failled Error - ${error}`);
    return res.status(400).send({
      success: false,
      message: "Failled to get Ads Sample ",
    });
  }
};
//Get Single ads sample
const getSingleAdsSample = async (req, res) => {
  try {
    const { adsid } = req.params;
    console.log(adsid);
    const sample = await AdsSample.findById(adsid);
    console.log(sample);
    if (!sample) {
      return res
        .status(404)
        .send({ success: false, message: "ads sample not Found" });
    }
 
    return res.status(201).send({
      success: true,
      message: "ads sample Fetch SucessFully",
      sample,
    });
  } catch (error) {
    console.log(`Get Single adsSample failled Error - ${error}`);
    return res.status(400).send({
      success: false,
      message: "Get Single ads Sample Controller Failled",
    });
  }
};

//Delete ads sample
const deleteAdsSample = async (req, res) => {
  try {
    const { adsid } = req.params;
    console.log(adsid);
    const sample = await AdsSample.findById(adsid);
    if (!sample) {
      return res
        .status(404)
        .send({ success: false, message: "Sample not Found" });
    }
    // delete File from cloudany
    if (sample.media_file && sample.media_file.public_id) {
      await deleteFileFromCloudnary(sample.media_file.public_id);
    }

    await AdsSample.findByIdAndDelete(adsid);

    return res.status(200).send({
      success: true,
      message: "Sample Deleted Successfully",
    });
  } catch (error) {
    console.log(`Sample Delete Controller failled Error - ${error}`);
    return res.status(400).send({
      success: false,
      message: "Unable to delete data",
    });
  }
};


//----------- Landingpage SAMPLE -----------
//Add a new Landingpage sample
const addLPSample = async (req, res) => {
  try {
    console.log(req.body)
    const {
      name,
      description,
      page_url,
      subniche
    } = req.body;
    const media_file = req.file?.fieldname;
    const media_filePath = req.file?.path;

    if (!name || !subniche || !page_url) {
      return res
        .status(400)
        .send({
          success: false,
          message: "All field required",
        });
    }
    // Fetch the subniche
    const subNicheid = await SubNiche.findById(subniche);
    if (!subNicheid) {
      return res
        .status(404)
        .send({ success: false, message: "SubNicheid not found" });
    }
    //Uploading file on Cloudnary
    const { secure_url, public_id } = await uploadFileOnCloudnary(
      media_filePath,
      "media_file"
    );
    if (!secure_url) {
      return res.status(400).send({
        success: false,
        message: "Error While Uploading File",
      });
    }

    const landingPageSample = await LandingPage.create({
      name,
      description,
      page_url,
      media_file: {
        secure_url,
        public_id,
      },
      subniche: subNicheid,
    });
    return res.status(201).send({
      success: true,
      message: "landingPage Sample Successfully !!",
      landingPageSample,
    });
  } catch (error) {
    console.log(`fail to landingPage Sample with Error - ${error}`);
    return res.status(400).send({
      success: false,
      message: "Failed to add Sample",
      error: "Error message explaining the issue",
    });
  }
};
//update a Landingpage sample
const updateLPSample = async (req, res) => {
  try {
    const { lpid } = req.params;
    console.log(req.body);
    const {
      name,
      description,
      page_url,
      subniche
    } = req.body;

    const media_filePath = req.file?.path;

    const landingPageSample = await LandingPage.findById(lpid);
    console.log(landingPageSample);
    if (!landingPageSample) {
      return res.status(401).send({
        success: false,
        message: "landingPageSample Not Found",
      });
    }
    //update any of the field that user update
    if (name) landingPageSample.name = name;
    if (description) landingPageSample.description = description;
    if (page_url) landingPageSample.page_url = page_url;
    if (subniche) landingPageSample.subniche = subniche;

    //upload new media file on cloudinary
    if (media_filePath) {
      const { secure_url, public_id } = await uploadFileOnCloudnary(
        media_filePath,
        "media_file"
      );
      // delete File from Cloudinary
      if (landingPageSample.media_file && landingPageSample.media_file.public_id) {
        await deleteFileFromCloudnary(landingPageSample.media_file.public_id);
      }
      landingPageSample.media_file = {
        secure_url,
        public_id,
      };
    }
    await landingPageSample.save();

    return res.status(200).send({
      success: true,
      message: "landingPage sample Updated",
      landingPageSample,
    });
  } catch (error) {
    console.log(`Update landingPage sample controller failled Error - ${error}`);
    return res.status(400).send({
      success: false,
      message: "Error While Updating landingPage sample details",
    });
  }
};
//Get All Landingpage samples
const getAllLPSample = async (req, res) => {
  try {
    const Samples = await LandingPage.find({});
    return res.status(200).send({
      success: true,
      total: Samples.length,
      message: "landingPage Samples Fetched",
      Samples,
    });
  } catch (error) {
    console.log(`landingPage sample failled Error - ${error}`);
    return res.status(400).send({
      success: false,
      message: "Failled to get landingPageSample",
    });
  }
};
//Get Single Landingpage sample
const getSingleLPSample = async (req, res) => {
  try {
    const { lpid } = req.params;
    console.log(lpid);
    const sample = await LandingPage.findById(lpid);
    console.log(sample);
    if (!sample) {
      return res
        .status(404)
        .send({ success: false, message: "landingPage sample not Found" });
    }
 
    return res.status(201).send({
      success: true,
      message: "landingPage Sample Fetch SucessFully",
      sample,
    });
  } catch (error) {
    console.log(`Get Single landingPageSample failled Error - ${error}`);
    return res.status(400).send({
      success: false,
      message: "Get Single landingPageSample Controller Failled",
    });
  }
};

//Delete Landingpage sample
const deleteLPSample = async (req, res) => {
  try {
    const { lpid } = req.params;
    console.log(lpid);
    const sample = await LandingPage.findById(lpid);
    if (!sample) {
      return res
        .status(404)
        .send({ success: false, message: "Sample not Found" });
    }
    // delete File from cloudany
    if (sample.media_file && sample.media_file.public_id) {
      await deleteFileFromCloudnary(sample.media_file.public_id);
    }

    await LandingPage.findByIdAndDelete(lpid);

    return res.status(200).send({
      success: true,
      message: "Sample Deleted Successfully",
    });
  } catch (error) {
    console.log(`Sample Delete Controller failled Error - ${error}`);
    return res.status(400).send({
      success: false,
      message: "Unable to delete data",
    });
  }
};


// ---------KEYWORD TYPE -----
//Add a new KEYWORD
const addKeywords = async (req, res) => {
  try {
    const { keyword , description, level_of_competition, keyword_in_local_language, subniche } = req.body;
    // Check if all required fields are provided
    if (!keyword || !description || !level_of_competition || !keyword_in_local_language || !subniche) {
      return res.status(400).send({
        success: false,
        message: "All fields are required",
      });
    }
    // Verify that the importance_level is valid
    const validLevels = ["High", "Med", "Low"];
    if (!validLevels.includes(level_of_competition)) {
      return res.status(400).send({
        success: false,
        message: "Invalid Compitition level",
      });
    }

     // Fetch the subniche
     const subnicheid = await SubNiche.findById(subniche);
     if (!subnicheid) {
       return res
         .status(404)
         .send({ success: false, message: "Subniche not found" });
     }

    const reeltype = await Keyword.create({
      keyword,
      description,
      level_of_competition,
      keyword_in_local_language,
      subniche: subnicheid
    });
    return res.status(201).send({
      success: true,
      message: "Keyword added Successfully !!",
      reeltype,
    });
  } catch (error) {
    console.log(`fail to Add Keyword with Error - ${error}`);
    return res.status(400).send({
      success: false,
      message: "Failed to add Keyword",
      error: "Error message explaining the issue",
    });
  }
};
//update keyword 
const updateKeyword = async (req, res) => {
  try {
    const { keyword , description, level_of_competition, keyword_in_local_language, subniche } = req.body;
    const { keywordid } = req.params;
    const key = await Keyword.findById(keywordid);
    console.log(key);
    if (!key) {
      return res.status(401).send({
        success: false,
        message: "Keyword Not Found",
      });
    }
    //update any of the field that user update
    if (keyword) key.keyword = keyword;
    if (description) key.description = description;
    if (level_of_competition) key.level_of_competition = level_of_competition;
    if (keyword_in_local_language) key.keyword_in_local_language = level_of_competition;
    if (subniche) key.subniche = subniche;

    await key.save();
    return res.status(200).send({
      success: true,
      message: "Keyword Details Updated",
    });
  } catch (error) {
    console.log(`Update Keyword Controller failled Error - ${error}`);
    return res.status(400).send({
      success: false,
      message: "Error While Updating Keyword details",
    });
  }
};
//Get all Keyword 
const getAllKeyword= async (req, res) => {
  try {
    const keyword = await Keyword.find({});
    return res.status(200).send({
      success: true,
      total: keyword.length,
      message: "All Keyword Fetch",
      keyword,
    });
  } catch (error) {
    console.log(`Get All Keyword failled Error - ${error}`);
    return res.status(400).send({
      success: false,
      message: "Failled to get Keyword",
    });
  }
};
//Get Single Keyword detail
const getSingleKeyword = async (req, res) => {
  try {
    const { keywordid } = req.params;
    console.log(keywordid);
    const keyword = await Keyword.findById(keywordid);
    console.log(keyword);
    if (!keyword) {
      return res
        .status(404)
        .send({ success: false, message: "Keyword not Found" });
    }
    //Success Respose when new category added to DB
    return res.status(201).send({
      success: true,
      message: "Keyword Fetch SucessFully",
      keyword,
    });
  } catch (error) {
    console.log(`Get Single Keyword failled Error - ${error}`);
    return res.status(400).send({
      success: false,
      message: "Get Single Keyword Controller Failled",
    });
  }
};
//Delete Keyword type
const DeleteKeyword = async (req, res) => {
  try {
    const { keywordid } = req.params;
    console.log(keywordid);
    const rtype = await Keyword.findById(keywordid);
    if (!rtype) {
      return res
        .status(404)
        .send({ success: false, message: "Keyword not Found" });
    }

    await Keyword.findByIdAndDelete(keywordid);

    return res.status(200).send({
      success: true,
      message: "Keyword Deleted Successfully",
    });
  } catch (error) {
    console.log(`Delete Keyword Controller failled Error - ${error}`);
    return res.status(400).send({
      success: false,
      message: "Unable to delete data",
    });
  }
};






export {
  addPostType,
  getAllPostType,
  getSinglePostType,
  UpdatePostType,
  DeletePostType,
  addPostTypeSample,
  getAllPtypeSample,
  getSinglePostTypeSample,
  updatePostTypeSample,
  deletePostTypeSample,
  addReelType,
  DeleteReelType,
  getSingleReelType,
  UpdateReelType,
  getAllReelType,
  addReelTypeSample,
  updateReelTypeSample,
  deleteReelTypeSample,
  getAllRtypeSample,
  getSingleReelTypeSample,
  addTechTypeSample,
  getAllTechTypeSample,
  getAllSubNichetech,
  getSingleTechTypeSample,
  updateTechTypeSample,
  deleteTechTypeSample,
  deleteWebSample,
  getSingleWebSample,
  getAllWebSample,
  updateWebSample,
  addWebSample,
  addAdsSample,
  updateAdsSample,
  deleteAdsSample,
  getAllAdsSample,
  getSingleAdsSample,
  addLPSample,
  updateLPSample,
  getAllLPSample,
  getSingleLPSample,
  deleteLPSample,
  addKeywords,
  updateKeyword,
  getAllKeyword,
  getSingleKeyword,
  DeleteKeyword
};
