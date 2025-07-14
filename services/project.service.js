import projectRepository from "../repositories/project.repository.js";

const getAllProjects = async () => {
  try {
    const result = await projectRepository.getAllProjects();
    return result;
  } catch (error) {
    throw new Error(`Error in ProjectService getAllProjects: ${error}`);
  }
};

const getProjectById = async (id) => {
  try {
    const result = await projectRepository.getProjectById(id);
    return result;
  } catch (error) {
    throw new Error(`Error in ProjectService getProjectById: ${error}`);
  }
};

const addProject = async (projectData) => {
  try {
    const result = await projectRepository.addProject(projectData);
    return result;
  } catch (error) {
    throw new Error(`Error in ProjectService addProject: ${error}`);
  }
};

const updateProjectById = async (id, updatedData) => {
  try {
    const result = await projectRepository.updateProjectById(id, updatedData);
    return result;
  } catch (error) {
    throw new Error(`Error in ProjectService updateProjectById: ${error}`);
  }
};

const deleteProject = async (id) => {
  try {
    const result = await projectRepository.deleteProject(id);
    return result;
  } catch (error) {
    throw new Error(`Error in ProjectService deleteProject: ${error}`);
  }
};

export default {
  getAllProjects,
  getProjectById,
  addProject,
  updateProjectById,
  deleteProject,
};
