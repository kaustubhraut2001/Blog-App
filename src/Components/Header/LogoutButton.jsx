import React from "react";
import { useDispatch } from "react-redux";
import authService from '../../Appwrite/auth'
import { logout } from "../../Redux/authslice";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const logouthandler = () => {
    authServices.logout().then(()=>{
		dispatch(logout());
	}).catch((err)=>{
		console.log(err);
	});

  };
  return <div>

  	<button
	onClick={logouthandler}
	>Logout</button>
  </div>;
};

export default LogoutButton;
