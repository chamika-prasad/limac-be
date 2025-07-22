import homeService from "../services/home.service.js";
import path from "path";
import fs from "fs";

// Get all images
const getAllImages = async (req, res) => {
  try {
    const images = await homeService.getAllImages();
    return res.status(200).json(images);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error retrieving images",
      error: error.message,
    });
  }
};

// Add a new image
const addImage = async (req, res) => {
  try {
    const imagePath = path
      .join("uploads", "home", req.files["image"][0].originalname)
      .replace(/\\/g, "/");

    const imageData = {
      image: imagePath,
    };
    const newImage = await homeService.addImage(imageData);
    return res.status(201).json(newImage);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error adding image",
      error: error.message,
    });
  }
};

// Delete a image by ID
const deleteImage = async (req, res) => {
  try {
    const { id } = req.params;
    const existingImage = await homeService.getImageById(id);
    if (!existingImage.success) {
      return res.status(404).json({
        success: false,
        message: existingImage.message,
      });
    }

    const removeImages = (imagePath) => {
      const fullPath = path.join(process.cwd(), imagePath);
      if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
    };

    const deletedImage = await homeService.deleteImage(id);
    if (!deletedImage.success) {
      return res.status(404).json({
        success: false,
        message: deletedImage.message,
      });
    }

    const oldImagePath = existingImage.data.image;
    removeImages(oldImagePath);

    return res.status(200).json({
      success: true,
      message: deletedImage.message,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error deleting service",
      error: error.message,
    });
  }
};

export default {
  getAllImages,
  addImage,
  deleteImage,
};
