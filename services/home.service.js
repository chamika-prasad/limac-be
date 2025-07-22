import homeRepository from "../repositories/home.repository.js";

const getAllImages = async () => {
  try {
    const result = await homeRepository.getAllImages();
    return result;
  } catch (error) {
    throw new Error(`Error in HomeService getAllImages: ${error}`);
  }
};

const addImage = async (ImageData) => {
  try {
    const result = await homeRepository.addImage(ImageData);
    return result;
  } catch (error) {
    throw new Error(`Error in HomeService addImage: ${error}`);
  }
};

const deleteImage = async (id) => {
  try {
    const result = await homeRepository.deleteImage(id);
    return result;
  } catch (error) {
    throw new Error(`Error in HomeService deleteImage: ${error}`);
  }
};

const getImageById = async (id) => {
  try {
    const result = await homeRepository.getImageById(id);
    return result;
  } catch (error) {
    throw new Error(`Error in HomeService getImageById: ${error}`);
  }
};

export default {
  getAllImages,
  addImage,
  deleteImage,
  getImageById,
};
