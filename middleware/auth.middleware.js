import AppError from "../utils/error.utils.js";
import jwt from 'jsonwebtoken';
import asyncHandler from "./asyncHandler.middleware.js"

const isLoggedIn = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new AppError('Unauthenticated, please login again', 401))
  }

  const userDetails = await jwt.verify(token, process.env.JWT_SECRET);
  req.user = userDetails;

  next();
});

export {
  isLoggedIn
};
