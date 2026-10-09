import jwt from 'jsonwebtoken';

export const generateToken = (userId)=>{
    const token = jwt.sign({userId}, process.env.ACCESS_SECRET, { expiresIn: "30m" });        
    return token;
}
export const verifyToken = (token)=>{
    const decode = jwt.verify(token, process.env.ACCESS_SECRET);
    return decode;
}