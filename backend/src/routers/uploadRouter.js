import multer from 'multer';
import express from 'express';
import { isAuth, isAdmin } from '../utils.js';
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';

const uploadRouter = express.Router();
const upload = multer();
uploadRouter.post(
  '/',
  isAuth,
  isAdmin,
  upload.single('image'),
  async (req, res) => {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const streamUpload = (req) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream((error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        });
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };
    const result = await streamUpload(req);
    res.send(result);
  }
);

// LOCAL UPLOAD
// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename(req, file, cb) {
//     cb(null, `${Date.now()}.jpg`);
//   },
// });

// const upload = multer({ storage });

// uploadRouter.post('/', isAuth, upload.single('image'), (req, res) => {
//   res.send({ image: `/${req.file.path}` });
// });

export default uploadRouter;
