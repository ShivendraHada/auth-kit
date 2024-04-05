const otpMailTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your OTP</title>
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
    .otp-box {
      background-color: #f4f4f4;
      padding: 20px;
      text-align: center;
      font-size: 24px;
      font-weight: bold;
      border-radius: 5px;
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
    <h1>Your One-Time Password (OTP)</h1>
    <p>Please use the following OTP to complete your transaction:</p>
    <div class="otp-box">
      <span>{{OTP}}</span>
    </div>
    <p>This OTP is valid for the next 5 minutes.</p>
  </div>
</body>
</html>
`;
export default otpMailTemplate;
