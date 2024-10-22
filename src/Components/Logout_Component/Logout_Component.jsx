import React from 'react'
import "./Logout_Component.css"
import { useNavigate } from 'react-router-dom'

export const Logout_Component = () => {
    const navigate = useNavigate()
    return (
        <div className='logout_component_div'>
           <button onClick={()=>navigate("/logout")}>Logout</button>
        </div>
    )
}
