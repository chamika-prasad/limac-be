import serviceService from "../services/service.service.js";
import path from "path";
import fs from "fs";

// Get all services
const getAllServices = async (req, res) => {
  try {
    const services = await serviceService.getAllServices();
    return res.status(200).json(services);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error retrieving services",
      error: error.message,
    });
  }
};

// Add a new service
const addService = async (req, res) => {
  try {
    const serviceData = req.body;
    const serviceFolder = serviceData.id;
    const logoPath = path
      .join(
        "uploads",
        "services",
        serviceFolder,
        req.files["logo"][0].originalname
      )
      .replace(/\\/g, "/");
    const imagePath = path
      .join(
        "uploads",
        "services",
        serviceFolder,
        req.files["image"][0].originalname
      )
      .replace(/\\/g, "/");

    const newServiceData = {
      ...serviceData,
      logo: logoPath,
      image: imagePath,
    };
    const newService = await serviceService.addService(newServiceData);
    return res.status(201).json(newService);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error adding service",
      error: error.message,
    });
  }
};

// Update a service by ID
const updateServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const existingService = await serviceService.getServiceById(id);

    if (!existingService.success) {
      return res.status(404).json({
        success: false,
        message: existingService.message,
      });
    }

    const removeImages = (imagePath) => {
      const fullPath = path.join(process.cwd(), imagePath);
      if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
    };

    if (req.files["logo"] && req.files["logo"][0]) {
      const oldLogoPath = existingService.data.logo;
      removeImages(oldLogoPath);
      const newLogoPath = path
        .join(
          "uploads",
          "services",
          id,
          req.files["logo"][0].originalname
        )
        .replace(/\\/g, "/");
      updatedData.logo = newLogoPath;
    }

    if (req.files["image"] && req.files["image"][0]) {
      const oldImagePath = existingService.data.image;
      removeImages(oldImagePath);
      const newImagePath = path
        .join(
          "uploads",
          "services",
          id,
          req.files["image"][0].originalname
        )
        .replace(/\\/g, "/");
      updatedData.image = newImagePath;
    }

    const updatedService = await serviceService.updateServiceById(
      id,
      updatedData
    );
    if (!updatedService.success) {
      return res.status(400).json({
        success: false,
        message: updatedService.message,
      });
    }
    return res.status(200).json({
      success: true,
      message: updatedService.message,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error updating service",
      error: error.message,
    });
  }
};

// Delete a service by ID
const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedService = await serviceService.deleteService(id);
    if (!deletedService.success) {
      return res.status(404).json({
        success: false,
        message: deletedService.message,
      });
    }
    return res.status(200).json({
      success: true,
      message: deletedService.message,
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
  getAllServices,
  addService,
  updateServiceById,
  deleteService,
};
