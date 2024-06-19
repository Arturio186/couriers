import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

class MailService {
    public transporter: nodemailer.Transporter;

    constructor() {
        const transportOptions: SMTPTransport.Options = {
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        }

        this.transporter = nodemailer.createTransport(transportOptions)
    }

    SendActivationMail = async (emailTo: string, link: string) => {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to: emailTo,
            subject: 'Активация аккаунта на ' + process.env.API_URL,
            text: '',
            html:
                `
                    <div>
                        <h1>Для активации перейдите по ссылке</h1>
                        <a href="${link}">${link}</a>
                    </div>
                `
        })
    };
}

export default new MailService();
