import nodemailer, { SendMailOptions, Transporter } from "nodemailer";
import getEnv from "./envConfig";

let transporter: Transporter | null = null;

async function getTransporter(): Promise<Transporter> {
  const { EMAIL_HOST, EMAIL_USERNAME, EMAIL_PASSWORD } = getEnv();

  if (transporter) {
    return transporter;
  }

  transporter = nodemailer.createTransport({
    port: 465,
    host: EMAIL_HOST,
    auth: {
      user: EMAIL_USERNAME,
      pass: EMAIL_PASSWORD,
    },
    secure: true, // Use secure: true for port 465
    tls: {
      rejectUnauthorized: false, // Add this line to avoid self-signed certificate errors
    },
  });

  try {
    await transporter.verify();
  } catch (err) {
    console.error("Error verifying transporter: ", err);
  }

  return transporter;
}

export default async function sendMail(
  mailData: SendMailOptions
): Promise<boolean> {
  try {
    const transporter = await getTransporter();
    await transporter.sendMail(mailData);
    return true;
  } catch (err) {
    console.error("Error sending mail: ", err);
    return false;
  }
}
