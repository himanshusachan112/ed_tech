import { apiConnector } from "../utils/Apiconnecter";
import { courseroutes, userroutes } from "../apis/apis";
import { setstep,setcourse,seteditcourse,resetCourseState } from "../slices/Courseslice";
import { toast } from "react-toastify";


export function createcourse(formdata,token){
    return async (dispatch)=>{
        const toastid=toast.loading("Loading...");
        try{
            const response=await apiConnector("POST",courseroutes.CREATECOURSE_API,formdata,
                {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                })
            console.log("CREATECOURSE_API RESPONSE",response);
            if(!response.data.success){
                throw new Error(response.data.message)
            }
            dispatch(setcourse(response.data.data))
            dispatch(setstep(2));
            dispatch(seteditcourse(false));
            toast.success(response.data.message);
            toast.dismiss(toastid);
        }
        catch(err){
            console.log("CREATECOURSE RESPONSE API ERROR",err);
            toast.error(err.message);
            toast.dismiss(toastid);

        }
    }
}

export function updatecourse(formdata,token){
    return async (dispatch)=>{
        const toastid=toast.loading("Loading...");
        try{
            const response=await apiConnector("POST",courseroutes.UPDATECOURSE_API,formdata,
                {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                })
            console.log("UPDATECOURSE_API RESPONSE",response);
            if(!response.data.success){
                throw new Error(response.data.message)
            }
            dispatch(setcourse(response.data.data))
            dispatch(setstep(2));
            dispatch(seteditcourse(false));
            toast.success(response.data.message);
            toast.dismiss(toastid);
        }
        catch(err){
            console.log("UPDATECOURSE RESPONSE API ERROR",err);
            toast.error(err.message);
            toast.dismiss(toastid);

        }
    }
 }


export function deletecourse(courseid,token,inscourses,setinscourses){
    return async (dispatch)=>{
        const toastid=toast.loading("Loading...");
        try{
            const response=await apiConnector("POST",courseroutes.DELETECOURSE_API,{courseid},{
                Authorization:`Bearer ${token}`
            });
            console.log("DELETE COURSE RESPONSE ",response);
            if(!response.data.success){
                throw new Error(response.data.message);
            }
           
            toast.success(response.data.message);
            toast.dismiss(toastid);
            const remainingcourses= inscourses.filter((singlecourse)=>singlecourse._id!==courseid)
            setinscourses(remainingcourses);
            
        }
        catch(err){
            console.log("DELETE COURSE API RESPONSE ERROR",err);
            toast.error(err.message);
            toast.dismiss(toastid);
        }
    }
}

export function createsection(name,courseid,token){
    return async (dispatch)=>{
        const toastid=toast.loading("Loading...");
        try{
            const response=await apiConnector("POST",courseroutes.CREATESECTION_API,
                {name,courseid,token},
                {
                    Authorization: `Bearer ${token}`,
                })
            
            console.log("CREATE SECTION API RESPONSE ",response)
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            dispatch(setcourse(response.data.data));
            toast.success(response.data.message);
            toast.dismiss(toastid);

        }
        catch(err){
            console.log("CREATE SECTION API RESPONSE ERROR ",err);
            toast.error(err.message);
            toast.dismiss(toastid);
        }
    }
}


export function updatesection(name,courseid,sectionid,token){
    return async (dispatch)=>{
        const toastid=toast.loading("Loading...");
        try{
            const response=await apiConnector("POST",courseroutes.UPDATESECTION_API,
                {name,courseid,sectionid,token},
                {
                    Authorization: `Bearer ${token}`,
                })
            
            console.log("UPDATE SECTION API RESPONSE ",response)
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            dispatch(setcourse(response.data.data));
            toast.success(response.data.message);
            toast.dismiss(toastid);

        }
        catch(err){
            console.log("UPDATE SECTION API RESPONSE ERROR ",err);
            toast.error(err.message);
            toast.dismiss(toastid);
        }
    }
}

