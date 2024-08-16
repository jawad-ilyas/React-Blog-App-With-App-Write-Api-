import React from 'react'
import { useDispatch } from 'react-redux'
import authServices from '../../appWrite/auth';
import { logout } from '../../Features/authSlice';
import { redirect } from 'react-router-dom';
function LogOutBtn() {
    const dispatch = useDispatch();

    const logoutHandler = () => {
        authServices.logout().then(() => {
            dispatch(logout())
            return redirect("/")
        })
    }


    return (
        <button className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
            onClick={logoutHandler}>LogOutBtn</button>
    )
}

export default LogOutBtn