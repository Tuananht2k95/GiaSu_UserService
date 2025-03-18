import { isValidObjectId } from "mongoose";
import { signHmac, unlinkFiles } from "../helpers/helpers.js"
import EmailService from "./email.service.js";
import { generateConfirmUrl,generateConfirmationCode, parserJWTToken } from "../helpers/helpers.js";
import redis from "../../database/redis.js";
import UserRepository from "../repository/user.repository.js";
import IdCardRepository from "../repository/idCard.repository.js"

class UserService {
    static userRepository = new UserRepository();
    static idCardRepository = new IdCardRepository();

    async store(user) {
        const newUser = await UserService.userRepository.store(user);
        const confirmationCode = generateConfirmationCode();
        user.password = signHmac(user.password, 'sha256');
        redis().set(`user:${newUser._id}:confirmationCode`, confirmationCode, {
            EX: 60 * 60 * 24 * 7
        });
        const emailService = new EmailService();
        
        emailService.sendEmail(
            [user.email], 
            'Confirm Account', 
            '/emailConfirm/emailConfirm.ejs', 
            {
                confirmUrl: generateConfirmUrl(newUser._id.toString()),
                confirmationCode,
            },
        );

        return newUser;
    };

    async find(userId) {
        if (!isValidObjectId(userId)) {
            throw new Error('Khong co userId truyen vao');
        };

        const user = await UserService.userRepository.findById(userId);

        if (user == null) {
            throw new Error('User khong ton tai trong DB');
        };
        return user;
    };

    async update(userId, data, authUser = {}) {        
        await this.find(userId);

        return await UserService.userRepository.findByIdAndUpdate(userId, data, authUser);;
    };

    async delete(userId) {
        await this.find(userId);
        
        return await UserService.userRepository.findByIdAndDelete(userId);
    };

    async index(conditions, pagination) {
        return {
            data: await UserService.userRepository.index(conditions, pagination), 
            pagination
        };
    };

    async updateAvatar(userId, filename) {
        const user = await this.find(userId);
        const currentAvatar = user.get('avatar', null, { getters: false });
        unlinkFiles([
            'storage/user/avatar/' + currentAvatar
        ])
        
        return await UserService.userRepository.findByIdAndUpdate(userId, { avatar: filename }, user); 
    };

    // async storeIdCard(idCardData) {
    //     const idCard = await UserService.userRepository.findOne({ userId: idCardData.userId });
    //     await idCard.findOne({ userId: idCardData.userId });

    //     if (idCard != null) return "idCard da ton tai";
    //     const newIdCard = await IdCard.create(idCardData);

    //     return newIdCard;
    // };

    // async updateIdCard(idCardData) {
    //     const res = await IdCard.findOne({ userId: idCardData.userId });
    //     const idCard = res.toObject();    
    //     const url = 'storage/user/idCard/';

    //     if (idCard == null) return "idCard khong ton tai";
    //     unlinkFiles([
    //         url + idCard.frontCard,
    //         url + idCard.backCard
    //     ], 'userService');
    //     const newIdCard = await IdCard.findByIdAndUpdate(idCard._id, idCardData);

    //     return newIdCard;
    // };

    // async confirmIdCard(userId) {
    //     const idCard = await IdCard.findOne({userId: userId});        
    //     idCard.idCardStatus = IDCARD.idCardStatus.confirm;        

    //     return idCard
    // };

    // async rejectIdCard(userId, note) {
    //     const idCard = await IdCard.findOne({userId: userId});        
    //     idCard.note= note;
    //     await idCard.save();

    //     return idCard;
    // }
}

export default UserService;