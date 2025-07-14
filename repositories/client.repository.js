import { Client } from "./../models/index.js";

const getAllClients = async () => {
  try {
    const clients = await Client.findAll();
    return {
      success: true,
      data: clients,
      message: "Clients retrieved successfully",
    };
  } catch (error) {
    throw new Error(`Error in ClientRepository getAllClients: ${error}`);
  }
};

const getClientById = async (id) => {
  try {
    const client = await Client.findByPk(id);
    if (!client) {
      return {
        success: false,
        message: "Client not found",
      };
    }
    return {
      success: true,
      data: client,
      message: "Client retrieved successfully",
    };
  } catch (error) {
    throw new Error(`Error in ClientRepository getClientById: ${error}`);
  }
};

const addClient = async (clientData) => {
  try {
    const newClient = await Client.create(clientData);
    return {
      success: true,
      data: newClient,
      message: "Client added successfully",
    };
  } catch (error) {
    throw new Error(`Error in ClientRepository addClient: ${error}`);
  }
};

const updateClientById = async (id, updatedData) => {
  try {
    const [updatedRows] = await Client.update(updatedData, {
      where: { id },
    });

    if (updatedRows === 0) {
      return {
        success: false,
        message: "Client not found or no changes made",
      };
    }

    const updatedClient = await Client.findByPk(id);
    return {
      success: true,
      data: updatedClient,
      message: "Client updated successfully",
    };
  } catch (error) {
    throw new Error(`Error in ClientRepository updateClientById: ${error}`);
  }
};

const deleteClient = async (id) => {
  try {
    const deletedRows = await Client.destroy({
      where: { id },
    });

    if (deletedRows === 0) {
      return { success: false, message: "Client not found" };
    }

    return {
      success: true,
      message: "Client deleted successfully",
    };
  } catch (error) {
    throw new Error(`Error in ClientRepository deleteClient: ${error}`);
  }
};

export default {
  getAllClients,
  getClientById,
  addClient,
  updateClientById,
  deleteClient,
};
