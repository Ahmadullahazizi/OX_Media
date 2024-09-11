import express from "express";
import branch from "../routes/growth/branchRoute.js";
import niche from "../routes/growth/nicheRoute.js";
import content from "../routes/growth/contentRoute.js";
import oxservices from "../routes/growth/oxservices&pkgRoutes.js";
import oxmanagement from "../routes/growth/oxDept&PositionRoutes.js";







const router = express.Router();

// Growth & Strategy routes 
router.use('/branch' , branch);
router.use('/niche' , niche);
router.use('/content' , content);
router.use('/oxservices' , oxservices);
router.use('/oxmanagement' , oxmanagement);


export default router;