const aws = require("aws-sdk");
const uuid = require("uuid");
const multer = require("multer");
const multers3 = require("multer-s3");

const bucketName = `amplify-mydish-be-dev-174150-deployment`;

var credentials = new aws.SharedIniFileCredentials({
  profile: "finalpuppy"
});
aws.config.credentials = credentials;

const s3 = new aws.S3();

const fileFilter = (request, file, cb) => {
  console.log("fileFilter executing");
  console.log("file:", file);
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type, only JPEG and PNG is allowed!"), false);
  }
};

const uploadImage = multer({
  fileFilter,
  storage: multers3({
    acl: "public-read",
    s3,
    bucket: bucketName,
    metadata: (request, file, cb) => {
      cb(null, { fieldName: "testy test test metadata wow" });
    },
    key: (request, file, cb) => {
      cb(null, Date.now().toString());
    }
  })
}).single("image");

module.exports = { uploadImage };
