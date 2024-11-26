import {ContentLibrary, contentType} from "../../models/growth/contentLibrarySchema.js";
import {SubNiche} from "../../models/growth/nichSchema.js"; // Replace with your actual SubNiche model


const addContentLibrary = async (req, res) => {
  try {
    const {
      subniche_id,
      content_format,
      content_type,
      related_entity,
      added_by,
      employee_ratings,
      link,
      note,
    } = req.body;

    // Validate `subniche_id`
    const subnicheExists = await SubNiche.findById(subniche_id);
    if (!subnicheExists) {
      return res.status(400).json({ message: "Invalid subniche_id" });
    }

    // Validate `content_type`
    const contentTypeExists = await contentType.findById(content_type);
    if (!contentTypeExists) {
      return res.status(400).json({ message: "Invalid content_type" });
    }

    // Validate `content_format`
    const validFormats = ["Short Video", "Post", "Story", "Long Video"];
    if (!validFormats.includes(content_format)) {
      return res
        .status(400)
        .json({ message: `Invalid content_format. Valid formats are: ${validFormats.join(", ")}` });
    }

    // Validate `related_entity`
    const validEntities = ["Social Media", "Ads", "Google", "Website"];
    if (!Array.isArray(related_entity) || related_entity.some((entity) => !validEntities.includes(entity))) {
      return res
        .status(400)
        .json({ message: `Invalid related_entity. Valid entities are: ${validEntities.join(", ")}` });
    }

    // Validate `employee_ratings`
    if (employee_ratings && !Array.isArray(employee_ratings)) {
      return res.status(400).json({ message: "Employee ratings must be an array" });
    }

    if (employee_ratings) {
      for (const { employee_name, rating } of employee_ratings) {
        if (!employee_name) {
          return res.status(400).json({ message: "Each rating must include an employee_name" });
        }
        if (rating < 1 || rating > 5) {
          return res.status(400).json({ message: "Rating must be between 1 and 5" });
        }
      }
    }

    // Create a new content library entry
    const newContentLibrary = new ContentLibrary({
      subniche_id,
      content_format,
      content_type,
      related_entity,
      added_by,
      employee_ratings,
      link,
      note,
    });

    const savedContentLibrary = await newContentLibrary.save();

    res
      .status(201)
      .json({ message: "Content library entry created successfully", data: savedContentLibrary });
  } catch (error) {
    res.status(500).json({ message: "Error creating content library entry", error: error.message });
  }
};

// READ: Fetch all content library entries
 const getAllContentLibraries = async (req, res) => {
    try {
      const contentLibraries = await ContentLibrary.find();
      console.log(contentLibraries);
        // .populate("subniche_id", "name") 
        // .populate("content_type" , "name");// Adjust field names according to your SubNiche schema
         // Adjust field names according to your ContentType schema
  
      res.status(200).json({
        message: "Content libraries fetched successfully",
        data: contentLibraries,
      });
    } catch (error) {
      res.status(500).json({ message: "Error fetching content libraries", error: error.message });
    }
  };
  
  // READ: Fetch a single content library by ID
   const getContentLibraryById = async (req, res) => {
    try {
      const { id } = req.params;
  
      const contentLibrary = await ContentLibrary.findById(id)
        // .populate("subniche_id", "name")
        // .populate("content_type", "name");
  
      if (!contentLibrary) {
        return res.status(404).json({ message: "Content library not found" });
      }
  
      res.status(200).json({ message: "Content library fetched successfully", data: contentLibrary });
    } catch (error) {
      res.status(500).json({ message: "Error fetching content library", error: error.message });
    }
  };
  
  // UPDATE: Update a content library entry by ID
   const updateContentLibrary = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedData = req.body;
  
      // Validate `content_format` if provided
      if (updatedData.content_format) {
        const validFormats = ["Short Video", "Post", "Story", "Long Video"];
        if (!validFormats.includes(updatedData.content_format)) {
          return res.status(400).json({ message: `Invalid content_format. Valid formats are: ${validFormats.join(", ")}` });
        }
      }
  
      // Validate `related_entity` if provided
      if (updatedData.related_entity) {
        const validEntities = ["Social Media", "Ads", "Google", "Website"];
        if (!Array.isArray(updatedData.related_entity) || updatedData.related_entity.some(entity => !validEntities.includes(entity))) {
          return res
            .status(400)
            .json({ message: `Invalid related_entity. Valid entities are: ${validEntities.join(", ")}` });
        }
      }
  
      // Update the content library entry
      const updatedContentLibrary = await ContentLibrary.findByIdAndUpdate(id, updatedData, {
        new: true, // Return the updated document
        runValidators: true, // Run schema validations
      });
  
      if (!updatedContentLibrary) {
        return res.status(404).json({ message: "Content library not found" });
      }
  
      res.status(200).json({ message: "Content library updated successfully", data: updatedContentLibrary });
    } catch (error) {
      res.status(500).json({ message: "Error updating content library", error: error.message });
    }
  };
  
  // DELETE: Delete a content library entry by ID
   const deleteContentLibrary = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedContentLibrary = await ContentLibrary.findByIdAndDelete(id);
  
      if (!deletedContentLibrary) {
        return res.status(404).json({ message: "Content library not found" });
      }
  
      res.status(200).json({ message: "Content library deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting content library", error: error.message });
    }
  };

// Create a new content type
const createContentType = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Check if a content type with the same name already exists
    const existingContentType = await contentType.findOne({ name });
    if (existingContentType) {
      return res.status(400).json({ message: "Content type with this name already exists" });
    }

    // Create a new content type
    const newContentType = new contentType({ name, description });
    const savedContentType = await newContentType.save();

    res.status(201).json({
      message: "Content type created successfully",
      data: savedContentType,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating content type", error: error.message });
  }
};

// Retrieve all content types
const getAllcontentType = async (req, res) => {
  try {
    const contentType = await contentType.find();
    res.status(200).json({
      message: "Content types retrieved successfully",
      data: contentType,
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving content types", error: error.message });
  }
};

// Retrieve a single content type by ID
const getContentTypeById = async (req, res) => {
  try {
    const { id } = req.params;

    const contentType = await contentType.findById(id);
    if (!contentType) {
      return res.status(404).json({ message: "Content type not found" });
    }

    res.status(200).json({
      message: "Content type retrieved successfully",
      data: contentType,
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving content type", error: error.message });
  }
};

// Update a content type by ID
 const updateContentType = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    // Find the content type and update it
    const updatedContentType = await contentType.findByIdAndUpdate(
      id,
      { name, description },
      { new: true, runValidators: true } // Return the updated document and validate changes
    );

    if (!updatedContentType) {
      return res.status(404).json({ message: "Content type not found" });
    }

    res.status(200).json({
      message: "Content type updated successfully",
      data: updatedContentType,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating content type", error: error.message });
  }
};

// Delete a content type by ID
const deleteContentType = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedContentType = await contentType.findByIdAndDelete(id);
    if (!deletedContentType) {
      return res.status(404).json({ message: "Content type not found" });
    }

    res.status(200).json({
      message: "Content type deleted successfully",
      data: deletedContentType,
    });
  } catch (error) {
    res.status(500).json({ message: "Error deleting content type", error: error.message });
  }
};


export{
    createContentType,
    getAllcontentType,
    getContentTypeById,
    updateContentType,
    deleteContentType,
    addContentLibrary,
    getAllContentLibraries,
    getContentLibraryById,
    updateContentLibrary,
    deleteContentLibrary
}