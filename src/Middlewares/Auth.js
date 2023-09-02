import jwt from "jsonwebtoken";

//Authenticated user and get token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "5d",
    });
};

export { generateToken };