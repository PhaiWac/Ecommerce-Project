import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import "./index.css";

import App from './App' ;
import Navbar from './components/Navbar' ;
import HomePage from "./pages/Home";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Register from './pages/Register'
import EditProfile from "./pages/EditProfile";
import ChangePassword from "./pages/ChangePassword";
import UserCofig from "./pages/UserCofig";
import EditUser from "./pages/EditUser";

const router = createBrowserRouter([
  { path : '/' ,element : <HomePage/>},
  { path : '/login', element : <Login/> },
  { path : '/register' , element : <Register/>},
  { path : '/admin' , element : <Admin/> },
  { path : '/admin/userconfig' , element : <UserCofig/>},
  { path : '/admin/user/:id' , element : <EditUser/>} ,
  // { path : '/admin/productconfig' , element : <ConfigItem/>} ,
  // { path : '/admin/edititem/:id' , element : <Edititem/>},

  { path : '/user/change_password' , element : <ChangePassword/>},
  { path : '/user/editprofile' , element : <EditProfile/>} ,
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router = {router}/>
  </React.StrictMode>,
)
