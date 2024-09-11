import express from "express";
import { upload } from "../../middlewares/multerMiddleware.js";
import {
  addoxservice,
  updateOXservice,
  DeleteOXservice,
  getAllOXservices,
  getSingleOXservice,
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
  updateServiceDeliverable
} from "../../controllers/growth/oxServices&PackagesController.js";

const router = express.Router();
//Ox services Routes
// the route below http://localhost:3000/api/v1/oxservices - POST
router.post("/add-service", upload.single("SOP_file"), addoxservice);

// the route below http://localhost:3000/api/v1/oxservices - PUT
router.put(
  "/update-service/:serviceID",
  upload.single("SOP_file"),
  updateOXservice
);

// the route below http://localhost:3000/api/v1/oxservices/get-all-service - GET
router.get("/get-all-service", getAllOXservices);

// the route below http://localhost:3000/api/v1/oxservices/get-single-service/:serviceID - GET
router.get("/get-single-service/:serviceID", getSingleOXservice);

// the route below http://localhost:3000/api/v1/oxservices/delete-service/:serviceID - DELETE
router.delete("/delete-service/:serviceID", DeleteOXservice);


//Ox Packages Routes
// the route below http://localhost:3000/api/v1/oxservices/add-package - POST
router.post("/add-package", addOxPackages);

// the route below http://localhost:3000/api/v1/oxservices/update-package/:packageID - PUT
router.put("/update-package/:packageID", updateOXPackages);

// the route below http://localhost:3000/api/v1/oxservices/get-all-package - GET
router.get("/get-all-package", getAllOXPackages);

// the route below http://localhost:3000/api/v1/oxservices/get-single-package/:packageID - GET
router.get("/get-single-package/:packageID", getSingleOXPackages);

// the route below http://localhost:3000/api/v1/oxservices/delete-package/:packageID - DELETE
router.delete("/delete-package/:packageID", DeleteOXpackages);


// //Ox Services & Packages Routes
// // the route below http://localhost:3000/api/v1/oxservices/add-package - POST
// router.post("/", addOxServicesPackage);

// // the route below http://localhost:3000/api/v1/oxservices/update-package/:packageID - PUT
// router.put("//:id", updateOxServicesPackage);

// // the route below http://localhost:3000/api/v1/oxservices/get-all-package - GET
// router.get("/", getAllOxServicesPackages);

// // the route below http://localhost:3000/api/v1/oxservices/get-single-package/:packageID - GET
// router.get("/:id", getOxServicesPackageById);

// // the route below http://localhost:3000/api/v1/oxservices/delete-package/:packageID - DELETE
// router.delete("/:id", deleteOxServicesPackage);


//Ox Services Deliverables
// the route below http://localhost:3000/api/v1/oxservices/add-package - POST
router.post("/add-servicedeliverable", createServiceDeliverable);

// the route below http://localhost:3000/api/v1/oxservices/update-package/:packageID - PUT
router.put("/update-servicedeliverable/:id", updateServiceDeliverable);

// the route below http://localhost:3000/api/v1/oxservices/get-all-package - GET
router.get("/get-servicedeliverable", getAllServiceDeliverables);

// the route below http://localhost:3000/api/v1/oxservices/get-single-package/:packageID - GET
router.get("/get-servicedeliverable/:id", getServiceDeliverableById);

// the route below http://localhost:3000/api/v1/oxservices/delete-package/:packageID - DELETE
router.delete("/delete-servicedeliverable/:id", deleteServiceDeliverable);


export default router;
