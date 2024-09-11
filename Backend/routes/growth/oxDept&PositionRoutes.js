import express from "express";
import { upload } from "../../middlewares/multerMiddleware.js";
const router = express.Router();
import {addDepartment,
    getDepartmentById,
    getDepartments,
    updateDepartment,
    deleteDepartment,
    addOffice,
    getOffice,
    getOfficeById,
    updateOffice,
    deleteOffice} from '../../controllers/growth/oxDept&PositionController.js'

//Ox DEPARTMENT Routes
// the route below http://localhost:3000/api/v1/oxmanagement/department - POST
router.post("/department", upload.single("SOP_file"), addDepartment);

// the route below http://localhost:3000/api/v1/oxmanagement/department/:deptID - PUT
router.put(
  "/department/:deptID",
  upload.single("SOP_file"),
  updateDepartment
);

// the route below http://localhost:3000/api/v1/oxmanagement/department - GET
router.get("/department", getDepartments);

// the route below http://localhost:3000/api/v1/oxmanagement/department/deptID - GET
router.get("/department/:deptID", getDepartmentById);

// the route below http://localhost:3000/api/v1/oxmanagement/department/deptID - DELETE
router.delete("/department/:deptID", deleteDepartment);


//Ox OFFICE Routes
// the route below http://localhost:3000/api/v1/oxmanagement/office - POST
router.post("/office",  addOffice);

// the route below http://localhost:3000/api/v1/oxmanagement/office - POST
router.put("/office/:officeID",  updateOffice);

// the route below http://localhost:3000/api/v1/oxmanagement/office - POST
router.get("/office",  getOffice);

// the route below http://localhost:3000/api/v1/oxmanagement/office - POST
router.get("/office/:officeID",  getOfficeById);

// the route below http://localhost:3000/api/v1/oxmanagement/office - POST
router.delete("/office/:officeID",  deleteOffice);














export default router;
