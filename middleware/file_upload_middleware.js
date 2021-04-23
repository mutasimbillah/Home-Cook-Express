/* eslint-disable prettier/prettier */
const util = require('util');
const multer = require('multer');
const path = require('path');
const ErrorResponse = require('../utils/error_response');

const MAX_SIZE = 2 * 1024 * 1024;
const UPLOADS_FOLDER = './uploads/';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOADS_FOLDER);
    },
    filename: (req, file, cb) => {
        const fileExt = path.extname(file.originalname);
        const fileName = `${file.originalname
            .replace(fileExt, '')
            .toLowerCase()
            .split(' ')
            .join('-')}-${Date.now()}`;

        cb(null, fileName + fileExt);
    },
});

const uploadFile = multer({
    storage,
    limits: { fileSize: MAX_SIZE },
    fileFilter: (req, file, cb) => {
        if (file.fieldname === 'file') {
            if (
                file.mimetype === 'image/png'
                || file.mimetype === 'image/jpg'
                || file.mimetype === 'image/jpeg'
            ) {
                cb(null, true);
            } else {
                cb(new ErrorResponse('Only .jpg, .png or .jpeg format allowed!', 400));
            }
        } else {
            cb(new ErrorResponse('Image upload unknown Error', 400));
        }
    },
}).single('file');

const uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;
