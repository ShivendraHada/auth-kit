import EmailConfirmationTemplate from "@/templates/EmailConfirmationTemplate";
import sendMail from "@/utils/sendEmail";

interface ConfirmationEmailData {
  email: string;
  confirmationLink: URL;
  userName: string;
}

const sendConfirmationEmail = async ({
  email,
  confirmationLink,
  userName,
}: ConfirmationEmailData) => {
  try {
    const mailData = {
      from: "The Tech Hub <info@thetechhub.app>",
      to: email,
      subject: `Confirm Your Email Address - TheTechHub`,
      text: `Confirm Your Email Address - TheTechHub`,
      html: EmailConfirmationTemplate({
        confirmationLink,
        userName,
      }),
    };

    return await sendMail(mailData);
  } catch (error) {
    console.log((error as Error).message);
    throw new Error((error as Error).message);
  }
};

export default sendConfirmationEmail;
