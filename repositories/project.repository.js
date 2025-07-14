import { Project } from "./../models/index.js";

const getAllProjects = async () => {
  try {
    const projects = await Project.findAll();
    return {
      success: true,
      data: projects,
      message: "Projects retrieved successfully",
    };
  } catch (error) {
    throw new Error(`Error in ProjectRepository getAllProjects: ${error}`);
  }
};

const getProjectById = async (id) => {
  try {
    const project = await Project.findByPk(id);
    if (!project) {
      return {
        success: false,
        message: "Project not found",
      };
    }
    return {
      success: true,
      data: project,
      message: "Project retrieved successfully",
    };
  } catch (error) {
    throw new Error(`Error in ProjectRepository getProjectById: ${error}`);
  }
};

const addProject = async (projectData) => {
  try {
    const newProject = await Project.create(projectData);
    return {
      success: true,
      data: newProject,
      message: "Project added successfully",
    };
  } catch (error) {
    throw new Error(`Error in ProjectRepository addProject: ${error}`);
  }
};

const updateProjectById = async (id, updatedData) => {
  try {
    const [updatedRows] = await Project.update(updatedData, {
      where: { id },
    });

    if (updatedRows === 0) {
      return {
        success: false,
        message: "Project not found or no changes made",
      };
    }

    const updatedProject = await Project.findByPk(id);
    return {
      success: true,
      data: updatedProject,
      message: "Project updated successfully",
    };
  } catch (error) {
    throw new Error(`Error in ProjectRepository updateProjectById: ${error}`);
  }
};

const deleteProject = async (id) => {
  try {
    const deletedRows = await Project.destroy({
      where: { id },
    });

    if (deletedRows === 0) {
      return { success: false, message: "Project not found" };
    }

    return {
      success: true,
      message: "Project deleted successfully",
    };
  } catch (error) {
    throw new Error(`Error in ProjectRepository deleteProject: ${error}`);
  }
};

export default {
  getAllProjects,
  getProjectById,
  addProject,
  updateProjectById,
  deleteProject,
};
