import { isValidObjectId } from "mongoose";
import { signHmac, unlinkFile } from "../helpers/helpers.js"
import { User } from "../models/user.model.js";
import EmailService from "./email.service.js";
import { generateConfirmUrl,generateConfirmationCode, parserJWTToken } from "../helpers/helpers.js";
import { USER, IDCARD } from "../config/constant.js";
import redis from "../../database/redis.js";
import fs from "fs"
import path from "path";
import { IdCard } from "../models/idCard.model.js";
import winston from "winston";

class UserService {
    async store(data) {
        data.password = signHmac(data.password, 'sha256');
        const newUser = await User.create(data);
        const confirmationCode = generateConfirmationCode()
        redis.set(`user:${newUser._id}:confirmationCode`, confirmationCode, {
            EX: 60 * 60 * 24 * 7
        });
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
        
        if (user.avatar == 'xxx.img') {
            user.avatar = filename;
        } else {
            unlinkFile(['storage/user/avatar/' + user.avatar], 'userService');
            user.avatar = filename;
        }
        await User.findByIdAndUpdate(userId, {avatar: filename});
        return user;
    };

    async storeIdCard(idCardData) {
        const idCard = await IdCard.findOne({ userId: idCardData.userId });

        if (idCard != null) return "idCard da ton tai";
        const newIdCard = await IdCard.create(idCardData);

        return newIdCard;
    };

    async updateIdCard(idCardData) {
        const res = await IdCard.findOne({ userId: idCardData.userId });
        const idCard = res.toObject();    
        const url = 'storage/user/idCard/';

        if (idCard == null) return "idCard khong ton tai";
        unlinkFile([
            url + idCard.frontCard,
            url + idCard.backCard
        ], 'userService');
        const newIdCard = await IdCard.findByIdAndUpdate(idCard._id, idCardData);

        return newIdCard;
    };

    async confirmIdCard(userId) {
        const idCard = await IdCard.findOne({userId: userId});        
        idCard.idCardStatus = IDCARD.idCardStatus.confirm;        

        return idCard
    };

    async rejectIdCard(userId, note) {
        const idCard = await IdCard.findOne({userId: userId});        
        idCard.note= note;
        await idCard.save();

        return idCard;
    }
}

export default UserService;