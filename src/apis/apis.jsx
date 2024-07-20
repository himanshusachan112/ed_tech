import { FaBackward } from "react-icons/fa"

const BASE_URL=process.env.REACT_APP_BASE_URL
//user routes apis
export const authroutes={
    SENDOTP_API:BASE_URL+"/auth/sendotp",
    SIGNUP_API:BASE_URL+"/auth/signup",
    LOGIN_API:BASE_URL+"/auth/login",
    FORGOTPASSWORDTOEKN_API:BASE_URL+"/auth/forgotpasswordtoken",
    FORGOTPASSWORD_API:BASE_URL+"/auth/forgotpassword",
}

export const categoryroutes={
    CREATECATEGORY_API:BASE_URL+"/category/createcategory",
    FETCHCATEGORY_API:BASE_URL+"/category/fetchcategory",
    UPDATECATEGORY_API:BASE_URL+"/category/updatecategory",
    DELETECATEGORY_API:BASE_URL+"/category/deletecategory",
}

export const userroutes={
    UPDATERPOFILE_API:BASE_URL+"/user/updateprofile",
    UPDATEUSER_API:BASE_URL+"/user/updateuser",
}

export const courseroutes={
    CREATECOURSE_API:BASE_URL+"/course/createcourse",
    UPDATECOURSE_API:BASE_URL+"/course/updatecourse",
    DELETECOURSE_API:BASE_URL+"/course/deletecourse",
    CREATESECTION_API:BASE_URL+"/course/createsection",
    UPDATESECTION_API:BASE_URL+"/course/updatesection",
    DELETESECTION_API:BASE_URL+"/course/deletesection",
    CREATESUBSECTION_API:BASE_URL+"/course/createsubsection",
    UPDATESUBSECTION_API:BASE_URL+"/course/updatesubsection",
    DELETESUBSECTION_API:BASE_URL+"/course/deletesubsection",
    GETADDCOURSES_API:BASE_URL+"/course/getaddcourse",
    GETCATEGORYCOURSES_API:BASE_URL+"/course/getcategorycourses",
    GETCOURSE_API:BASE_URL+"/course/getcourse",
    CREATECOURSEPROGRESS_API:BASE_URL+"/course/createcourseprogress",
    UPDATECOURSEPROGRESS_API:BASE_URL+"/course/updatecourseprogress",
    GETENROLLEDCOURSES_API:BASE_URL+"/course/getenrolledcourses",
    GETCOURSEPAGEDETAILS_API:BASE_URL+"/course/coursepagedetails",
    GETCOMPLETEDVIDEOS_API:BASE_URL+"/course/getcompletedvideos",
    CREATERAING_API:BASE_URL+"/course/createrating",
}


export const paymentroutes={
    CAPTUREPAYMENT_API:BASE_URL+"/payment/capturepayment",
    VERIFYPAYMENT_API:BASE_URL+"/payment/verifypayment",
    SENTPAYMENTSUCCESSEMAIL_API:BASE_URL+"/payment/paymentsuccessemail",
}


export const contactusEndpoint={
    CONTACT_US_API: BASE_URL + "/reach/contact"
}

