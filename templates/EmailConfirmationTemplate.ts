interface EmailConfirmationTemplateProps {
  confirmationLink: URL;
  userName: string;
}

export default function EmailConfirmationTemplate({
  confirmationLink,
  userName,
}: EmailConfirmationTemplateProps) {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirm Your Email Address</title>
    <style>
      /* Add some basic styling */
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 10px auto;
        padding: 20px;
        background-color: white;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      .button {
        display: inline-block;
        background-color: #4CAF50;
        color: white;
        text-decoration: none;
        padding: 10px 20px;
        border-radius: 5px;
        margin-top: 20px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Confirm Your Email Address</h1>
      <p>Dear ${userName},</p>
      <p>Thank you for registering with our service. To complete the registration process, please confirm your email address by clicking the button below:</p>
      <a href="${confirmationLink}" class="button">Confirm Email Address</a>
      <p>If the button doesn't work, you can copy and paste the following link into your browser:</p>
      <p>${confirmationLink}</p>
    </div>
  </body>
  </html>`;
}
