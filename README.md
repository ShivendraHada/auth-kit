# AuthEase: Next.js Authentication Made Effortless

AuthEase is a comprehensive Next.js repository designed to simplify the
authentication setup process for your projects. With AuthEase, you can
effortlessly integrate robust authentication features into your Next.js
applications, including login, registration, and forgot password
functionalities. Say goodbye to boilerplate code and headaches, and
hello to a seamless authentication experience!

## Features

- **Next.js Frontend**: Built using Next.js for a modern and efficient frontend.

- **MongoDB Integration**: Utilizes mongoose for seamless integration with MongoDB, a powerful NoSQL database.

- **Next-Auth**: Implements next-auth for authentication, providing secure and customizable authentication flows.

- **OTP Generation**: Includes random package for generating one-time passwords (OTPs) for enhanced security.

- **Toast Notifications**: Uses react-toastify to provide user-friendly popup notifications.

- **Email Functionality**: Integrated with nodemailer for sending emails, facilitating features like forgot password functionality.

- **Icon Library**: Incorporates react-feather for a rich library of icons to enhance the user interface.

- **Password Hashing**: Utilizes bcrypt for secure password hashing, ensuring user data remains protected.

## Getting Started

To get started with AuthEase, follow these simple steps:

1.  **Clone the Repository**: Clone this repository to your local machine.

```
    git clone https://github.com/your-username/authease.git
```

2.  **Install Dependencies**: Navigate into the project directory and install the necessary dependencies.

```
    cd authease
```

```
    npm install
```

3.  **Set Up Environment Variables**: Create a .env.local file in the root directory and configure the following environment variables:

```

    MONGODB_URI=your_mongodb_uri

    NEXTAUTH_URL=your_nextauth_url

    SMTP_HOST=your_smtp_host

    SMTP_PORT=your_smtp_port

    SMTP_USER=your_smtp_username

    SMTP_PASS=your_smtp_password
```

4.  **Run the Application**: Start the Next.js development server.

```
    npm run dev
```

5.  **Explore AuthEase**: Open your browser and navigate to http://localhost:3000 to explore AuthEase and begin integrating authentication features into your Next.js project!

## Contributing

We welcome contributions from the community! Whether you find a bug,
have a feature request, or want to contribute code, please feel free to
open an issue or submit a pull request.

## License

This project is licensed under the MIT License. Feel free to use,
modify, and distribute the code as needed.

## Acknowledgements

AuthEase is made possible thanks to the incredible work of the
open-source community and the following libraries:

- [Next.js](https://nextjs.org/)

- [Mongoose](https://mongoosejs.com/)

- next-auth

- [random](https://www.npmjs.com/package/random)

- react-toastify

- [nodemailer](https://nodemailer.com/)

- [react-feather](https://github.com/feathericons/react-feather)

- [bcrypt](https://www.npmjs.com/package/bcrypt)

**AuthEase** - Simplify authentication in your Next.js projects!
