import crypto from "crypto";
import moment from "moment";
import { Buffer } from "buffer";

export const signHmacSha256 = (string) => {
    let hmac = crypto.createHmac("sha256", process.env.PRIVATEKEY);
    let signed = hmac.update(string).digest("hex");
    return signed
};

export const generateConfirmUrl = (userId) => {
    const token = generateJWTToken(userId, 'sha256', moment().add(1,'days').unix());

    return process.env.FE_DOMAIN + '/confirm-account?token=' + token;
}

export const generateJWTToken = (data, algorithm, exp) => {
    const header = JSON.stringify({
        alg: algorithm,
        type: "JWT"
    });
    const payload = JSON.stringify({
        _Id: data,
        iat: moment().unix(),
        exp: exp,
    });
    const base64Header = Buffer.from(header).toString('base64').replace('==', '').replace('=', '');
    const base64Payload = Buffer.from(payload).toString('base64').replace('==', '').replace('=', '');
    const signature = signHmacSha256(base64Header + '.' + base64Payload);

    return base64Header + '.' + base64Payload + '.' + signature;
};