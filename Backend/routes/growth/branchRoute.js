import express from "express";
import { addbranch, deleteBranch, getAllBranch, getSingleBranch, updateBranch } from "../../controllers/growth/branchController.js";
import { upload } from "../../middlewares/multerMiddleware.js";


const router = express.Router();

//Branch Routes
// the route below http://localhost:3000/api/v1/branch/ - POST
router.post("/" ,upload.fields([
    { name: 'legal_doc', maxCount: 1 },
    { name: 'proj_plan', maxCount: 1 },
    { name: 'contract_file', maxCount: 1 }
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