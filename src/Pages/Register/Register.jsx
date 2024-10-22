import React, { useContext, useState } from 'react'
import "./Register.css"
import RegisterValidator from '../../Functions/RegisterValidator'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../../Api/authApi'

export const Register = () => {
    const navigate = useNavigate()
    const [input, setInput] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const [error, setError] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const handleChange = (e) => {
        setInput(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }
    const handleReset = () => {
        setInput({
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        })
        setError({
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        })
    }
    const handleSubmit = async(e) => {
        e.preventDefault()
        const errors = RegisterValidator(input)
        setError(errors)
        if (Object.values(errors).every(error => error === "")) {
            const name = input.name.trim()
            const email = input.email.trim().toLowerCase()
            const password = input.password.trim()
            const response = await register(name,email,password)
            if (response) {
                navigate("/")
            }
        }
    }
    return (
        <div className='register-div'>
            <form onSubmit={handleSubmit} onReset={handleReset}>
                <h1>Register Page</h1>
                <div className='register-input-div'>
                </div>
                <div className='register-input'>
                    <label>Name</label>
                    <input type='text' name='name' value={input.name} placeholder='Enter your name here' onChange={handleChange} />
                    {error.name && <span>{error.name}</span>}
                </div>
                <div className='register-input'>
                    <label>Email</label>
                    <input type='text' name='email' value={input.email} placeholder='Enter your email here' onChange={handleChange} />
                    {error.email && <span>{error.email}</span>}
                </div>
                <div className='register-input'>
                    <label>Password</label>
                    <input type='password' name='password' value={input.password} placeholder='Enter your password here' onChange={handleChange} />
                    {error.password && <span>{error.password}</span>}
                </div>
                <div className='register-input'>
                    <label>Confirm Password</label>
                    <input type='password' name='confirmPassword' value={input.confirmPassword} placeholder='Re-Enter your password here' onChange={handleChange} />
                    {error.confirmPassword && <span>{error.confirmPassword}</span>}
                </div>
                <div className='register-btn'>
                    <input type='submit' value="Submit" className='register-btn-submit' />
                    <input type='reset' value="Clear" className='register-btn-reset' />
                </div>
                <div className='register-link'>
                    <Link to="/">Already Have an Account. Click Here to Login.</Link>
                </div>
            </form>
        </div>
    )
}
