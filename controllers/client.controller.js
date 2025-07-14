import clientService from "../services/client.service.js";

// Get all clients
const getAllClients = async (req, res) => {
  try {
    const clients = await clientService.getAllClients();
    return res.status(200).json(clients);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error retrieving clients",
      error: error.message,
    });
  }
};

// Get client by ID
const getClientById = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await clientService.getClientById(id);
    if (!client.success) {
      return res.status(404).json({
        success: false,
        message: client.message,
      });
    }
    return res.status(200).json(client);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error retrieving client",
      error: error.message,
    });
  }
};

// Add a new client
const addClient = async (req, res) => {
  try {
    const clientData = req.body;
    const newClient = await clientService.addClient(clientData);
    return res.status(201).json(newClient);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error adding client",
      error: error.message,
    });
  }
};

// Update a client by ID
const updateClientById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const updatedClient = await clientService.updateClientById(id, updatedData);
    if (!updatedClient.success) {
      return res.status(404).json({
        success: false,
        message: updatedClient.message,
      });
    }
    return res.status(200).json({
      success: true,
      message: updatedClient.message,
      data: updatedClient.data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error updating client",
      error: error.message,
    });
  }
};

// Delete a client by ID
const deleteClient = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedClient = await clientService.deleteClient(id);
    if (!deletedClient.success) {
      return res.status(404).json({
        success: false,
        message: deletedClient.message,
      });
    }
    return res.status(200).json({
      success: true,
      message: deletedClient.message,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error deleting client",
      error: error.message,
    });
  }
};

export default {
  getAllClients,
  getClientById,
  addClient,
  updateClientById,
  deleteClient,
};
