const multer = require("multer");
const admin = require("firebase-admin");
const serviceAccount = require("../config/mangogram-389f2-firebase-adminsdk-afwdf-fcb81d9845.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://mangogram-389f2.appspot.com",
});

const bucket = admin.storage().bucket();

const uploadHandler = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
}).single("image");

const uploadFileToFirebase = (req, res, next) => {
  if (!req.file) {
    return next();
  }

  const blob = bucket.file(req.file.originalname);
  const blobWriter = blob.createWriteStream({
    metadata: {
      contentType: req.file.mimetype,
    },
  });

  blobWriter.on("error", (err) => {
    next(err);
  });

  blobWriter.on("finish", () => {
    blob
      .getSignedUrl({
        action: "read",
        expires: "03-09-2491",
      })
      .then((signedUrls) => {
        req.file.firebaseUrl = signedUrls[0];
        next();
      })
      .catch((err) => {
        next(err);
      });
  });

  blobWriter.end(req.file.buffer);
};

module.exports = { uploadHandler, uploadFileToFirebase };
