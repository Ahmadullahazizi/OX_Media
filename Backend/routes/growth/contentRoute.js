import express from "express";
import { upload } from "../../middlewares/multerMiddleware.js";
import {
  addPostType,
  getAllPostType,
  getSinglePostType,
  UpdatePostType,
  DeletePostType,
  addPostTypeSample,
  getAllPtypeSample,
  getSinglePostTypeSample,
  updatePostTypeSample,
  deletePostTypeSample,
  addReelType,
  getAllReelType,
  getSingleReelType,
  UpdateReelType,
  DeleteReelType,
  addReelTypeSample,
  getAllRtypeSample,
  getSingleReelTypeSample,
  updateReelTypeSample,
  deleteReelTypeSample,
  addTechTypeSample,
  getAllTechTypeSample,
  getAllSubNichetech,
  getSingleTechTypeSample,
  updateTechTypeSample,
  addWebSample,
  getAllWebSample,
  getSingleWebSample,
  deleteWebSample,
  updateWebSample,
  deleteTechTypeSample,
  addAdsSample,
  getAllAdsSample,
  getSingleAdsSample,
  deleteAdsSample,
  updateAdsSample,
  addLPSample,
  getAllLPSample,
  getSingleLPSample,
  deleteLPSample,
  updateLPSample,
  addKeywords,
  getAllKeyword,
  getSingleKeyword,
  DeleteKeyword,
  updateKeyword
} from "../../controllers/growth/contentController.js";

const router = express.Router();

//----------POST----------
// the route below http://localhost:3000/api/v1/content - POST
router.post("/add-posttype", addPostType);

// the route below http://localhost:3000/api/v1/content/get-posttype - POST
router.get("/get-posttype", getAllPostType);

// the route below http://localhost:3000/api/v1/content/get-single-posttype/:ptypeid - POST
router.get("/get-single-posttype/:ptypeid", getSinglePostType);

// the route below http://localhost:3000/api/v1/content/update-posttype/:ptypeid - POST
router.put("/update-posttype/:ptypeid", UpdatePostType);

// the route below http://localhost:3000/api/v1/content/delete-posttype/:ptypeid - POST
router.delete("/delete-posttype/:ptypeid", DeletePostType);

//----------POST Sample----------
// the route below http://localhost:3000/api/v1/content//add-ptypesample - POST
router.post("/add-ptypesample", upload.single("media_file"), addPostTypeSample);

// the route below http://localhost:3000/api/v1/content//get-ptypesample - POST
router.get("/get-ptypesample", getAllPtypeSample);

// the route below http://localhost:3000/api/v1/content//get-single-ptypesample/:sampleid - POST
router.get("/get-single-ptypesample/:sampleid", getSinglePostTypeSample);

// the route below http://localhost:3000/api/v1/content//update-ptypesample/:sampleid - POST
router.put(
  "/update-ptypesample/:sampleid",
  upload.single("media_file"),
  updatePostTypeSample
);

// the route below http://localhost:3000/api/v1/content//update-ptypesample/:sampleid - POST
router.delete("/delete-ptypesample/:sampleid", deletePostTypeSample);

//----------REEL----------
// the route below http://localhost:3000/api/v1/content - POST
router.post("/add-reeltype", addReelType);

// the route below http://localhost:3000/api/v1/content/get-posttype - POST
router.get("/get-reeltype", getAllReelType);

// the route below http://localhost:3000/api/v1/content/get-single-posttype/:ptypeid - POST
router.get("/get-single-reeltype/:rtypeid", getSingleReelType);

// the route below http://localhost:3000/api/v1/content/update-posttype/:ptypeid - POST
router.put("/update-reeltype/:rtypeid", UpdateReelType);

// the route below http://localhost:3000/api/v1/content/delete-posttype/:ptypeid - POST
router.delete("/delete-reeltype/:rtypeid", DeleteReelType);

//----------REEL Sample----------
// the route below http://localhost:3000/api/v1/content//add-rtypesample - POST
router.post("/add-rtypesample", upload.single("media_file"), addReelTypeSample);

// the route below http://localhost:3000/api/v1/content//get-rtypesample - POST
router.get("/get-rtypesample", getAllRtypeSample);

// the route below http://localhost:3000/api/v1/content/get-single-rtypesample/:sampleid - POST
router.get("/get-single-rtypesample/:sampleid", getSingleReelTypeSample);

