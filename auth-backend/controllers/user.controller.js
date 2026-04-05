import userModel from "../models/user.model.js";

const getUsers = async (req, res) => {
    try {
        const users = await userModel.find({}, 'username');
        res.status(200).json(users);

    }
    catch (error){
        console.log("Error in getAllUsers controller: ", error);
        res.status(500).json({ message: "Failed to fetch users due to internal error" });
    }
}

export default getUsers;