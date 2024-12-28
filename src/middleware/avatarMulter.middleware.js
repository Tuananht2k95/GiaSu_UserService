import multer, { MulterError } from "multer";
import path from "path";

const storage = multer.diskStorage({ 
    destination: (req, file, cb) => { cb(null, path.resolve('storage/user/avatar')); }, 
    filename: (req, file, cb) => { cb(null, Date.now() + path.extname(file.originalname));}
    },
    
); 
const fileFilter = (req, file, cb) => { 
    const allowedMimes = ['image/png', 'image/jpeg']; 

    if (allowedMimes.includes(file.mimetype)) 
        { cb(null, true); } 
    else { 
        const multerError = new MulterError();
        multerError.field = 'avatar';
        multerError.message = 'Invalid file type. Only JPEG and PNG are allowed.';

        cb(multerError,false); 
    }
};
const avatarMulter = multer({ 
    storage: storage,
    limits: { fileSize: 2 * 1024 *1024},
    fileFilter: fileFilter
});

export default avatarMulter;