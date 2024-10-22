import React, { useContext, useState } from 'react'
import "./Login.css"
import LoginValidator from "../../Functions/LoginValidator"
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Contexts/AuthProvider'
import { login } from '../../Api/authApi'

export const Login = () => {
    const {setUser, setIsAdmin} = useContext(AuthContext)
    const navigate = useNavigate()
    const [input, setInput] = useState({
        email: "",
        password: ""
    })
    const [error, setError] = useState({
        email: "",
        password: ""
    })
    const handleChange = (e) => {
        setInput(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }
    const handleReset = () => {
        setInput({
            email: "",
            password: ""
        })
        setError({
            email: "",
            password: ""
        })
    }
    const handleSubmit = async(e) => {
        e.preventDefault()
        const errors = LoginValidator(input)
        setError(errors)
        if(Object.values(errors).every(error => error === "")){
            const email = input.email.trim().toLowerCase()
            const password = input.password.trim()
            const response = await login(email,password,setUser,setIsAdmin)
            if (response) {
                navigate("/dashboard")
            }
        }
    }
    return (
        <div className='login-div'>
            <form onSubmit={handleSubmit} onReset={handleReset}>
                <h1>Login Page</h1>
                <div className='login-input-div'>
                </div>
                <div className='login-input'>
                    <label>Email</label>
                    <input type='text' name='email' value={input.email} placeholder='Enter your email here' onChange={handleChange} />
                    {error.email && <span>{error.email}</span>}
                </div>
                <div className='login-input'>
                    <label>Password</label>
                    <input type='password' name='password' value={input.password} placeholder='Enter your password here' onChange={handleChange} />
                    {error.password && <span>{error.password}</span>}
                </div>
                <div className='login-btn'>
                    <input type='submit' value="Submit" className='login-btn-submit' />
                    <input type='reset' value="Clear" className='login-btn-reset' />
                </div>
                <div className='login-link'>
                    <Link to="/register">Don't Have an Account. Click Here to Register.</Link>
                </div>
            </form>
        </div>
    )
}
