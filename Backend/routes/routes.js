import express from "express";
import branch from "../routes/growth/branchRoute.js";
import niche from "../routes/growth/nicheRoute.js";
import content from "../routes/growth/contentRoute.js";
import agencyservices from "../routes/growth/agencyservices&pkgRoutes.js";
import agencymanagement from "../routes/growth/agencyDept&PositionRoutes.js";
import contentlibrary from "../routes/growth/contentLibraryRoutes.js";



const router = express.Router();

// Growth & Strategy routes 
router.use('/branch' , branch);
router.use('/niche' , niche);
router.use('/content' , content);
router.use('/agencyservices' , agencyservices);
router.use('/agencymanagement' , agencymanagement);
router.use('/library' , contentlibrary);


export default router;