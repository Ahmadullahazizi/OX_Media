import express from "express";
import { upload } from "../../middlewares/multerMiddleware.js";
const router = express.Router();
import {
    addDepartment,
    getDepartmentById,
    getDepartments,
    updateDepartment,
    deleteDepartment,
    addOffice,
    getOffice,
    getOfficeById,
    updateOffice,
    deleteOffice,
    addDivision,
    getDivisions,
    getDivisionById,
    deleteDivision,
    updateDivision,
    deleteDivisionposition,
    getDivisionpositionById,
    getDivisionpositions,
    updateDivisionposition,
    addDivisionposition, 
    addDepartmentposition,
    updateDepartmentposition,
    getDepartmentpositions,
    getDepartmentpositionById,
    deleteDepartmentposition,
    deleteOfficeposition,
    getOfficepositionById,
    getOfficepositions,
    updateOfficeposition,
    addOfficetposition} from '../../controllers/growth/oxDept&PositionController.js'

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


//Ox DIVISION Routes
// the route below http://localhost:3000/api/v1/oxmanagement/division - POST
router.post("/division", upload.single("SOP_file"), addDivision);

// the route below http://localhost:3000/api/v1/oxmanagement/department/:deptID - PUT
router.put(
  "/division/:divID",
  upload.single("SOP_file"),
  updateDivision
);

// the route below http://localhost:3000/api/v1/oxmanagement/department - GET
router.get("/division", getDivisions);

// the route below http://localhost:3000/api/v1/oxmanagement/department/deptID - GET
router.get("/division/:divID", getDivisionById);

// the route below http://localhost:3000/api/v1/oxmanagement/department/deptID - DELETE
router.delete("/division/:divID", deleteDivision);

//Ox DIVISION  POSITION Routes
// the route below http://localhost:3000/api/v1/oxmanagement/division/position - POST
router.post("/divisions/add-position", upload.single("SOP_file"), addDivisionposition);

// the route below http://localhost:3000/api/v1/oxmanagement/division/:deptID - PUT
router.put(
  "/divisions/update-position/:positionID",
  upload.single("SOP_file"),
  updateDivisionposition
);

// the route below http://localhost:3000/api/v1/oxmanagement/division/position - GET
router.get("/divisions/get-positions", getDivisionpositions);

// the route below http://localhost:3000/api/v1/oxmanagement/division/position/deptID - GET
router.get("/divisions/get-position/:positionID", getDivisionpositionById);

// the route below http://localhost:3000/api/v1/oxmanagement/division/position/deptID - DELETE
router.delete("/divisions/delete-position/:positionID", deleteDivisionposition);

//Ox DIVISION  POSITION Routes
// the route below http://localhost:3000/api/v1/oxmanagement/dept/position - POST
router.post("/dept/add-position", upload.single("SOP_file"), addDepartmentposition);

// the route below http://localhost:3000/api/v1/oxmanagement/dept/:deptID - PUT
router.put(
  "/dept/update-position/:positionID",
  upload.single("SOP_file"),
  updateDepartmentposition
);

// the route below http://localhost:3000/api/v1/oxmanagement/dept/position - GET
router.get("/dept/get-positions", getDepartmentpositions);

// the route below http://localhost:3000/api/v1/oxmanagement/dept/position/deptID - GET
router.get("/dept/get-position/:positionID", getDepartmentpositionById);

// the route below http://localhost:3000/api/v1/oxmanagement/dept/position/deptID - DELETE
router.delete("/dept/delete-position/:positionID", deleteDepartmentposition);

//Ox OFFICE  POSITION Routes
// the route below http://localhost:3000/api/v1/oxmanagement/offices/position - POST
router.post("/offices/add-position", upload.single("SOP_file"), addOfficetposition);

// the route below http://localhost:3000/api/v1/oxmanagement/offices/:deptID - PUT
router.put(
  "/offices/update-position/:positionID",
  upload.single("SOP_file"),
  updateOfficeposition
);

// the route below http://localhost:3000/api/v1/oxmanagement/offices/position - GET
router.get("/offices/get-positions", getOfficepositions);

// the route below http://localhost:3000/api/v1/oxmanagement/offices/position/deptID - GET
router.get("/offices/get-position/:positionID", getOfficepositionById);

// the route below http://localhost:3000/api/v1/oxmanagement/offices/position/deptID - DELETE
router.delete("/offices/delete-position/:positionID", deleteOfficeposition);












export default router;
