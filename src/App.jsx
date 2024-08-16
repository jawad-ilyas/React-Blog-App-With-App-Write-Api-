import React, { useEffect, useState } from 'react'
import config from './config/config'
import { useDispatch, useSelector } from 'react-redux'
import authService from "./appWrite/auth"
import { login } from './Features/authSlice'
import Footer from './Components/Footer/Footer'
import Header from './Components/Header/Header'
import { Outlet } from 'react-router-dom'
import Input from './Components/input/Input'
import PostCard from './Components/postCard/PostCard'
import { Login, SignUp } from "./Components/index"
import RTE from './Components/rte/RTE'
import PostForm from './Components/postForm/PostForm'
function App() {

  const status = useSelector(state => state.auth.status)
  const [loading, setLoading] = useState();
  const dispatch = useDispatch();


  useEffect(() => {
    authService.getCurrentUser().then((userData) => {
      if (userData) {
        dispatch(login({ userData }))
      }
      else {
        dispatch(logout())
      }
    }).finally(() => {
      setLoading(false)
    })
  }, [])
  return (
    <>
      {!loading ?
        <div>
          <Header />
          <Outlet />
          <Footer />
        </div>
        : <div>user is not login </div>}
    </>
  )
}

export default App