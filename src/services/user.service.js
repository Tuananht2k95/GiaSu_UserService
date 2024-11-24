import { isValidObjectId } from "mongoose";
import { signHmac } from "../helpers/helpers.js"
import { User } from "../models/user.model.js";
import EmailService from "./email.service.js";
import { generateConfirmUrl,generateConfirmationCode, parserJWTToken } from "../helpers/helpers.js";
import { USER } from "../config/constant.js";

class UserService {
    async store(data) {
        data.password = signHmac(data.password, 'sha256');
        data.confirmationCode = generateConfirmationCode();
        const newUser = await User.create(data);
        const emailService = new EmailService();
        
        emailService.sendEmail(
            [data.email], 
            'Confirm Account', 
            '/emailConfirm/emailConfirm.ejs', 
            {
                confirmUrl: generateConfirmUrl(newUser._id),
                confirmationCode: data.confirmationCode,
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

    async confirmAccount(token, confirmationCode) {
        const res = parserJWTToken(token);
        const user = await User.findOne({_id: res._id});
        
        if (user == {}) {
            return "user khong ton tai"
        };
        if (user.status == USER.status.active) {
            return "user da xac thuc"
        }
        if (confirmationCode == user.confirmationCode) {
            return user
            // user.status = USER.status.active;
            // return "user active thanh cong"
        } else return "code khong dung"
    }
}

export default UserService;