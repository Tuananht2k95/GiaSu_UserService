import { isValidObjectId } from "mongoose";
import { signHmac } from "../helpers/helpers.js"
import { User } from "../models/user.model.js";
import EmailService from "./email.service.js";
import { generateConfirmUrl,generateConfirmationCode, parserJWTToken } from "../helpers/helpers.js";
import { USER } from "../config/constant.js";
import redis from "../../database/redis.js";
import fs from "fs"
import path from "path";
import { log } from "console";
import { IdCard } from "../models/idCard.model.js";

class UserService {
    async store(data) {
        data.password = signHmac(data.password, 'sha256');
        const newUser = await User.create(data);
        const confirmationCode = generateConfirmationCode()
        redis.set(`user:${newUser._id}:confirmationCode`, confirmationCode, {
            EX: 60 * 60 * 24 * 7
        });
        console.log(await redis.get(`user:${newUser._id}:confirmationCode`));
        
        const emailService = new EmailService();
        
        emailService.sendEmail(
            [data.email], 
            'Confirm Account', 
            '/emailConfirm/emailConfirm.ejs', 
            {
                confirmUrl: generateConfirmUrl(newUser._id.toString()),
                confirmationCode,
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
    };

    async index(conditions, pagination) {
        const [data, total] = await Promise.all([
            User.find(conditions).skip((pagination.page-1)*pagination.limit).limit(pagination.limit),
            User.find(conditions)
        ]);
        return {
            data, total, pagination
        }        
    };

    async confirmAccount(token, confirmationCode) {
        const res = parserJWTToken(token);

        if (!res.success) return res.error
        const user = await User.findById(res.userId);
        
        if (!user) {
            return "user khong ton tai"
        };

        if (user.status === USER.status.active) {
            return "user da xac thuc"
        };

        if (confirmationCode === await redis.get(`user:${user._id}:confirmationCode`)) {
            user.status = USER.status.active;
            await User.findByIdAndUpdate(user._id, user)
            
            return "user active thanh cong"
        };

        return "code khong dung";
    };

    async updateAvatar(userId, filename) {
        const res = await this.find(userId);
        const user = res.toObject();
        fs.unlink(path.resolve('storage/'+ '/' + user.avatar), (error) => {
            console.log(error);
        });

        return user;
    };

    async storeIdCard(idCardData) {
        const newIdCard = await IdCard.create(idCardData);

        return newIdCard;
    };
}

export default UserService;