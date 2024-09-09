import express from "express";
import { addbranch, addbranchmanager, deleteBranch, deleteManager, getAllBranch, getAllManager, getSingleBranch, getSingleManager, updateBranch, updateManager } from "../../controllers/growth/branchController.js";
import { upload } from "../../middlewares/multerMiddleware.js";


const router = express.Router();
//Branch manager Routes
// the route below http://localhost:3000/api/v1/branch/manager - POST
router.post("/manager", upload.single("contract_file"),  addbranchmanager);

// the route below http://localhost:3000/api/v1/branch/ - GET
router.get("/manager", getAllManager);

// The rout below http://localhost:3000/api/v1/branch/:managerid - GET (Fetch one manager)
router.get("/manager/:managerid",   getSingleManager);

// The rout below http://localhost:3000/api/v1/branch/:managerid - PUT (Update manager Details)
router.put("/manager/:managerid", upload.single("contract_file"),  updateManager);

// The rout below http://localhost:3000/api/v1/branch/:managerid - DEL (Delete one manager)
router.delete("/manager/:managerid", deleteManager);


//Branch Routes
// the route below http://localhost:3000/api/v1/branch/ - POST
router.post("/" ,upload.fields([
    { name: 'legal_doc', maxCount: 1 },
    { name: 'proj_plan', maxCount: 1 }
  ]), addbranch);

  // the route below http://localhost:3000/api/v1/branch/ - GET
router.get("/" , getAllBranch);

// The rout below http://localhost:3000/api/v1/branch/:branchid - GET (Fetch one branch)
router.get("/:branchid",   getSingleBranch);

// The rout below http://localhost:3000/api/v1/branch/:branchid - PUT (Update Branch Details)
router.put("/:branchid", upload.fields([
    { name: 'legal_doc', maxCount: 1 },
    { name: 'proj_plan', maxCount: 1 }
  ]),   updateBranch);

// The rout below http://localhost:3000/api/v1/branch/:branchid - DEL (Delete one branch)
router.delete("/:branchid", deleteBranch);


export default router;