import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/util.js";
import User from "../model/user.js";
import bcrypt from "bcrypt";

export const signUp = async (req, res) => {
  const { fullName, email, password, bio } = req.body;

  try {
    if (!fullName || !email || !password || !bio) {
      return res.json({
        success: false,
        message: "Missing Details",
      });
    }
    const user = await User.findOne({
      email,
    });

    if (user) {
      return res.json({
        success: false,
        message: "Account already exists",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      password: hashPassword,
      fullName,
      bio,
    });

    const token = generateToken(newUser._id);
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      sameSite: "Strict",
      maxAge: 30 * 60 * 1000,
    });
    return res.json({
      success: true,
      userData: newUser,
      token,
      message: "Account created successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({
        success: false,
        message: "Missing Details",
      });
    }
    const user = await User.findOne({
      email,
    });
    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }
    const validPassword = bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.json({
        success: false,
        message: "Invalid Credential",
      });
    }
    const token = generateToken(user._id);
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      sameSite: "Strict",
      maxAge: 30 * 60 * 1000,
    });
    return res.json({
      success: true,
      userData: user,
      token,
      message: "Login successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token", {
    path: "/",
    httpOnly: true,
    sameSite: "Strict",
  });
  return res.status(200).json({ message: "Logged out" });
};

export const checkAuth = (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePic, bio, fullName } = req.body;

    const userId = req.user._id;
    let updatedUser;

    if (!profilePic) {
      updatedUser = await User.findByIdAndUpdate(
        userId,
        { bio, fullName },
        { new: true }
      );
    } else {
      const upload = await cloudinary.uploader.upload(profilePic);

      updatedUser = await User.findByIdAndUpdate(
        userId,
        { profilePic: upload.secure_url, bio, fullName },
        { new: true }
      );
    }
    return res.json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
