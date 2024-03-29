import { signIn } from "next-auth/react";

export default async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      callbackUrl: "/",
    });
    return "Login Successful!";
  } catch (error: any) {
    console.log("MyError: ", error.message);
    if (error) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
  }
}
