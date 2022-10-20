import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Outlet } from "react-router-dom";

const ProtectedRoute = (props) => {
    const user = useSelector((st) => st.user);
    const signedOut = Object.keys(user).length === 0;


    return signedOut ?
    <Navigate to='/login' />
      : <Outlet />
};

export default ProtectedRoute;
