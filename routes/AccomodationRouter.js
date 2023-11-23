const express = require("express");
const router = express.Router();
const { uploadHandler, uploadFileToFirebase } = require("../helpers/multer");
const {
  getAllAccommodations,
  getAccommodationById,
  createAccommodation,
  deleteAccommodation,
  updateAccommodation,
} = require("../controllers/AccomodationController");

router.get("/", getAllAccommodations);
router.get("/:id", getAccommodationById);
router.post("/", uploadHandler, uploadFileToFirebase, createAccommodation);
router.put("/:id", uploadHandler, uploadFileToFirebase, updateAccommodation);
router.delete("/:id", deleteAccommodation);

module.exports = router;
