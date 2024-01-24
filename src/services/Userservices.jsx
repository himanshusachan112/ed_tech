import {toast} from "react-toastify";
import { apiConnector } from "../utils/Apiconnecter";
import { userroutes } from "../apis/apis";
import { setuserdata,setloading,settoken } from "../slices/Authslice";
import {setprofile} from "../slices/Profileslice"





export function saveuser(formdata,token){
    return async (dispatch)=>{
        const toastid=toast.loading("Loading...");
        
        try{
            const response=await apiConnector(
                "POST",
                userroutes.UPDATEUSER_API,
                formdata,
                {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                }
            )


            if(!response.data.success){
                throw new Error(response.data.message)
            }

            console.log("USER UPDATE API RESPONSE",response.data);
            localStorage.setItem("profile",JSON.stringify(response.data.data));
            dispatch(setprofile(response.data.data));
            toast.success(response.data.message)
            toast.dismiss(toastid);
            
        }
        catch(err){
            console.log("PROFILE UPDATE API ERROR",err);
            toast.error(err.message);
            toast.dismiss(toastid);
        }
    }
}


export function saveprofile({about,gender,dateofbirth,contactno,token}){
    return async (dispatch)=>{

        const toastid=toast.loading("Loading...");
        
        let profile=JSON.parse(localStorage.getItem("profile"));
        try{
            const response=await apiConnector(
            "POST",
            userroutes.UPDATERPOFILE_API,
            {
                about , gender,dateofbirth,contactno
            },
            {
                Authorization:`Bearer ${token}`
            })

            if(!response.data.success){
                throw new Error(response.data.message)
            }

            console.log("PROFILE UPDATE API RESPONSE",response.data);
            profile.additionaldetails=response.data.data;
            localStorage.setItem("profile",JSON.stringify(profile));
            dispatch(setprofile(profile));
            toast.success(response.data.message)
            toast.dismiss(toastid);
            

        }
        catch(err){
            console.log("PROFILE UPDATE API ERROR",err);
            toast.error(err.message);
            toast.dismiss(toastid);
        }
    }
}