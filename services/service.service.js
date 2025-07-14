import serviceRepository from "../repositories/service.repository.js";

const getAllServices = async () => {
  try {
    const result = await serviceRepository.getAllServices();
    return result;
  } catch (error) {
    throw new Error(`Error in ServiceService getAllServices: ${error}`);
  }
};

const addService = async (serviceData) => {
  try {
    const result = await serviceRepository.addService(serviceData);
    return result;
  } catch (error) {
    throw new Error(`Error in ServiceService addService: ${error}`);
  }
};

const updateServiceById = async (id, updatedData) => {
  try {
    const result = await serviceRepository.updateServiceById(id, updatedData);
    return result;
  } catch (error) {
    throw new Error(`Error in ServiceService updateServiceById: ${error}`);
  }
};

const deleteService = async (id) => {
  try {
    const result = await serviceRepository.deleteService(id);
    return result;
  } catch (error) {
    throw new Error(`Error in ServiceService deleteService: ${error}`);
  }
};

const getServiceById = async (id) => {
  try {
    const result = await serviceRepository.getServiceById(id);
    return result;
  } catch (error) {
    throw new Error(`Error in ServiceService getServiceById: ${error}`);
  }
};

export default {
  getAllServices,
  addService,
  updateServiceById,
  deleteService,
  getServiceById,
};
