import { diskStorage } from 'multer';
export const multerOptions = {
  storage: diskStorage({
    destination: './static/uploads',
    filename: (req, file, callback) => {
      const uniquSuffix = Date.now() + '_' + Math.round(Math.random() * 1e9);
      const extension = file.originalName.split('.').pop();
      callback(null, uniquSuffix + '.' + extension);
    },
  }),
};
