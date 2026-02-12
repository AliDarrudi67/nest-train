import { BadRequestException } from '@nestjs/common';
import { diskStorage } from 'multer';
const allowedFileTypes = ['image/jpeg', 'image/png'];
const maxFileSize = 1 * 1024 * 1024;
export const multerOptions = {
  storage: diskStorage({
    destination: './static/uploads',
    filename: (req, file, callback) => {
      const uniquSuffix = Date.now() + '_' + Math.round(Math.random() * 1e9);
      const extension = file.originalname.split('.').pop();
      callback(null, uniquSuffix + '.' + extension);
    },
  }),
  fileFilter: (req, file, callback) => {
    if (allowedFileTypes.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new BadRequestException('File type not allowed'), false);
    }
  },
  limits: {
    fileSize: maxFileSize,
  },
};
