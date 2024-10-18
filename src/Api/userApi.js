import axiosInstance from "../Config/AxiosConfig"

export const getUsers = async () => {
    try {
        const response = await axiosInstance.get("/user/")
        if (response.data.status) {
            return response.data.data
        } else {
            alert(response.data.message)
            return null
        }
    } catch (err) {
        console.log(err)
        alert(err.response?.data?.message || "Internal Server Error")
        return null
    }
}

export const getUser = async (id) => {
    try {
        const response = await axiosInstance.get(`/user/${id}`)
        if (response.data.status) {
            return response.data.data
        } else {
            alert(response.data.message)
            return false
        }
    } catch (err) {
        alert(err.response?.data?.message || "Internal Server Error")
        return false
    }
}

export const updateUser = async (id, user) => {
    try {
        const response = await axiosInstance.put(`/user/${id}`, user)
        if (response.data.status) {
            alert(response.data.message)
            return true
        } else {
            alert(response.data.message)
            return false
        }
    } catch (err) {
        alert(err.response?.data?.message || "Internal Server Error")
        return false
    }
}

export const deleteUser = async (id) => {
    try {
        const response = await axiosInstance.delete(`/user/${id}`)
        if (response.data.status) {
            alert(response.data.message)
            return true
        } else {
            alert(response.data.message)
            return false
        }
    } catch (err) {
        alert(err.response?.data?.message || "Internal Server Error")
        return false
    }
}