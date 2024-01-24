import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

const Privateroute = ({children}) => {
  const {token}=useSelector((state)=>state.Auth);
  console.log("reached private route and value ot toke is=>",token)
  if(token===null){
    return <Navigate to="/login"/>
  }
  else{
    console.log('returning the childern')
    return children;
  }
}

export default Privateroute