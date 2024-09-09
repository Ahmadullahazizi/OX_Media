import {
    deleteFileFromCloudnary,
    uploadFileOnCloudnary,
  } from "../../helper/cloudnaryHelper.js";
import { OXServices } from "../../models/growth/oxService&PackagesSchema.js";



  const oxservice = async (req, res) => {
    try {
      console.log('Request body:', req.body);
      console.log('Research file:', req.file);
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
    const validImportance = ['high', 'mid', 'low'];
    if (!validImportance.includes(importance)) {
      return res.status(400).send({
        success: false,
        message: "Invalid Importance level!",
      });
    }

     // Verify that the importance_level is valid
     const validStatus = ['active', 'inactive'];
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
      const subniche = await OXServices.create({
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
        subniche,
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

  export{oxservice, }