export function deletesection(courseid,sectionid,token){
    return async (dispatch)=>{
        const toastid=toast.loading("Loading...");
        try{    
            const response=await apiConnector('POST',courseroutes.DELETESECTION_API,
            {courseid,sectionid,token},
            {
                Authorization: `Bearer ${token}`,
            })

            console.log("DELETE SECTION API RESPONSE ",response);
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            dispatch(setcourse(response.data.data));
            toast.success(response.data.message);
            toast.dismiss(toastid);

        }
        catch(err){
            console.log("DELETE SECTION API ERROR RESPONSE ",err);
            toast.error(err.message);
            toast.dismiss(toastid);
        }
    }
}

export function createsubsection(formdata,token){
    return async (dispatch)=>{
        const toastid=toast.loading("Loading...");
        try{
            const response=await apiConnector("POST",courseroutes.CREATESUBSECTION_API,formdata,
            {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            })
            console.log("CREATE SUBSECTION API RESPONSE ",response);
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            dispatch(setcourse(response.data.data));
            toast.success(response.data.message);
            toast.dismiss(toastid);

        }
        catch(err){
            console.log("CREATE SUBSECTION API ERROR ",err);
            toast.error(err.message);
            toast.dismiss(toastid);
        }
    }
}

export function updatesubsection(formdata,token){
    return async (dispatch)=>{
        const toastid=toast.loading("Loading...");
        try{
            const response=await apiConnector("POST",courseroutes.UPDATESUBSECTION_API,formdata,
            {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            })
            console.log("UPDATE SUBSECTION API RESPONSE",response);
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            dispatch(setcourse(response.data.data));
            toast.success(response.data.message);
            toast.dismiss(toastid);


        }
        catch(err){
            console.log("UPDATE SUBSECTION API RESPONSE ERROR ",err);
            toast.error(err.message);
            toast.dismiss(toastid);
        }
    }
}

export function deletesubsection(courseid,sectionid,subsectionid,token){
    return async (dispatch)=>{
        const toastid=toast.loading("Loading...");
        try{
            const response=await apiConnector("POST",courseroutes.DELETESUBSECTION_API,
            {courseid,sectionid,subsectionid},
            {
                Authorization: `Bearer ${token}`,
            })
            console.log("DELETE SUBSECTION API RESPONSE ",response);
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            dispatch(setcourse(response.data.data));
            toast.success(response.data.message);
            toast.dismiss(toastid);

        }
        catch(err){
            console.log("DELETE SUBSECTION API ERROR RESPONSE ",err);
            toast.error(err.message);
            toast.dismiss(toastid);
        }
    }
}

export function getaddcourses(token,setinscourses){
    return async (dispatch)=>{
        const toastid=toast.loading("Loading...");
        try{
            const response=await apiConnector("POST",courseroutes.GETADDCOURSES_API,null,
            {
                Authorization: `Bearer ${token}`,
            })
            console.log("GETADDCOURSE API RESPONSE ",response);
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            setinscourses(response.data.data);
            toast.success(response.data.message);
            toast.dismiss(toastid);
            
        }
        catch(err){
            console.log("GET ADDCOURSE API RESPONSE ERROR ",err);
            toast.error(err.message);
            toast.dismiss(toastid);
        }
    }
}





export function addtocourse(courseid,token){
    return async (dispatch)=>{
        const toastid=toast.loading("Loading...");
        try{
            const response=await apiConnector("POST",courseroutes.CREATECOURSEPROGRESS_API,
            {courseid},
            {
                Authorization: `Bearer ${token}`,
            })
            
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            console.log("CREATECOURSEPROGRESS API RESPONSE",response);
            toast.success(response.data.message);
            toast.dismiss(toastid);

        }
        catch(err){
            console.log("CREATE COURSEPROGRESS API RESPONSE ERROR ",err);
            toast.error(err.message);
            toast.dismiss(toastid);
        }
    }
}


