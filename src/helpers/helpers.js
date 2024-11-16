import crypto from "crypto"

export const signHmacSha256 = (string) => {
    let hmac = crypto.createHmac("sha256", process.env.PRIVATEKEY);
    let signed = hmac.update(string).digest("hex");
    return signed
}