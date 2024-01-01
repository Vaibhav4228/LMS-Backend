import AppError from "../utils/error.utils.js";
import User from "../models/user.model.js"
import asyncHandler from "../middleware/asyncHandler.middleware.js";


const cookieOptions = {
  secure: process.env.NODE_ENV === 'production' ? true : false,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  httpOnly: true,
};

 const registerUser = asyncHandler(async (req, res, next) => {
  // Destructuring the necessary data from req object
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return next(new AppError('All fields are required', 400));
  }

  // Check if the user exists with the provided email
  const userExists = await User.findOne({ email });

  // If user exists send the response
  if (userExists) {
    return next(new AppError('Email already exists', 409));
  }

  // Create a new user with the given necessary data and save to DB
  const user = await User.create({
    fullName,
    email,
    password,
    avatar: {
      public_id: email,
      secure_url: 'https://res.cloudinary.com/du9jzqlpt/image/upload/v1674647316/avatar_drzgxv.jpg',
    },
  });

  // If user not created, send a message response
  if (!user) {
    return next(
      new AppError('User registration failed, please try again later', 400)
    );
  }

  await user.save();
  user.password = undefined;

  const token = await user.generateJWTToken();

  res.cookie('token', token, cookieOptions);

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    user,
  });
});

 const loginUser = asyncHandler(async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError('All fields are required', 400));
    }

    const user = await User.findOne({ email }).select('password');

    if (!user || !user.comparePassword(password)) {
      return next(new AppError('Email and password do not match', 401));
    }

    const token = await user.generateJWTToken();
    user.password = undefined;

    res.cookie('token', token, cookieOptions);

    res.status(200).json({
      success: true,
      message: 'User logged in successfully',
      user,
    });
  } catch (e) {
    return next(new AppError(e.message, 500));
  }
});

const logoutUser = (req, res) => {
  // TODO: Implement logout logic
  res.cookie('token', null, {
    secure: true,
    maxAge: 0,
    httpOnly: true,

  })

  res.status(200).json({
    sucess: true,
    message: 'User logged out'
  })
};

const getUserProfile = async (req, res) => {
  // TODO: Implement get user profile logic
  try{
    const userId = req.user.id;
    const user = await User.findById(userId);
    res.status(200).json({
      sucess: true,
      message: 'User details',
      user
    });
  } catch(e){
    return next(new AppError(' failed to get user details', 500));
  }
  

  
};

export {
  registerUser,
  logoutUser,
  loginUser,
  getUserProfile,
};
