import express from "express";
import branch from "../routes/growth/branchRoute.js";
import niche from "../routes/growth/nicheRoute.js";
import content from "../routes/growth/contentRoute.js";
import oxservices from "../routes/growth/oxservices&pkgRoutes.js";







const router = express.Router();

// Growth & Strategy routes 
router.use('/branch' , branch);
router.use('/niche' , niche);
router.use('/content' , content);
router.use('/oxservices' , oxservices);


export default router;