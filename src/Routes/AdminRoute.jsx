import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import useAdmin from '../hooks/useAdmin/useAdmin';
import Loading from '../Shared/Loading/Loading';

const AdminRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext) 
    const [isAdmin] = useAdmin(user.email)
    const location = useLocation()
    
    if(loading){
        return <Loading />
    }

    if(user && isAdmin){
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace />;
    
};

export default AdminRoute;