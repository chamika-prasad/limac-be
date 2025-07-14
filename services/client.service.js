import clientRepository from "../repositories/client.repository.js";

const getAllClients = async () => {
  try {
    const result = await clientRepository.getAllClients();
    return result;
  } catch (error) {
    throw new Error(`Error in ClientService getAllClients: ${error}`);
  }
};

const getClientById = async (id) => {
  try {
    const result = await clientRepository.getClientById(id);
    return result;
  } catch (error) {
    throw new Error(`Error in ClientService getClientById: ${error}`);
  }
};

const addClient = async (clientData) => {
  try {
    const result = await clientRepository.addClient(clientData);
    return result;
  } catch (error) {
    throw new Error(`Error in ClientService addClient: ${error}`);
  }
};

const updateClientById = async (id, updatedData) => {
  try {
    const result = await clientRepository.updateClientById(id, updatedData);
    return result;
  } catch (error) {
    throw new Error(`Error in ClientService updateClientById: ${error}`);
  }
};

const deleteClient = async (id) => {
  try {
    const result = await clientRepository.deleteClient(id);
    return result;
  } catch (error) {
    throw new Error(`Error in ClientService deleteClient: ${error}`);
  }
};

export default {
  getAllClients,
  getClientById,
  addClient,
  updateClientById,
  deleteClient,
};