// the route below http://localhost:3000/api/v1/content/update-rtypesample/:sampleid - POST
router.put(
  "/update-rtypesample/:sampleid",
  upload.single("media_file"),
  updateReelTypeSample
);
// the route below http://localhost:3000/api/v1/content/update-rtypesample/:sampleid - POST
router.delete("/delete-rtypesample/:sampleid", deleteReelTypeSample);

//-----------TECHNOLOGY ROUTE////////////
// the route below http://localhost:3000/api/v1/content/add-techtype - POST
router.post("/add-techtype", addTechTypeSample);

// the route below http://localhost:3000/api/v1/content/get-techtype - POST
router.get("/get-techtype", getAllTechTypeSample);

// the route below http://localhost:3000/api/v1/content/get-single-techtype/:techid - POST
router.get("/get-single-techtype/:techid", getSingleTechTypeSample);

// the route below http://localhost:3000/api/v1/content/delete-techtype/:techid - DEL
router.delete("/delete-techtype/:techid", deleteTechTypeSample);

// the route below http://localhost:3000/api/v1/niche/content/get-all-techtype - GET
router.get("/get-all-subtech/:subid",  getAllSubNichetech);

// the route below http://localhost:3000/api/v1/niche/content/update-techtype/:techid - PUT
router.put("/update-techtype/:techid",  updateTechTypeSample);


//-----------WEBSITE ROUTE////////////
// the route below http://localhost:3000/api/v1/content/add-websitesample - POST
router.post("/add-websitesample",  upload.single("media_file"), addWebSample);

// the route below http://localhost:3000/api/v1/content/get-websitesample - POST
router.get("/get-websitesample", getAllWebSample);

// the route below http://localhost:3000/api/v1/content/get-single-websitesample/:webid - POST
router.get("/get-single-websitesample/:webid", getSingleWebSample);

// the route below http://localhost:3000/api/v1/content/get-single-websitesample/:webid - DEL
router.delete("/delete-websitesample/:webid", deleteWebSample);

// the route below http://localhost:3000/api/v1/niche/content/update-websitesample/:webid - PUT
router.put("/update-websitesample/:webid",  upload.single("media_file"),  updateWebSample);


//-----------ADS ROUTE////////////
// the route below http://localhost:3000/api/v1/content/add-adssample - POST
router.post("/add-adssample",  upload.single("media_file"), addAdsSample);

// the route below http://localhost:3000/api/v1/content/get-adssample - POST
router.get("/get-adssample", getAllAdsSample);

// the route below http://localhost:3000/api/v1/content/get-single-webssample/:webid - POST
router.get("/get-single-adssample/:adsid", getSingleAdsSample);

// the route below http://localhost:3000/api/v1/content/get-single-adssample/:webid - DEL
router.delete("/delete-adssample/:adsid", deleteAdsSample);

// the route below http://localhost:3000/api/v1/niche/content/update-adssample/:webid - PUT
router.put("/update-adssample/:adsid",  upload.single("media_file"),  updateAdsSample);


//-----------LANDING PAGE ROUTE////////////
// the route below http://localhost:3000/api/v1/content/add-lpsample - POST
router.post("/add-lpsample",  upload.single("media_file"), addLPSample);

// the route below http://localhost:3000/api/v1/content/get-lpsample - POST
router.get("/get-lpsample", getAllLPSample);

// the route below http://localhost:3000/api/v1/content/get-single-lpsample/:lpid - POST
router.get("/get-single-lpsample/:lpid", getSingleLPSample);

// the route below http://localhost:3000/api/v1/content/get-single-lpsample/:lpid - DEL
router.delete("/delete-lpsample/:lpid", deleteLPSample);

// the route below http://localhost:3000/api/v1/niche/content/update-lpsample/:lpid - PUT
router.put("/update-lpsample/:lpid",  upload.single("media_file"),  updateLPSample);


//-----------KEYWORD ROUTE////////////
// the route below http://localhost:3000/api/v1/content/add-keyword - POST
router.post("/add-keyword", addKeywords);

// the route below http://localhost:3000/api/v1/content/get-keyword - GET
router.get("/get-keyword", getAllKeyword);

// the route below http://localhost:3000/api/v1/content/get-single-keyword/:keywordid - GET
router.get("/get-single-keyword/:keywordid", getSingleKeyword);

// the route below http://localhost:3000/api/v1/content/get-single-keyword/:keywordid - DEL
router.delete("/delete-keyword/:keywordid", DeleteKeyword);

// the route below http://localhost:3000/api/v1/niche/content/update-keyword/:keywordid - PUT
router.put("/update-keyword/:keywordid", updateKeyword);




export default router;
