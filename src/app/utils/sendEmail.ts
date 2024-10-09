import nodemailer from "nodemailer";
import config from "../config";

type TSendEmail = {
  email: string;
  subject: string;
  html: string;
};

// send email to user
export const sendEmail = async (options: TSendEmail) => {
  const fromEmail = config.smtp_from_email;

  const transporter = nodemailer.createTransport({
    host: config.smtp_host,
    port: config.smtp_port,
    auth: { user: config.smtp_user, pass: config.smtp_pass },
  } as nodemailer.TransportOptions);

  const message = {
    from: fromEmail,
    to: options.email,
    subject: options.subject,
    html: options.html,
  };

  await transporter.sendMail(message);
};
