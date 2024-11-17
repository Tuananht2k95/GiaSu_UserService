import { isValidObjectId } from "mongoose";
import { signHmacSha256 } from "../helpers/helpers.js"
import { User } from "../models/user.model.js";
import EmailService from "./email.service.js";
import { generateConfirmUrl } from "../helpers/helpers.js";

class UserService {
    async store(data) {
        data.password = signHmacSha256(data.password);
        const newUser = await User.create(data);
        const emailService = new EmailService();
        console.log(emailService);
        
        emailService.sendEmail(
            [data.email], 
            'Confirm Account', 
            '/emailConfirm/emailConfirm.ejs', 
            {
                confirmUrl: generateConfirmUrl(newUser._id),
            },
        );
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

    async index(conditions, pagination) {
        const [data, total] = await Promise.all([
            User.find(conditions).skip((pagination.page-1)*pagination.limit).limit(pagination.limit),
            User.find(conditions)
        ]);
        return {
            data, total, pagination
        }        
    }
}

export default UserService;