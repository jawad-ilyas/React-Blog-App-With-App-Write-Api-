import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Store from './Store/Store.js'
import { Provider } from "react-redux"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthLayout from "../src/Components/protected/Protected.jsx"
import SignUp from './pages/SignUp.jsx'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'
import AllPost from './pages/AllPost.jsx'
import AddPost from './pages/AddPost.jsx'
import EditPost from './pages/EditPost.jsx'
import Post from './pages/Post.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> }, // Use index for the default route under '/'
      {
        path: "/login", // Removed the leading '/'
        element: <AuthLayout authentication={false}><Login /></AuthLayout>
      },
      {
        path: "signup", // Removed the leading '/'
        element: <AuthLayout authentication={false}><SignUp /></AuthLayout>
      },
      {
        path: "all-posts", // Removed the leading '/'
        element: <AuthLayout authentication><AllPost /></AuthLayout>
      },
      {
        path: "add-post", // Removed the leading '/'
        element: <AuthLayout authentication><AddPost /></AuthLayout>
      },
      {
        path: "edit-post/:slug", // Removed the leading '/'
        element: <AuthLayout authentication><EditPost /></AuthLayout>
      },
      {
        path: "post/:slug", // Removed the leading '/'
        element: <Post />
      },
      
    ],
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={Store}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>
  </StrictMode>
)
