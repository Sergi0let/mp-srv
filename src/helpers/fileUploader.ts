import fs, { existsSync, mkdirSync, rename } from 'fs';
import { diskStorage } from 'multer';

// Rename uploaded file
export const renameUploadedFile = (filename: string, directory: string) => {
  // New Timestamp-prefixed name
  const uploadedFile = changeFilenamesafe(filename);

  // Rename uploaded image
  rename(
    directory + filename, // this file rename
    directory + uploadedFile, // rename to
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (_err) => {}, // error handling
  );

  return uploadedFile;
};

// Change uploading file's name to be duplicate-safe
const changeFilenamesafe = (origFilename: string) =>
  new Date().valueOf() +
  '_' +
  origFilename.replace(/\s/, '_').replace(/[^.a-zA-Z0-9_-]/g, '');
