import axiosInstance from "../Config/AxiosConfig";


export const isTokenExpired = (expiryTime) => {
    const currentTime = new Date().getTime();
    return expiryTime - currentTime <= 0;
};

export const login = async (email, password,setUser,setIsAdmin) => {
    try {
        const response = await axiosInstance.post('/auth/login', { email, password });
        if (response.data.status) {
            const { accessToken, refreshToken, accessTokenExpireAt, refreshTokenExpireAt } = response.data;

            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('accessTokenExpireAt', new Date(accessTokenExpireAt).getTime());
            localStorage.setItem('refreshTokenExpireAt', new Date(refreshTokenExpireAt).getTime());

            setUser(response.data.user);
            response.data.user.roles.some(role => role.name == "ADMIN") ? setIsAdmin(true) : setIsAdmin(false);

            alert(response.data.message);
            return true;

        } else {
            alert(response.data.message);
            return false;
        }

    } catch (err) {
        alert(err.response?.data?.message || 'Login failed');
        return false;
    }
};

export const register = async (name, email, password) => {
    try {
        const response = await axiosInstance.post('/auth/register', { name, email, password });
        if (response.data.status) {
            alert(response.data.message);
            return true;
        } else {
            alert(response.data.message);
            return false;
        }
    } catch (err) {
        alert(err.response?.data?.message || 'Registration failed');
        return false;
    }
};

export const decode = async (setUser, setIsAdmin) => {
    try {
        const token = localStorage.getItem("accessToken")
        const response = await axiosInstance.post('/auth/decode', {token});
        if (response.data.status) {
            setUser(response.data.data);
            response.data.data.roles.some(role => role.name == "ADMIN") ? setIsAdmin(true) : setIsAdmin(false);
            return true;
        } else {
            return false;
        }
    } catch (err) {
        alert(err.response?.data?.message || 'Internal Server Error');
        return false;
    }
};

export const logout = async (user,setUser,setIsAdmin) => {
    try {
        const response = await axiosInstance.post('/auth/logout', { id: user.id });
        if (response.data.status) {
            setUser(null);
            setIsAdmin(false);
            localStorage.clear()

            // localStorage.removeItem('accessToken');
            // localStorage.removeItem('refreshToken');
            // localStorage.removeItem('accessTokenExpireAt');
            // localStorage.removeItem('refreshTokenExpireAt');

            alert(response.data.message);
            return true;
        } else {
            alert(response.data.message);
            return false;
        }
    } catch (err) {
        alert(err.response?.data?.message || 'Logout failed');
        return false;
    }
};

export const refreshAccessToken = async (user,setUser,setIsAdmin) => {
    const refreshToken = localStorage.getItem('refreshToken');
    const accessTokenExpireAt = localStorage.getItem('accessTokenExpireAt');
    const refreshTokenExpireAt = localStorage.getItem('refreshTokenExpireAt');

    if (!refreshToken || !refreshTokenExpireAt || isTokenExpired(refreshTokenExpireAt)) {
        await logout(user,setUser,setIsAdmin);
        return;
    }

    if (refreshToken && isTokenExpired(accessTokenExpireAt)) {
        try {
            const response = await axiosInstance.post('/auth/refresh', { token: refreshToken });
            if(response.data.status){
                const { accessToken, accessTokenExpireAt } = response.data;
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('accessTokenExpireAt', new Date(accessTokenExpireAt).getTime());
                await decode(setUser,setIsAdmin)
            }else{
                await logout(user,setUser,setIsAdmin)
            }        
        } catch (err) {
            alert(err.response?.data?.message || 'Session expired, please log in again');
            await logout(user,setUser,setIsAdmin);
        }
    }
};
