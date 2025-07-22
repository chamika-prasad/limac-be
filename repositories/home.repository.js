import { Home } from "./../models/index.js";

const getAllImages = async () => {
  try {
    const images = await Home.findAll();
    return {
      success: true,
      data: images,
      message: "Home images retrieved successfully",
    };
  } catch (error) {
    throw new Error(`Error in HomeRepository getAllimages: ${error}`);
  }
};

const addImage = async (ImageData) => {
  try {
    const newImage = await Home.create(ImageData);
    return {
      success: true,
      data: newImage,
      message: "Image added successfully",
    };
  } catch (error) {
    throw new Error(`Error in HomeRepository addImage: ${error}`);
  }
};

const deleteImage = async (id) => {
  try {
    const deletedRows = await Home.destroy({
      where: { id },
    });

    if (deletedRows === 0) {
      return { success: false, message: "Image not found" };
    }

    return {
      success: true,
      message: "Image deleted successfully",
    };
  } catch (error) {
    throw new Error(`Error in HomeRepository deleteImage: ${error}`);
  }
};

const getImageById = async (id) => {
  try {
    const image = await Home.findByPk(id);

    if (!image) {
      return {
        success: false,
        message: "Image not found",
      };
    }

    return {
      success: true,
      data: image,
      message: "Image retrieved successfully",
    };
  } catch (error) {
    throw new Error(`Error in HomeRepository getImageById: ${error}`);
  }
};

export default {
  getAllImages,
  addImage,
  deleteImage,
  getImageById,
};
