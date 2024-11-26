import express from "express";
import { upload } from "../../middlewares/multerMiddleware.js";
import {
  addagencyservice,
  updateagencyservice,
  Deleteagencyservice,
  getAllagencyservices,
  getSingleagencyservice,
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
  updateServiceDeliverable
} from "../../controllers/growth/agencyServices&PackagesController.js";


const router = express.Router();
//agency services Routes
// the route below http://localhost:3000/api/v1/agencyservices - POST
router.post("/add-service", upload.single("SOP_file"), addagencyservice);

// the route below http://localhost:3000/api/v1/agencyservices - PUT
router.put(
  "/update-service/:serviceID",
  upload.single("SOP_file"),
  updateagencyservice
);

// the route below http://localhost:3000/api/v1/agencyservices/get-all-service - GET
router.get("/get-all-service", getAllagencyservices);

// the route below http://localhost:3000/api/v1/agencyservices/get-single-service/:serviceID - GET
router.get("/get-single-service/:serviceID", getSingleagencyservice);

// the route below http://localhost:3000/api/v1/agencyservices/delete-service/:serviceID - DELETE
router.delete("/delete-service/:serviceID", Deleteagencyservice);


//agency Packages Routes
// the route below http://localhost:3000/api/v1/agencyservices/add-package - POST
router.post("/add-package", addagencyPackages);

// the route below http://localhost:3000/api/v1/agencyservices/update-package/:packageID - PUT
router.put("/update-package/:packageID", updateagencyPackages);

// the route below http://localhost:3000/api/v1/agencyservices/get-all-package - GET
router.get("/get-all-package", getAllagencyPackages);

// the route below http://localhost:3000/api/v1/agencyservices/get-single-package/:packageID - GET
router.get("/get-single-package/:packageID", getSingleagencyPackages);

// the route below http://localhost:3000/api/v1/agencyservices/delete-package/:packageID - DELETE
router.delete("/delete-package/:packageID", Deleteagencypackages);


// //agency Services & Packages Routes
// // the route below http://localhost:3000/api/v1/agencyservices/add-package - POST
router.post("/add-services&package", addagencyServicesPackage);

// the route below http://localhost:3000/api/v1/agencyservices/update-package/:packageID - PUT
router.put("/update-services&package/:id", updateagencyServicesPackage);

// the route below http://localhost:3000/api/v1/agencyservices/get-all-package - GET
router.get("/get-services&package", getAllagencyServicesPackages);

// the route below http://localhost:3000/api/v1/agencyservices/get-single-package/:packageID - GET
router.get("/get-services&package/:id", getagencyServicesPackageById);

// the route below http://localhost:3000/api/v1/agencyservices/delete-package/:packageID - DELETE
router.delete("/delete-services&package/:id", deleteagencyServicesPackage);


//agency Services Deliverables
// the route below http://localhost:3000/api/v1/agencyservices/add-package - POST
router.post("/add-servicedeliverable", createServiceDeliverable);

// the route below http://localhost:3000/api/v1/agencyservices/update-package/:packageID - PUT
router.put("/update-servicedeliverable/:id", updateServiceDeliverable);

// the route below http://localhost:3000/api/v1/agencyservices/get-all-package - GET
router.get("/get-servicedeliverable", getAllServiceDeliverables);

// the route below http://localhost:3000/api/v1/agencyservices/get-single-package/:packageID - GET
router.get("/get-servicedeliverable/:id", getServiceDeliverableById);

// the route below http://localhost:3000/api/v1/agencyservices/delete-package/:packageID - DELETE
router.delete("/delete-servicedeliverable/:id", deleteServiceDeliverable);


//agency Services pkg Deliverables
// the route below http://localhost:3000/api/v1/agencyservices/add-package - POST
// router.post("/add-spdeliverable", createServicepkgDeliverable);

// // the route below http://localhost:3000/api/v1/agencyservices/update-package/:packageID - PUT
// router.put("/update-spdeliverable/:id", updateServicepkgDeliverable);

// // the route below http://localhost:3000/api/v1/agencyservices/get-all-package - GET
// router.get("/get-spdeliverable", getAllServicepkgDeliverables);

// // the route below http://localhost:3000/api/v1/agencyservices/get-single-package/:packageID - GET
// router.get("/get-spdeliverable/:id", getServicepkgDeliverableById);

// // the route below http://localhost:3000/api/v1/agencyservices/delete-package/:packageID - DELETE
// router.delete("/delete-spdeliverable/:id", deleteServicepkgDeliverable);


export default router;
