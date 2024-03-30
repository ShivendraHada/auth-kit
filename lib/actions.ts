import { signIn } from "next-auth/react";
import { toast } from "react-toastify";

export default async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    const response = await signIn("credentials", {
      username: formData.get("username") as string,
      password: formData.get("password") as string,
      redirect: false,
      callbackUrl: "/",
    });
    if (response?.ok) {
      toast.success("Login Successful!");
      window.location.replace("/");
      return "Login Successful!";
    } else {
      switch (response?.error) {
        case "CredentialsSignin":
          toast.warn("Invalid Credentials!");
          return "Invalid credentials!";
        default:
          console.error(response?.error);
          return "Something went wrong.";
      }
    }
  } catch (error: any) {
    console.log("MyError: ", error.message);
    return "Something Went Wrong!";
  }
}
