import { Admin } from "./../models/index.js";

const register = async (adminData) => {
  try {
    const { email,hashedPassword } = adminData;

    const admin = await Admin.create({
      email: email,
      password: hashedPassword
    });

    return {
      success: true,
      data: admin,
      message: "Admin registered successfully",
    };
  } catch (error) {
    throw new Error(`Error in AuthRepository admin register: ${error}`);
  }
};

const getAdmin = async () => {

  try {
    const existAdmin = await Admin.findAll();
    if (existAdmin) {
      return { success: true, data: existAdmin, message: "Admin found" };
    } else {
      return { success: false, message: "Admin not found" };
    }
  } catch (error) {
    throw new Error(`Error in AuthRepository getAdmin: ${error}`);
  }
};

export default {
  register,
  getAdmin
};
