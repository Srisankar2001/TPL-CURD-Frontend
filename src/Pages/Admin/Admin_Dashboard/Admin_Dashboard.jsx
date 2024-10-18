import React, { useContext, useEffect, useState } from 'react'
import "./Admin_Dashboard.css"
import { AuthContext } from '../../../Contexts/AuthProvider'
import { getUsers, deleteUser } from '../../../Api/userApi'
import { useNavigate } from 'react-router-dom'
import { Logout_Component } from '../../../Components/Logout_Component/Logout_Component'
export const Admin_Dashboard = () => {
    const navigate = useNavigate()
    const { user } = useContext(AuthContext)
    const [users, setUsers] = useState([])

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await getUsers();
            if (response) {
                setUsers(response)
            }
        }
        fetchUsers()
    }, [user, navigate])

    const handleUpdate = (id) => {
        navigate("/update", { state: { id } })
    }

    const handleDelete = async (id, name) => {
        const userConfirmed = window.confirm("Are you sure you want to Delete user : " + name)
        if (userConfirmed) {
            const response = await deleteUser(id)
            if (response) {
                const updatedUsers = users.filter(user => user.id !== id)
                setUsers(updatedUsers)
            }
        }
    }

    const renderUsers = () => {
        const filteredUsers = users.filter(u => u.id !== user.id);

        if (filteredUsers.length === 0) {
            return (
                <div className='user_nouser'>
                    <h1>No Users Available</h1>
                </div>
            );
        } else {
            return (
                filteredUsers.map(user => (
                    <div key={user.id} className='user_div'>
                        <div className='user_name'>{user.name}</div>
                        <div className='user_btn'>
                            <button className='user_btn_update' onClick={() => handleUpdate(user.id)}>Update</button>
                            <button className='user_btn_delete' onClick={() => handleDelete(user.id, user.name)}>Delete</button>
                        </div>
                    </div>
                ))
            );
        }
    }

return (
    <div>
        <Logout_Component/>
        <h1>All Users Page</h1>
        <div className='user_div_all'>
            {renderUsers()}
        </div>
    </div>
)
}
