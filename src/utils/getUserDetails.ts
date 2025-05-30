export interface GoogleUser {
  name: string;
  email: string;
  picture: string;
}

export const getUserDetails = (): GoogleUser | undefined => {
  const response = localStorage.getItem("googleUser");

  if (response) {
    const user: GoogleUser = JSON.parse(response);

    if (user) {
      return user;
    } else {
      console.log("User could not be parsed correctly");
      return undefined;
    }
  }
  console.log("No user found in local storage");
};
