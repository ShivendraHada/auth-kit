export const userService = {
  authenticate,
};

function authenticate(username: string, password: string) {
  if (username !== "admin@gmail.com" && password !== "admin") {
    return null;
  }

  const user = {
    id: "9001",
    name: "Web Admin",
    email: "admin@example.com",
  };

  return user;
}
