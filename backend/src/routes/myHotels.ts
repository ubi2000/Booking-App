import express, { Request, Response } from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import Hotel, { hotelType } from "../models/hotel";
import { verifyToken } from "../middlewares/auth";
import { body } from "express-validator";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});
router.post(
  "/",
  verifyToken,
  [
    body("name").notEmpty().withMessage("name is Required"),
    body("city").notEmpty().withMessage("city is Required"),
    body("country").notEmpty().withMessage("country is Required"),
    body("description").notEmpty().withMessage("description is Required"),
    body("type").notEmpty().withMessage("type is Required"),
    body("pricePerNight")
      .notEmpty()
      .isNumeric()
      .withMessage("pricePerNight is Required and number only"),
    body("facilities")
      .notEmpty()
      .isArray()
      .withMessage("facilities is Required"),
    body("imageUrls").notEmpty().withMessage("imageUrls is Required"),
  ],
  upload.array("imageFiles", 6),
  async (req: Request, res: Response) => {
    try {
      const imageFiles = req.files as Express.Multer.File[];
      const newHotel: hotelType = req.body;

      const uploadPromises = imageFiles.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString("base64");
        let dataURI = "data:" + image.mimetype + ";base64," + b64;
        const res = await cloudinary.v2.uploader.upload(dataURI);
        return res.url;
      });
      const imageUrls = await Promise.all(uploadPromises);
      newHotel.imageUrls = imageUrls;
      newHotel.lastUpdated = new Date();
      newHotel.userId = req.userId;

      const hotel = new Hotel(newHotel);
      await hotel.save();
      res.status(201).send(hotel);
    } catch (error) {
      console.log("Error creating Hotel", error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);
export default router