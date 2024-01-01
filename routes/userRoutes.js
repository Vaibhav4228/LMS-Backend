import { Router } from "express";
import {
  
  
  
  loginUser,
  logoutUser,
  registerUser,
  getUserProfile,
  
  
} from "../controllers/user.controller.js";
import { isLoggedIn } from "../middleware/auth.middleware.js";
// import { login, register } from "../controllers/user.controller.js";

const router = Router();

router.post("/register",  registerUser);

router.post('/login', loginUser );

router.get('/logout', logoutUser);

router.get('/me', isLoggedIn, getUserProfile);


export default router;
