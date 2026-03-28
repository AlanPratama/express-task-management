import multer from "multer";
import path from "path";
import { HTTP_STATUS } from "../shared/constants/http.constant.js";
import { generateError } from "../shared/utils/error.js";
import { CONSTANT } from "../shared/constants/constant.js";

const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  limits: {
    fileSize: CONSTANT.MAX_FILE_SIZE,
  },
  fileFilter: (req, file, cb) => {
    const allowedExtensions =
      /\.(jpeg|jpg|png|gif|webp|heic|pdf|doc|docx|xls|xlsx|ppt|pptx|txt|csv|rtf|mp3|wav|m4a|mp4|mov|webm|zip|rar|7z)$/i;

    const isExtensionValid = allowedExtensions.test(
      path.extname(file.originalname).toLowerCase(),
    );

    const allowedMimeTypes =
      /^(image\/(jpeg|png|gif|webp|heic)|application\/(pdf|msword|vnd\.openxmlformats-officedocument\.|vnd\.ms-excel|vnd\.ms-powerpoint|zip|x-rar-compressed|vnd\.rar|x-7z-compressed|rtf)|text\/(plain|csv)|audio\/(mpeg|wav|x-wav|mp4|x-m4a)|video\/(mp4|quicktime|webm))$/i;
      
    const isMimeValid = allowedMimeTypes.test(file.mimetype);

    if (isExtensionValid && isMimeValid) {
      return cb(null, true);
    }

    cb(
      generateError(HTTP_STATUS.BAD_REQUEST, "Format file tidak diizinkan!"),
      false,
    );
  },
});
