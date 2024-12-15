import multer from "multer";
import path from "path"

const storage = multer.diskStorage({ 
    destination: (req, file, cb) => { cb(null, path.resolve('storage/user/idCard')); }, 
    filename: (req, file, cb) => { cb(null, Date.now() + path.extname(file.originalname));}
}); 
const fileFilter = (req, file, cb) => { 
    const allowedMimes = ['image/jpeg', 'image/png']; 
    if (allowedMimes.includes(file.mimetype)) 
        { cb(null, true); } 
    else { cb(new Error('Invalid file type. Only JPEG and PNG are allowed.'), false); }
};
const idCardMulter = multer({ 
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 },
    fileFilter: fileFilter
});

export default idCardMulter;