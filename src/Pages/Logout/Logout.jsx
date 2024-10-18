import React, { useContext, useEffect, useState } from 'react'
import "./Logout.css"
import { AuthContext } from '../../Contexts/AuthProvider'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../Api/authApi'

export const Logout = () => {
    const navigate = useNavigate()
    const {user, setUser, setIsAdmin} = useContext(AuthContext)
    const [loading,setLoading] = useState(false)
    useEffect(() => {
        const logoutUser = async() => {
            if(user){
                setLoading(true)
                const response = await logout(user,setUser,setIsAdmin)
                if(response){
                    navigate("/")
                }else{
                    navigate("/")
                }
            }else{
                navigate("/")
            }
        }
        logoutUser()
    },[navigate])
    const renderLoading = () => {
        if(loading){
            return (
                <div className='logout-loading'>
                    <span>Loging Out...</span>
                </div>
            )
        }
    }
  return (
    <div className='logout-div'>
        {renderLoading()}
    </div>
  )
}
