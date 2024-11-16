import { isValidObjectId } from "mongoose";
import { signHmacSha256 } from "../helpers/helpers.js"
import { User } from "../models/user.model.js";

class UserService {
    async store(data) {
        data.password = signHmacSha256(data.password);
        const newUser = await User.create(data);
        return newUser;
    };

    async update(userId, data) {
        if (!isValidObjectId(userId)) {
            return 'User khong ton tai';
        }

        const user = await User.findById(userId);

        if (user == null) {
            return 'User khong ton tai';
        };
        const userUpdated = await User.findByIdAndUpdate(userId, data);
        return userUpdated;
    };

    async find(userId) {
        if (!isValidObjectId(userId)) {
            return 'User khong ton tai';
        }

        const user = await User.findById(userId);

        if (user == null) {
            return 'User khong ton tai';
        };
        return user;
    };

    async delete(userId) {
        if (!isValidObjectId(userId)) {
            return 'User khong ton tai';
        }

        const user = await User.findById(userId);

        if (user == null) {
            return 'User khong ton tai';
        };
        return await User.findByIdAndDelete(userId);
    }

    async search(query) {
        return await User.find(
            {phone: { $regex: query.phone }}
        )
    }
}

export default UserService;