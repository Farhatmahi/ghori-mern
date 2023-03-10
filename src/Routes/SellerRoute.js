import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import useSeller from '../hooks/useSeller/UseSeller';
import Loading from '../Shared/Loading/Loading';

const SellerRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext) 
    const [isSeller, isSellerLoading] = useSeller(user.email)
    const location = useLocation()
    
    if(loading || isSellerLoading){
        return <Loading />
    }

    if(user && isSeller){
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace />;
    
};

export default SellerRoute;