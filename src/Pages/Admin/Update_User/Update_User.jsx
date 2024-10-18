import React, { useEffect, useState } from 'react'
import "./Update_User.css"
import { useLocation, useNavigate } from 'react-router-dom'
import UpdateValidator from '../../../Functions/UpdateValidator'
import { getUser, updateUser } from '../../../Api/userApi'
import { Logout_Component } from '../../../Components/Logout_Component/Logout_Component'

export const Update_User = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const  id  = location.state?.id;

    const [user, setUser] = useState({
        name:"",
        email:""
    })
    const [input, setInput] = useState({
        name: "",
        email: ""
    })
    const [error, setError] = useState({
        name: ""
    })

    useEffect(() => {
        const fetchUser = async() => {
            if (!id) {
                navigate("/dashboard")
            }else{
                const response = await getUser(id)
                if(response){
                    setUser({
                        name:response.name,
                        email:response.email
                    })
                    setInput({
                        name:response.name,
                        email:response.email
                    })
                }
            }
        }
        fetchUser()
    }, [id,navigate])

    const handleChange = (e) => {
        setInput(prev => ({
            ...prev,
            [e.target.name] : e.target.value
        }))
    }

    const handleReset = () => {
        setInput({
            name: user.name, 
            email: user.email 
        });
        setError({
            name: ""
        });
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        const errors = UpdateValidator(input,user)
        setError(errors)
        if(Object.values(errors).every(error => error === "")){
            const name = input.name.trim()
            const response = await updateUser(id,{name})
            if(response){
                navigate("/dashboard")
            }
        }
    }
    return (
        <div>
            <Logout_Component/>
            <div className='update_user_div'>
            <h1>Update User Page</h1>
            <form onSubmit={handleSubmit} onReset={handleReset}>
                <div className='update_user_input'>
                    <label>Name</label>
                    <input type='text' name='name' onChange={handleChange} value={input.name} />
                    {error.name && <span>{error.name}</span>}
                </div>
                <div className='update_user_input'>
                    <label>Email</label>
                    <input type='text' name='email'  value={input.email} readOnly/>
                    {error.email && <span>{error.email}</span>}
                </div>
                <div className='update_user_btn'>
                    <input type='submit' value="Submit" className='update_user_btn_update' />
                    <input type='reset' value="Clear" className='update_user_btn_reset' />
                </div>
            </form>
        </div>
        </div>
    )
}
