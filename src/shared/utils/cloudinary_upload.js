import streamifier from "streamifier";
import { getCloudinary } from "./cloudinary.js";

export const cloudinaryUploadBuffer = (
  folder,
  transformation = [],
  fileBuffer,
) => {
  return new Promise((resolve, reject) => {
    const stream = getCloudinary().uploader.upload_stream(
      {
        folder,
        transformation,
      },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      },
    );

    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};

export const cloudinaryDeleteFile = async (publicId) => {
  return await getCloudinary().uploader.destroy(publicId);
};
