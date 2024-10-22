const saveAccessToken = (res) => {
    localStorage.setItem("accessToken", res.accessToken);
    localStorage.setItem("accessTokenExpire", res.accessTokenExpire);
};

const saveRefreshToken = (res) => {
    localStorage.setItem("refreshToken", res.refreshToken);
    localStorage.setItem("refreshTokenExpire", res.refreshTokenExpire);
};

const getRefreshToken = () => {
    return localStorage.getItem("refreshToken");
};

const getAccessToken = () => {
    return localStorage.getItem("accessToken");
};

const removeTokens = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accessTokenExpire");
    localStorage.removeItem("refreshTokenExpire");
};

const isAccessTokenAvailable = () => {
    const token = getAccessToken();
    if (!token) {
        return false; 
    } else {
        const expireAt = localStorage.getItem("accessTokenExpire");
        
        const expirationDate = new Date(expireAt);
        
        if (expirationDate && expirationDate > new Date()) {
            return true; 
        } else {
            removeTokens(); 
            return false;
        }
    }
};


const isRefreshTokenAvailable = () => {
    const token = getRefreshToken();
    return token ? true : false;
};

const authFunction = {
    saveAccessToken,
    saveRefreshToken,
    getAccessToken,
    getRefreshToken,
    removeTokens,
    isAccessTokenAvailable,
    isRefreshTokenAvailable
};

export default authFunction;
