import crypto from "crypto";
import moment from "moment";
import { Buffer } from "buffer";

export const signHmac = (string, algorithm) => {
    let hmac = crypto.createHmac(algorithm, process.env.PRIVATEKEY);
    let signed = hmac.update(string).digest("hex");
    return signed
};

export const generateConfirmUrl = (userId) => {
    const token = generateJWTToken(userId, 'sha256', moment().add(7,'days').unix());

    return process.env.FE_DOMAIN + '/confirm-account?token=' + token;
}

export const generateJWTToken = (data, algorithm, exp) => {
    const header = JSON.stringify({
        algorithm: algorithm,
        type: "JWT",
    });
    const payload = JSON.stringify({
        _id: data,
        iat: moment().unix(),
        exp: exp,
    });
    const base64Header = Buffer.from(header).toString('base64').replace('==', '').replace('=', '');
    const base64Payload = Buffer.from(payload).toString('base64').replace('==', '').replace('=', '');
    const signature = signHmac(base64Header + '.' + base64Payload, algorithm);

    return base64Header + '.' + base64Payload + '.' + signature;
};

export const generateConfirmationCode = (length = 6) => {
    const confirmationCode = Math.floor(Math.random() * 10 ** length);
    if (confirmationCode < 100000) {
        confirmationCode += `${Math.floor(Math.random() * 10)}`;
    }

    return confirmationCode;
};

export const parserJWTToken = (JWTToken) => {
    const res = {success: false, error: '', userId: ''}
    
    if (!JWTToken) {
        res.error = "token k hop le"

        return res;
    }

    const token = JWTToken.split('.');
    const stringHeader = Buffer.from(token[0], 'base64').toString();    
    const stringPayload = Buffer.from(token[1], 'base64').toString();
    const header = JSON.parse(stringHeader);
    const payload = JSON.parse(stringPayload);
    const base64Header = Buffer.from(stringHeader).toString('base64').replace('==', '').replace('=', '');
    const base64Payload = Buffer.from(stringPayload).toString('base64').replace('==', '').replace('=', '');
    const signature = signHmac(base64Header + '.' + base64Payload, header.algorithm);

    if (signature !== token[2]) {
        res.error = 'token khong hop le';

        return res
    }
    
    if (payload.exp < moment().unix()) {
        res.error = 'token het han';

        return res
    }
    res.success = true;
    res.userId = payload._id;

    return res
}

export const getUrlAvatar = (avatar) => {
    if (!avatar) return process.env.STORAGE_DOMAIN + '/' + 'test.jpg'

    return process.env.STORAGE_DOMAIN + '/' + avatar
}