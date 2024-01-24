import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate} from 'react-router-dom';
import { toast } from 'react-toastify';

const Studentroute = ({children}) => {

    const {token}=useSelector((state)=>state.Auth);
    const {profile}=useSelector((state)=>state.Profile);

    if(token===null || profile?.accounttype!=="Student"){
        toast.error("Login as Student")
        return <Navigate to="/login" />
    }
    else{
        return children;
    }

  
}

export default Studentroute