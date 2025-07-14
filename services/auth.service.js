import authRepository from "../repositories/auth.repository.js";

const register = async (adminData) => {
  try {
    const result = await authRepository.register(adminData);
    return result;
  } catch (error) {
    throw new Error(`Error in AuthService register: ${error}`);
  }
};

const getAdmin = async () => {
  try {
    const admin = await authRepository.getAdmin();
    return admin;
  } catch (error) {
    throw new Error(`Error in AuthService getAdmin: ${error}`);
  }
};

export default {
  register,
  getAdmin,
};
