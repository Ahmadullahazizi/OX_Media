import multer from "multer";
import { v4 as uuidv4 } from 'uuid';
import path from "path";


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/files')
    },
    filename: function (req, file, cb) {
      const newFileName = uuidv4() + path.extname(file.originalname)
      cb(null, newFileName)
    }
  })
   
  export const upload = multer({ storage: storage });
//uploading multiple files  
  // export const uploadMultiple = multer({ storage: storage }).fields([
  //   { name: 'legal_doc', maxCount: 1 },
  //   { name: 'proj_plan', maxCount: 1 }
  // ]);
