import crypto from "crypto";
import moment from "moment";
import { Buffer } from "buffer";
import winston from "winston";
import fs from "fs";
import path from "path";    
import HttpError from "../eceptions/httpError.eception.js";

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
    let confirmationCode = Math.floor(Math.random() * 10 ** length);
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

export const getUrl = (img, filelocation) => {
    if (!img) return process.env.STORAGE_DOMAIN + `/${filelocation}` + '/test.jpg'
    return process.env.STORAGE_DOMAIN + `/${filelocation}/` + img
};

export const responseJsonByStatus = ( res, data, statusCode = 200 ) => {
    return res.status(statusCode).json(data);
};

export const responseSuccess = ( data, statusCode = 200, message ='' ) => {
    return {
        now: moment(),
        statusCode,
        data,
        message,
    }
}

export const responseError = ( errors, statusCode = 500, message = '' ) => { 
    console.log(errors.name);
       
    const response = {
        now: moment(),
        statusCode,
        errors: [],
        message,
    }    

    if (typeof errors === 'string') {
        winston.loggers.get('system').error('errors', new Error(errors));
        response.message = errors;
        
        return response;
    }
    winston.loggers.get('system').error('errors', errors);

    if (errors instanceof Error && errors.name === 'MongoServerError') {        
        const [key, value] = Object.entries(errors.keyValue)[0];

        switch (errors.code) {
            case 11000:
                response.errors.push({
                    key,
                    value,
                    message: `${key} đã tồn tại`
                })
                break;
        
            default:
                response.message = errors.message;
        }
        
        return response;
    }
    
    if (errors instanceof Error && errors.name === 'ValidationError') {
        for (const error of errors) {
            response.errors.push({
                key: error.context.key, 
                value: error.context.value,
                message: error.message,
            });
        }       
        
        return response;
    }

    if (errors instanceof Error && errors.name === 'MulterError') {
        response.errors.push({
            key: errors.field, 
            message: errors.message,
        });

        return response;
    }

    if (errors instanceof HttpError) {
        response.errors = JSON.parse(errors.message).errors;   
        response.statusCode = errors.statusCode
        return response;
    }

    if (errors instanceof Error) {
        response.message = errors.message;
        response
        return response;
    }

    return response;
}

export const unlinkFiles = (urls, serviceName='') => {
    for (const url of urls) {
        fs.unlink(
            path.resolve(url), 
            (error) => {
                if (error) winston.loggers.get('user').error(serviceName, error);
            }
        );
    }
}
