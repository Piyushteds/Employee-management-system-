import api from "./api";


// =========================================
// LOGIN
// =========================================

export const loginUser = async (
    email,
    password
) => {

    const response = await api.post(
        "/Auth/login",
        {
            email,
            password,
        }
    );

    return response.data;
};


// =========================================
// LOGOUT
// =========================================

export const logoutUser = () => {

    localStorage.removeItem(
        "accessToken"
    );

    localStorage.removeItem(
        "user"
    );
};


// =========================================
// GET TOKEN
// =========================================

export const getToken = () => {

    return localStorage.getItem(
        "accessToken"
    );
};


// =========================================
// GET USER
// =========================================

export const getStoredUser = () => {

    const user =
        localStorage.getItem("user");


    if (!user) {
        return null;
    }


    try {
        return JSON.parse(user);

    } catch {

        return null;
    }
};