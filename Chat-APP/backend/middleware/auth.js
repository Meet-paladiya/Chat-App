import { verifyToken } from "../lib/util.js";
import User from "../model/user.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if(!token){
      return res.json({
        success:false,
        message:"Token is not avaliable."
      })
    }
    const decode = verifyToken(token);
    const user = await User.findById(decode.userId).select("-password");
    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};
