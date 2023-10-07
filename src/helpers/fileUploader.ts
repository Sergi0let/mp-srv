import { existsSync, mkdirSync, rename } from 'fs';
import { diskStorage } from 'multer';

// Multer options
export const getMulterOptions = (relativePath: string = '') => ({
  limits: {
    fileSize: 1024 * 1024 * 3,
  },

  storage: diskStorage({
    destination: (_req: any, _file: any, cb: any) => {
      const storagePath = process.cwd() + '/storage/';
      const splittedRalativePath = relativePath.split('/');

      let incrementalPath = storagePath;

      if (!existsSync(storagePath + relativePath.replace(',', '/'))) {
        splittedRalativePath.forEach((folder) => {
          if (!existsSync(incrementalPath + folder)) {
            mkdirSync(incrementalPath + folder);
          }

          incrementalPath += folder + '/';
        });
      } else {
        incrementalPath += relativePath.replace(',', '/');
      }

      cb(null, incrementalPath);
    },

    filename: (_req: any, file: any, cb: any) => {
      cb(null, Math.ceil(Math.random() * 10000) + '_' + file.originalname);
    },
  }),
});

// Rename uploaded file
export const renameUploadedFile = (filename: string, directory: string) => {
  // New Timestamp-prefixed name
  const uploadedFile = changeFilenamesafe(filename);

  // Rename uploaded image
  rename(
    directory + filename, // this file rename
    directory + uploadedFile, // rename to
    (err) => {
      if (err) throw err;
    }, // error handling
  );

  return uploadedFile;
};

// Change uploading file's name to be duplicate-safe
const changeFilenamesafe = (origFilename: string) =>
  new Date().valueOf() +
  '_' +
  origFilename.replace(/\s/, '_').replace(/[^.a-zA-Z0-9_-]/g, '');
