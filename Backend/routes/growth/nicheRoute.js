import express from "express";
import { addNiche, addservice, addSubNiche, deleteNiche, deleteSubNiche, getAllNiche, getAllservices, getAllSubNiche, getAllSubNicheservices, getSingleNiche, getSingleSubNiche, updateNiche, updatesubNiche, getSingleService, updateSubNicheService, deleteService, addSubservice, getAllSubservices, getSingleSubNicheSubservices, getServicesofSingleService, deleteSubService, updateSubNicheSubService } from "../../controllers/growth/nicheController.js";
import { upload } from "../../middlewares/multerMiddleware.js";

const router = express.Router();
//Niche Routes
// the route below http://localhost:3000/api/v1/niche - POST
router.post("/", upload.single("research_file"), addNiche);

// the route below http://localhost:3000/api/v1/niche - GET
router.get("/get-all-niche",  getAllNiche);

// the route below http://localhost:3000/api/v1/niche/:nicheid - GET
router.get("/get-single-niche/:nicheid",  getSingleNiche);

// the route below http://localhost:3000/api/v1/niche/:nicheid - PUT
router.put("/:nicheid", upload.single("research_file"), updateNiche);

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


//----------------Sub Niche SUBSERVICES Routes---------------
// the route below http://localhost:3000/api/v1/niche/add-subservice - POST
router.post("/add-subservice",  addSubservice);

// the route below http://localhost:3000/api/v1/niche/get-all-subservice - GET
router.get("/get-all-subservice",  getAllSubservices);

// the route below http://localhost:3000/api/v1/niche/get-all-subservice/:subid - GET
router.get("/get-single-subservice/:serid",  getSingleSubNicheSubservices);

// the route below http://localhost:3000/api/v1/niche/get-single-subservice/:subid - GET
router.get("/get-all-subservice/:serid", getServicesofSingleService);

// the route below http://localhost:3000/api/v1/niche/get-single-subservice/:subid - GET
router.put("/update-subservice/:serid", updateSubNicheSubService);

// the route below http://localhost:3000/api/v1/niche/:nicheid - DELETE
router.delete("/delete-subservice/:serid",  deleteSubService);



export default router;