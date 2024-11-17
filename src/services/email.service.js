import { createTransport } from "nodemailer";
import path from 'path';
import { renderFile } from "ejs";

class EmailService {
    constructor() {        
        this.transporter = createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD,
            }
        });
    };

    async sendEmail(receivers=[], subject= '', template, templateParams) {
        await this.transporter.sendMail({
            from: "baseAdmin@example.com",
            to: receivers.toString(),
            subject: subject,
            html: await renderFile(path.resolve('./views'+template), templateParams),
        })
    }
}

export default EmailService;