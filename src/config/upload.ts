import crypto from "crypto";
import multer from "multer";
import { resolve } from "path";

// export default {
//   upload(folder: string) {
//     return {
//       storage: multer.diskStorage({
//         destination: resolve(__dirname, "..", "..", folder),
//         filename: (request, file, callback) => {
//           const fileHash = crypto.randomBytes(16).toString("hex");
//           const filename = `${fileHash}-${file.originalname}`;
//           // null for error
//           return callback(null, filename);
//         },
//       }),
//     };
//   },
// };

// Modification due to AWS S3

const tmpFolder = resolve(__dirname, "..", "..", "tmp");

export default {
  tmpFolder,

  storage: multer.diskStorage({
    destination: tmpFolder,
    filename: (request, file, callback) => {
      const fileHash = crypto.randomBytes(16).toString("hex");
      const filename = `${fileHash}-${file.originalname}`;
      // null for error
      return callback(null, filename);
    },
  }),
};
