import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

const Openroute = ({children}) => {
    const {token}=useSelector((state)=>state.Auth);
    if(token===null){
        return children;
    }
    else{
        return <Navigate to="/dashboard/my-profile"/>
    }
  
}

export default Openroute