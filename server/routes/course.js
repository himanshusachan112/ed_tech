const express=require("express");
const router=express.Router();

const {isadmin,isinstructor,isstudent,auth}=require("../middlewares/auth");
const {createcourse,
    updatecourse,
    deletecourse,
    createsection,
    updatesection,
    deletesection,
    createsubsection,
    updatesubsection,
    deletesubsection,
    getinstructorcourse,

    createcourseprogress,
    updatecourseprogress,
    getcategorycourses,
    getcourse,
    getenrolledcourses,
    coursepagedetails,
    getcompletedvideos,
    createrating}=require("../controllers/course");



//routes for instructor
router.post("/createcourse",auth,isinstructor,createcourse);
router.post("/updatecourse",auth,isinstructor,updatecourse);
router.post("/deletecourse",auth,isinstructor,deletecourse);

router.post("/createsection",auth,isinstructor,createsection);
router.post("/updatesection",auth,isinstructor,updatesection);
router.post("/deletesection",auth,isinstructor,deletesection);

router.post("/createsubsection",auth,isinstructor,createsubsection);
router.post("/updatesubsection",auth,isinstructor,updatesubsection);
router.post("/deletesubsection",auth,isinstructor,deletesubsection);


router.post("/getaddcourse",auth,isinstructor,getinstructorcourse);
router.post("/getcategorycourses",getcategorycourses);
router.post("/getcourse",auth,getcourse);




//routes for student.

router.post("/createcourseprogress",auth,isstudent,createcourseprogress);
router.post("/updatecourseprogress",auth,isstudent,updatecourseprogress);
router.post("/getcompletedvideos",auth,isstudent,getcompletedvideos);
router.post("/getenrolledcourses",auth,isstudent,getenrolledcourses);
router.post("/coursepagedetails",auth,isstudent,coursepagedetails);
router.post("/createrating",auth,isstudent,createrating);

module.exports=router;