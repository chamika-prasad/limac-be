import authService from "../services/auth.service.js";
import passwordService from "./../services/password.service.js";
import tokenService from "./../services/token.service.js";

// Register method
const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    const existingAdmin = await authService.getAdmin();
    if (existingAdmin.success && existingAdmin.data.length > 0) {
      return res
        .status(400)
        .json({ success: false, message: "Admin already exists" });
    }

    // Hash the password
    var hashedPassword = await passwordService.hashPassword(password);

    const createdAdmin = await authService.register({
      email,
      hashedPassword,
    });

    if (!createdAdmin.success) {
      return res
        .status(400)
        .json({ success: false, message: createdAdmin.message });
    }

    return res.status(201).json({
      success: createdAdmin.success,
      message: createdAdmin.message,
      data: createdAdmin.data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error registering user",
      error: error,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    const existingAdmin = await authService.getAdmin();
    if (!existingAdmin.success) {
      return res
        .status(404)
        .json({ success: false, message: "Admin not found" });
    }

    // Varify the email
    if (existingAdmin.data[0].email !== email) {
      return res
        .status(400)
        .json({ success: false, message: "Email does not match" });
    }

    // Varify the password
    var isPasswordValid = await passwordService.verifyPassword(
      password,
      existingAdmin.data[0].password
    );

    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect password" });
    }

    var token = await tokenService.generateToken(
      existingAdmin.data[0].id,
      existingAdmin.data[0].name,
      existingAdmin.data[0].email,
      "admin"
    );

    return res
      .status(200)
      .json({
        success: true,
        data: token,
        message: "Admin login successfully",
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error registering user",
      error: error,
    });
  }
};

export default {
  register,
  login,
};
