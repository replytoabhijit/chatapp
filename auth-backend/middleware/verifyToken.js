import jwt from 'jsonwebtoken';
import util from 'util';

const verifyToken = (req, res, next) => {
    console.log("Next method is " + next.name);
    // console.log(util.inspect(req, { depth: 1, showHidden: true }));
    var token = '';
    try{
        const cookie = req.cookies;
        console.log("Cookie is ", cookie);
        token = req.cookies.jwt;
        console.log("Token is ", token);
    }
    catch(error){
        console.log("Cookie is missing or invalid: ", error);
        return res.status(401).json({ message: "Cookie or Token Invalid or not added" });
    }
    if(!token){
        return res.status(401).json({ message: "Auth failed - No token provided" });
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded token is ", decoded);
        next();

    }
    catch(error){
        console.log("Error in verifyToken middleware: ", error);
        return res.status(401).json({ message: "Auth failed - Invalid token" });
    }
};

export default verifyToken;