import express from "express";
import { addContentLibrary, createContentType, getAllcontentType, getContentTypeById, updateContentType, deleteContentType, getAllContentLibraries, getContentLibraryById, updateContentLibrary, deleteContentLibrary } from "../../controllers/growth/contentLibraryController.js";


const router = express.Router();

//Library Routes
// the route below http://localhost:3000/api/v1/branch/ - POST
router.post("/content-library" , addContentLibrary);
router.get("/content-library", getAllContentLibraries);
router.get("/content-library/:id", getContentLibraryById);
router.put("/content-library/:id", updateContentLibrary);
router.delete("/content-library/:id", deleteContentLibrary);


//contentType Routes
router.post("/add-type", createContentType); // Create a new content type
router.get("/get-type", getAllcontentType); // Retrieve all content types
router.get("/get-type/:id", getContentTypeById); // Retrieve a specific content type by ID
router.put("/update-type/:id", updateContentType); // Update a specific content type by ID
router.delete("/delete-type/:id", deleteContentType); // Delete a specific content type by ID

export default router;