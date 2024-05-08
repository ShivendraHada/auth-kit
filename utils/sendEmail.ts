import nodemailer, {
  SendMailOptions,
  Transporter,
  TransportOptions,
} from "nodemailer";
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
    tls: {
      minVersion: "TLSv1.2",
      maxVersion: "TLSv1.3",
    },
    secure: true,
  } as TransportOptions);

  await transporter.verify();
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
