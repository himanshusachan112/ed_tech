import {toast} from "react-toastify";
import { apiConnector } from "../utils/Apiconnecter";
import { authroutes } from "../apis/apis";
import { setuserdata,setloading,settoken } from "../slices/Authslice";
import {setprofile} from "../slices/Profileslice"






export function sendotp(email,navigate){
    return async (dispatch)=>{
        let toastid=null;
        try{
            toastid=toast.loading("Loading...");
            dispatch(setloading(true));
            const response=await apiConnector(
                "POST",
                authroutes.SENDOTP_API,
                {email},
            )
            console.log("SENDOTP API RESPONSE=>",response?.data?.data)
            if (!response.data.success) {
                throw new Error(response.data.message)
              }
            else{
                toast.success(response.data.message)
            }
            dispatch(setloading(false));
            navigate("/verify-otp");
            toast.dismiss(toastid);
            

        }
        catch(err){
            console.log("SEND OTP RESPONSE ERROR =>" ,err);
            toast.error("OTP Not Send Successfully");
            toast.dismiss(toastid);
           
        }
    }
}


export function signup(
    navigate,
    firstname,
    lastname,
    accounttype,
    email,
    password,
    confirmpassword,
    otp){
        console.log("first name in servies",firstname)
        
       return async (dispatch)=>{
        console.log("executing signup form")
        try{
            dispatch(setloading(true));
            const toastid=toast.loading("Loading...");
            const response=await apiConnector(
                "POST",
                authroutes.SIGNUP_API,
                {firstname,
                lastname,
                email,
                password,
                confirmpassword,
                accounttype,
                otp}
            )
            console.log("SIGNUPAPI RESPONSE=>",response?.data?.data)
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            else{
                toast.success(response.data.message)
            }
            dispatch(setuserdata(response.data.data));
            navigate("/login");
            dispatch(setloading(false));
            toast.dismiss(toastid);

        }
        catch(err){
            console.log("SIGNUP API RESOPONSE ERROR=>" ,err);
            toast.error("Signup Failed");
        }
       }
}


export function login(email,password,navigate){
    return async (dispatch)=>{
        const toastid=toast.loading("Loading...")
        try{
            
            dispatch(setloading(true));

            const response=await apiConnector(
                "POST",
                authroutes.LOGIN_API,
                {
                    email,
                    password,
                }
            )
            console.log("LOGIN_API RESPONSE =>",response)
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            dispatch(setprofile(response.data.data));
            dispatch(settoken(response.data.token));
            
            localStorage.setItem("token",JSON.stringify(response.data.token));
            localStorage.setItem("profile",JSON.stringify(response.data.data));
            toast.success("Login Successfull");
            navigate("/dashboard/my-profile");

        }
        catch(err){
            console.log("LOGIN_API RESPOSNE ERROR=>",err);
            toast.error(err.message);
            navigate("/signup")
        }
        dispatch(setloading(false));
        toast.dismiss(toastid)
    }
}


export function sentforgotpasswordlink(email){
    return async(dispatch)=>{
        const toastid=toast.loading("Sending Password Reset Link...");
        try{
            const response=await apiConnector(
                "POST",
                authroutes.FORGOTPASSWORDTOEKN_API,
                {
                    email
                }

            )

            console.log("FORGOT PASSWORD LINK API RESPONSE=>",response.data)
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            toast.dismiss(toastid);
            toast.success("Link send Successfully");

        }


        catch(err){
            console.log("FORGOT PASSWORD LINK API ERROR=>",err.message)
            toast.dismiss(toastid);
            toast.error(err.message);
        }

    }
}


export function resetpassword(password,confirmpassword,token,navigate){
    return async (dispatch)=>{
        const toastid=toast.loading("Loading...");
        try{
            const response=await apiConnector(
                "POST",
                authroutes.FORGOTPASSWORD_API,
                {password,
                confirmpassword,
                token}
            )
            
            console.log("FORGOT PASSWORD API RESPOSNE=>",response);
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            toast.dismiss(toastid);
            toast.success(response.data.message);
            navigate('/login')
        }
        catch(err){
            console.log('FORGOT PASSWORD API  RESPONSE=>',err);
            toast.dismiss(toastid);
            toast.error(err.message);

        }
    }
}


export function logout(navigate){
    return async (dispatch)=>{
        localStorage.removeItem("profile");
        localStorage.removeItem("token");
        dispatch(setprofile(null));
        dispatch(settoken(null));
        navigate('/');
        toast.success("LoggedOut Successfully")
    }
}