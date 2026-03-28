import { CLOUDINARY_FOLDER } from "../../shared/constants/cloudinary.constant.js"

export const TaskUtil = {
    CLOUDINARY_FOLDER_TASK: (taskId) => {
        return CLOUDINARY_FOLDER.TASK + "-" + taskId
    }
}