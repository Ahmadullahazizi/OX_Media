import express from "express";
import { upload } from "../../middlewares/multerMiddleware.js";
import { addoxservice } from "../../controllers/growth/oxServices&PackagesController.js";


const router = express.Router();
//Niche Routes
// the route below http://localhost:3000/api/v1/oxservices - POST
router.post("/add-service", upload.single("SOP_file"), addoxservice);




export default router;