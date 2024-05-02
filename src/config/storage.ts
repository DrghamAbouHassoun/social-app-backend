import * as multer from "multer";

export const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./upload");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9) + "." + file.mimetype.split("/")[1];
        cb(null, file.fieldname + "-" + uniqueSuffix);
    }
})

export const postsStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images/posts');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9) + "." + file.mimetype.split("/")[1];
        cb(null, file.fieldname + "-" + uniqueSuffix);
    }
});

export const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9) + "." + file.mimetype.split("/")[1];
        cb(null, file.fieldname + "-" + uniqueSuffix);
    }
})