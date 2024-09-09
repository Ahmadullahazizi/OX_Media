import express from "express";
import branch from "../routes/growth/branchRoute.js";
import niche from "../routes/growth/nicheRoute.js";
import content from "../routes/growth/contentRoute.js";







const router = express.Router();

// Growth & Strategy routes 
router.use('/branch' , branch);
router.use('/niche' , niche);
router.use('/content' , content);


export default router;