import projectService from "../services/project.service.js";
import path from "path";
import fs from "fs";

// Get all projects
const getAllProjects = async (req, res) => {
  try {
    const projects = await projectService.getAllProjects();
    return res.status(200).json(projects);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error retrieving projects",
      error: error.message,
    });
  }
};

// Get project by ID
const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await projectService.getProjectById(id);
    if (!project.success) {
      return res.status(404).json({
        success: false,
        message: project.message,
      });
    }
    return res.status(200).json(project);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error retrieving project",
      error: error.message,
    });
  }
};

// Add a new project
const addProject = async (req, res) => {
  try {
    // const projectData = req.body;
    const body = req.body;
    const projectFolder = body.id;

    const topImagePaths = (req.files["topImages"] || []).map((file) =>
      path
        .join("uploads", "projects", projectFolder, file.originalname)
        .replace(/\\/g, "/")
    );
    const bottomImagePaths = (req.files["bottomImages"] || []).map((file) =>
      path
        .join("uploads", "projects", projectFolder, file.originalname)
        .replace(/\\/g, "/")
    );

    const projectData = {
      ...body,
      topImages: topImagePaths.join(","),
      bottomImages: bottomImagePaths.join(","),
    };

    const newProject = await projectService.addProject(projectData);
    return res.status(201).json(newProject);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error adding project",
      error: error.message,
    });
  }
};

// Update a project by ID
const updateProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const projectFolder = id;

    // console.log("FormData contents:");
    // for (const [key, value] of updatedData.entries()) {
    //   console.log(key, value);
    // }
    

    const oldProject = await projectService.getProjectById(id);

    if (!oldProject.success) {
      return res.status(404).json({
        success: false,
        message: updatedProject.message,
      });
    }

    // Remove old images if specified
    const removeImages = (imagePaths) => {
      imagePaths.forEach((imgPath) => {
        const fullPath = path.join(process.cwd(), imgPath);
        if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
      });
    };

    if (updatedData.removeTopImages) {
      removeImages(updatedData.removeTopImages.split(","));
    }
    if (updatedData.removeBottomImages) {
      removeImages(updatedData.removeBottomImages.split(","));
    }

    // Handle new uploads
    const newTopImages = (req.files["topImages"] || []).map((file) =>
      path
        .join("uploads", "projects", projectFolder, file.originalname)
        .replace(/\\/g, "/")
    );
    const newBottomImages = (req.files["bottomImages"] || []).map((file) =>
      path
        .join("uploads", "projects", projectFolder, file.originalname)
        .replace(/\\/g, "/")
    );

    // Get previous image list from DB (optional, can be fetched in service if preferred)
    const oldTopImages = (oldProject.data?.topImages || "")
      .split(",")
      .filter(Boolean);
    const oldBottomImages = (oldProject.data?.bottomImages || "")
      .split(",")
      .filter(Boolean);

    const removeTopImages = (updatedData.removeTopImages || "")
      .split(",")
      .filter(Boolean);
    const removeBottomImages = (updatedData.removeBottomImages || "")
      .split(",")
      .filter(Boolean);

    const topImages = [
      ...oldTopImages.filter((img) => !removeTopImages.includes(img)),
      ...newTopImages,
    ];
    const bottomImages = [
      ...oldBottomImages.filter((img) => !removeBottomImages.includes(img)),
      ...newBottomImages,
    ];

    // Remove properties removeTopImages and removeBottomImages if they exist
    delete updatedData.removeTopImages;
    delete updatedData.removeBottomImages;

    const projectData = {
      ...updatedData,
      topImages: topImages.join(","),
      bottomImages: bottomImages.join(","),
    };

    const updatedProject = await projectService.updateProjectById(
      id,
      projectData
    );

    if (!updatedProject.success) {
      return res.status(400).json({
        success: false,
        message: updatedProject.message,
      });
    }
    return res.status(200).json({
      success: true,
      message: updatedProject.message,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error updating project",
      error: error.message,
    });
  }
};

// Delete a project by ID
const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProject = await projectService.deleteProject(id);
    if (!deletedProject.success) {
      return res.status(404).json({
        success: false,
        message: deletedProject.message,
      });
    }
    return res.status(200).json({
      success: true,
      message: deletedProject.message,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error deleting project",
      error: error.message,
    });
  }
};

export default {
  getAllProjects,
  getProjectById,
  addProject,
  updateProjectById,
  deleteProject,
};
