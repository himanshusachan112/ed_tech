
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

export const playlist_earning={
    CREATE_PLAYLIST: BASE_URL + "/playlist_earning/createplaylist",
    GET_PLAYLIST : BASE_URL + "/playlist_earning/getplaylist",
    UPLOAD_VIDEO : BASE_URL + "/playlist_earning/uploadvideo", 
    GET_PAGINATED_VIDEOS : BASE_URL + "/playlist_earning/getPaginatedVideos",
    SAVE_VIDEOWATCHTIME:BASE_URL + "/playlist_earning/savewatchtimevideo",
    WITHDRAW_AMOUNT : BASE_URL + "/playlist_earning/withdraw_amount"
}


export const messagesroutes={
    SENDREQUEST : BASE_URL + '/chatsection/sendRequest',
    GETRECIEVED_PENDINGREQUEST : BASE_URL + '/chatsection/getRecivedPendingRequests',
    ACCEPT_REQUEST : BASE_URL + '/chatsection/acceptRequest',
    GETSEND_PENDINGREQUEST : BASE_URL + '/chatsection/getSentPendingRequests',
    CREATE_GROUP : BASE_URL + '/chatsection/createGroup',
    ADD_MEMBERGROUP : BASE_URL + '/chatsection/addMemberToGroup',
    SEND_MESSAGE : BASE_URL + '/chatsection/sendMessage',
    GETMESSAGE_BYCHATID : BASE_URL + '/chatsection/getMessagesByChatId',
    GETUSER_CHATANDGROUPS : BASE_URL + '/chatsection/getUserChatsAndGroups',
}
