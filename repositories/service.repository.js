import { Service } from "./../models/index.js";

const getAllServices = async () => {
  try {
    const services = await Service.findAll();
    return {
      success: true,
      data: services,
      message: "Services retrieved successfully",
    };
  } catch (error) {
    throw new Error(`Error in ServiceRepository getAllServices: ${error}`);
  }
};

const addService = async (serviceData) => {
  try {
    const newService = await Service.create(serviceData);
    return {
      success: true,
      data: newService,
      message: "Service added successfully",
    };
  } catch (error) {
    throw new Error(`Error in ServiceRepository addService: ${error}`);
  }
};

const updateServiceById = async (id, updatedData) => {
  try {
    const [updatedRows] = await Service.update(updatedData, {
      where: { id },
    });

    if (updatedRows === 0) {
      return {
        success: false,
        message: "No changes made",
      };
    }

    return {
      success: true,
      message: "Service updated successfully",
    };
  } catch (error) {
    throw new Error(`Error in ServiceRepository updateServiceById: ${error}`);
  }
};

const deleteService = async (id) => {
  try {
    const deletedRows = await Service.destroy({
      where: { id },
    });

    if (deletedRows === 0) {
      return { success: false, message: "Service not found" };
    }

    return {
      success: true,
      message: "Service deleted successfully",
    };
  } catch (error) {
    throw new Error(`Error in ServiceRepository deleteService: ${error}`);
  }
};

const getServiceById = async (id) => {
  try {
    const service = await Service.findByPk(id);

    if (!service) {
      return {
        success: false,
        message: "Service not found",
      };
    }

    return {
      success: true,
      data: service,
      message: "Service retrieved successfully",
    };
  } catch (error) {
    throw new Error(`Error in ServiceRepository getServiceById: ${error}`);
  }
};

export default {
  getAllServices,
  addService,
  updateServiceById,
  deleteService,
  getServiceById,
};
