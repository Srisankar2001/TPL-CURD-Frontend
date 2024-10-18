import React, { useContext } from 'react'
import "./User_Dashboard.css"
import { AuthContext } from '../../../Contexts/AuthProvider'
import { Logout_Component } from '../../../Components/Logout_Component/Logout_Component'

export const User_Dashboard = () => {
    const { user } = useContext(AuthContext)
    return (
        <div>
            <Logout_Component/>
            <div className='user_dashboard_div'>
            <h1>Hi, {user.name}</h1>
        </div>
        </div>
    )
}
