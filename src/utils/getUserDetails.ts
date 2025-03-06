export interface GoogleUser {
    name: string, 
    email: string, 
    picture: string
}

export const getUserDetails = async (): Promise<GoogleUser | null> => {
    const TOKEN_STORAGE_KEY = import.meta.env.VITE_GOOGLE_TOKEN_STORAGE_KEY;
    const token = localStorage.getItem(TOKEN_STORAGE_KEY);

    if (!token) return null; 

    try {
        console.log("Token:", token);

        const response = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
            headers: { Authorization: `Bearer ${token}` }
        });

        if (!response.ok) {
            throw new Error("Failed to fetch user info");
        }

        const userInfo = await response.json();
        return {
            name: userInfo.name,
            email: userInfo.email,
            picture: userInfo.picture
        };
    } catch (error) {
        console.error("Invalid token or failed to fetch user info:", error);
        return null;
    }
};


