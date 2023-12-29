import AppError from "../utils/error.utils";

const register = (req, res) => {
  const { fullName, email, passsword } = req.body;

  if(!fullName || !email || !passsword){

    return (new AppError('All feilds are required', 400));
  }

};

const login = (req, res) => {

};

const logout = (req, res) => {

};

const getProfile = (req, res) => {

};

export {
   register,
   login,
   logout,
   getProfile,
}
