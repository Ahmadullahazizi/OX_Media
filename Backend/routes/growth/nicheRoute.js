import express from "express";
import { addNiche, addservice, addSubNiche, deleteNiche, deleteSubNiche, getAllNiche, getAllservices, getAllSubNiche, getAllSubNicheservices, getSingleNiche, getSingleSubNiche, updateNiche, updatesubNiche, getSingleService, updateSubNicheService, deleteService } from "../../controllers/growth/nicheController.js";
import { upload } from "../../middlewares/multerMiddleware.js";

const router = express.Router();
//Niche Routes
// the route below http://localhost:3000/api/v1/niche - POST
router.post("/",  addNiche);

// the route below http://localhost:3000/api/v1/niche - GET
router.get("/get-all-niche",  getAllNiche);

// the route below http://localhost:3000/api/v1/niche/:nicheid - GET
router.get("/get-single-niche/:nicheid",  getSingleNiche);

// the route below http://localhost:3000/api/v1/niche/:nicheid - PUT
router.put("/:nicheid",  updateNiche);

// the route below http://localhost:3000/api/v1/niche/:nicheid - DELETE
router.delete("/:nicheid",  deleteNiche);

//----------------SubNiche Routes---------------

// the route below http://localhost:3000/api/v1/niche/sub - POST
router.post("/add-subniche", upload.single("research_file"), addSubNiche);

// the route below http://localhost:3000/api/v1/niche/sub - GET
router.get("/get-all-subniche", getAllSubNiche);

// the route below http://localhost:3000/api/v1/niche/get-single-subniche/:subid - GET
router.get("/get-single-subniche/:subid", getSingleSubNiche);

// the route below http://localhost:3000/api/v1/niche/get-single-subniche/:subid - PUT
router.put("/update-subniche/:subid", upload.single("research_file"), updatesubNiche);

// the route below http://localhost:3000/api/v1/niche/delete-subniche/:subid - DELETE
router.delete("/delete-subniche/:subid",  deleteSubNiche);

//----------------Sub Niche SERVICESRoutes---------------
// the route below http://localhost:3000/api/v1/niche - POST
router.post("/add-service",  addservice);

// the route below http://localhost:3000/api/v1/niche/get-all-service - GET
router.get("/get-all-service",  getAllservices);

// the route below http://localhost:3000/api/v1/niche/get-all-service/:subid - GET
router.get("/get-all-service/:subid",  getAllSubNicheservices);

// the route below http://localhost:3000/api/v1/niche/get-single-service/:subid - GET
router.get("/get-single-service/:serviceid", getSingleService);

// the route below http://localhost:3000/api/v1/niche/get-single-service/:subid - GET
router.put("/update-service/:serviceid", updateSubNicheService);

// the route below http://localhost:3000/api/v1/niche/:nicheid - DELETE
router.delete("/delete-service/:serviceid",  deleteService);




export default router;