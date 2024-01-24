const User=require("../models/User");
const Section=require("../models/Section");
const Subsection=require("../models/Subsection");
const Course=require("../models/Course");
const Category=require("../models/Category");
const Courseprogress=require("../models/Courseprogress");
const Ratingandreviews=require("../models/Ratingandreviews")
require("dotenv").config();
const {cloudinaryuploader}=require("../utils/cloudinaryuploader");



//create course
exports.createcourse=async (req,res)=>{
    try{
        const {id,accounttype,email}=req.user;
        const image=req.files.thumbnail;
        const {coursename,coursedescription,whatyouwilllearn,
            price,tag:_tag,instructions:_instructions,
            category}=req.body;
        
        if(!id || !accounttype || !email || !image || !coursename || !coursedescription || !whatyouwilllearn
            || !price || !_tag || !_instructions  || !category){
                return res.json({
                    success:false,
                    message:"All Fields are Required",
                })
            }

        const user=await User.findById(id);
        if(!user){
            return res.json({
                success:false,
                message:"User Not Registered",
            })
        }

        const thumbnailurl=(await cloudinaryuploader(image,process.env.FOLDER_NAME,1000,1000)).secure_url;
        const cate=await Category.findOne({name:category})
        
        
        const tag=JSON.parse(_tag);
        const instructions=JSON.parse(_instructions);
        //save the course in course model
        const course=await Course.create({
            coursename,
            coursedescription,
            thumbnail:thumbnailurl,
            whatyouwilllearn,
            price,
            tag,
            instructions,
            status:"Draft",
            category: cate._id,
            instructor:id,
        },);
        console.log("course is saved=>",course);
        //add the course in category model.
        cate.courses.push(course._id);
        await cate.save();
        const fullcourse=await Course.findById(course._id).populate('category');

        //add the course in user model
        user.courses.push(course._id);
        await user.save();

        res.json({
            success:true,
            message:"course saved successfully",
            data:fullcourse,
        })
    }
    catch(err){
        console.log("error is ",err);
        return res.json({
            success:false,
            message:"Something went Wrong while saving Courses",
        })
    }
}


//update course
exports.updatecourse=async (req,res)=>{
    console.log("functio nreacher update path")
    try{
        const {id,accounttype,email}=req.user;
        console.log("first")
        const image=req?.files?.thumbnail;
        console.log(image)
        console.log("second")
        const {coursename,coursedescription,whatyouwilllearn,
            price,tag:_tag,instructions:_instructions,
            status,category,courseid}=req.body;
            console.log("thired")
        const user=await User.findById(id);
        if(!user){
            return res.json({
                success:false,
                message:"User Not Registered",
            })
        }
        let thumbnailurl=null
        const course=await Course.findById(courseid).populate("category");
        console.log("course found is=>",course);
        if(!course){
            return res.json({
                success:false,
                message:"Course Not Found",
            })
        }

        if(image){
            thumbnailurl=(await cloudinaryuploader(image,process.env.FOLDER_NAME,1000,1000)).secure_url;
            course.thumbnail=thumbnailurl;
        }
        if(coursename){
            course.coursename=coursename;
        }
        if(coursedescription){
            course.coursedescription=coursedescription;
        }
        if(whatyouwilllearn){
            course.whatyouwilllearn=whatyouwilllearn;
        }
        if(price){
            course.price=price;
        }
        if(_tag){
            const tag=JSON.parse(_tag);
            course.tag=tag;
        }
        if(_instructions){
            const instructions=JSON.parse(_instructions);
            course.instructions=instructions;
        }
        if(status){
            course.status=status;
        }
        if(category){
            await Category.updateMany(
                {courses:courseid},
                {$pull:{courses:courseid}},
            )

            const catid=await Category.findOneAndUpdate(
                {name:category},
                {$push:{courses:courseid}},
            )

            course.category=catid._id;
        }

        await course.save();
        const fullcourse=await Course.findById(courseid).populate('category');

        res.json({
            success:true,
            message:"Details Updated Successfully",
            data:fullcourse,
        })

    }
    catch(err){
        return res.json({
            success:false,
            message:"Something went wrong while updating course details"
        })
    }
}


//delete course
exports.deletecourse=async (req,res)=>{
    try{
        const {id,accounttype,email}=req.user;
        const {courseid}=req.body;
        const user=await User.findById(id);
        if(!user){
            return res.json({
                success:false,
                message:"User Not Registered",
            })
        }
        
        let subsec=[];
        const course=await Course.findById(courseid).populate("sections");
        course.sections.forEach((obj)=>{
            subsec=[...subsec,...obj.subsection]
        })

        if(!course){
            return res.json({
                success:false,
                message:"Course Not found"
            })
        }

        if(course.status==="Published"){
            return res.json({
                success:false,
                message:"Course is Published now Cannot be Deleted",
            })
        }

        //removing course from user.
        await User.findOneAndUpdate(
            {email},
            {$pull:{courses:courseid}},
            )

        //removing course from category
        await Category.updateMany(
            {courses:courseid},
            {$pull:{courses:courseid}},
        )

        //detlein course
        const deletedcourse=await Course.findByIdAndDelete(courseid);

        //deleting sections
        const sec=deletedcourse.sections;
        await Section.deleteMany(
            {_id:{$in:sec}},
        )

        //deleting subsections
        await Subsection.deleteMany(
            {_id:{$in:subsec}},
        )
        res.json({
            success:true,
            message:"Deleted Data Successfully",
        })

    }
    catch(err){
        return res.json({
            success:false,
            message:"something went wrong while deleting course"
        })
    }
}


//create section
exports.createsection=async (req,res)=>{
    try{
        const {id,email}=req.user;
        const {name,courseid}=req.body;
        if(!name || !id || !email){
            return res.json({
                success:false,
                message:"all fields are required",
            })
        }
        
        const user=await User.findById(id);
        if(!user){
            return res.json({
                success:false,
                message:"User not registered",
            })
        }

        const course=await Course.findById(courseid);
        if(!course){
            return res.json({
                success:false,
                message:"Course not found"
            })
        }

        const section=await Section.create({name});
        const newcourse=await Course.findOneAndUpdate(
            {_id:courseid},
            {$push:{sections:section._id}},
            {new:true}
        ).populate("sections")
        .populate("category")

        res.json({
            success:true,
            message:"Saved Section Successfully",
            data:newcourse,
        })


    }
    catch(err){
        return res.json({
            success:false,
            message:"something went wrong while saving section"
        })
    }
}


//update section
exports.updatesection=async (req,res)=>{
    try{
        const {id,email}=req.user;
        const {name,sectionid,courseid}=req.body;
        if(!name || !id || !email){
            return res.json({
                success:false,
                message:"all fields are required",
            })
        }
        
        const user=await User.findById(id);
        if(!user){
            return res.json({
                success:false,
                message:"User not Registered",
            })
        }

        const section=await Section.findByIdAndUpdate(sectionid,{name:name});
        if(!section){
            return res.json({
                success:false,
                message:"Section not found"
            })
        }

        const course=await Course.findById(courseid).populate("sections").populate("category");
        res.json({
            success:true,
            message:"Section Updated Successfully",
            data:course,
        })
    }
    catch(err){
        return res.json({
            success:false,
            message:"something went wrong while updating section"
        })
    }
}


//delete section
exports.deletesection= async (req,res)=>{
    try{
        const {id,email}=req.user;
        const {sectionid,courseid}=req.body;
        if( !id || !email){
            return res.json({
                success:false,
                message:"all fields are required",
            })
        }
        
        const user=await User.findById(id);
        
        if(!user){
            return res.json({
                success:false,
                message:"User not Registered",
            })
        }

        


        //deelte section
        const section=await Section.findByIdAndDelete(sectionid);
        const subsec=section.subsection;
        console.log("subsections are",subsec);
        //delete all subsectins
        await Subsection.deleteMany(
            {_id:{$in:subsec}}
        )
        //deelte from courseprogress
        
        await Courseprogress.updateMany({course:courseid},
            {$pull:{completedvideos:{$in:subsec}}})
        //remove from course
        const newcourse=await Course.findByIdAndUpdate(courseid,
            {$pull:{sections:sectionid}},
            {new:true}).populate("sections").populate("category");

        res.json({
            success:true,
            message:"Section deleted Successfully",
            data:newcourse,
        })

    }
    catch(err){
        return res.json({
            success:false,
            message:"something went wrong while deleteing the section"
        })
    }
}


//create subsection
exports.createsubsection=async (req,res)=>{
    try{
        const {id,email}=req.user;
        const {title,description,sectionid,courseid}=req.body;
        const video=req.files.video;
        if(!id || !email || !title || !description){
            return res.json({
                success:false,
                message:"All fields are required"
            })
        }
        const user=await User.findById(id);
        if(!user){
            return res.json({
                success:false,
                message:"User not Registered"
            })
        }

        const response=await cloudinaryuploader(video,process.env.FOLDER_NAME);
        const videourl=response.secure_url;
        const duration=response.duration;
        console.log("videourl is =>",videourl)
        const subsection=await Subsection.create({
            title,description,videourl,duration
        })
        console.log("subsection is =>",subsection);

        await Section.findByIdAndUpdate(sectionid,
            {$push:{subsection:subsection._id}});
        console.log("first");
        const newcourse=await Course.findById(courseid).populate({
            path:"sections",
            populate:{
                path:"subsection",
            }
        })
        .populate("category");
        console.log("second");
        console.log("coureeeee is=>",newcourse)

        res.json({
            success:true,
            message:"subsection created successfully",
            data:newcourse,
        })

    
    }
    catch(err){
        console.log("error is=>",err)
        return res.json({
            success:false,
            message:"something went wrong while createinn subsection",
        })
    }
}


//update subsection
exports.updatesubsection= async (req,res)=>{
    try{
        const {id,email}=req.user;
        const {title,description,sectionid,courseid,subsectionid}=req.body;
        const video=req?.files?.video;
        console.log("video data is ",video)
        
        const user=await User.findById(id);
        if(!user){
            return res.json({
                success:false,
                message:"User not Registered"
            })
        }

        const subsection=await Subsection.findById(subsectionid);
        if(!subsection){
            return res.json({
                success:false,
                message:"No subsection found",
            })
        }

        if(title){
            subsection.title=title;
        }
        if(description){
            subsection.description=description;
        }
        if(video){
            const response=await cloudinaryuploader(video,process.env.FOLDER_NAME);
            console.log("response of video url",response);
            subsection.videourl=response.secure_url;
            subsection.duration=response.duration;
        }

        await subsection.save();

        const newcourse=await Course.findById(courseid).populate({
            path:"sections",
            populate:{
                path:"subsection",
            }
        })
        .populate("category");
        

        res.json({
            success:true,
            message:"Updated subsection successfully",
            data:newcourse,
        })

    }
    catch(err){
        console.log("error in update section is ",err)
        return res.json({
            success:false,
            message:"something went wrong while updating subsection"
        })
    }
}


//delete subsection
exports.deletesubsection=async (req,res)=>{
    try{
        const {id,email}=req.user;
        const {sectionid,courseid,subsectionid}=req.body;
        
        const user=await User.findById(id);
        if(!user){
            return res.json({
                success:false,
                message:"User not Registered"
            })
        }

        //delete subsection
        const subsection=await Subsection.findByIdAndDelete(subsectionid);
        if(!subsection){
            return res.json({
                success:false,
                message:"No subsection found",
            })
        }

        //romove subsection from section.
        await Section.findByIdAndUpdate(sectionid,
            {$pull:{subsection:subsectionid}});
        
        //remove from courseprogress.
        await Courseprogress.updateMany(
            {completedvideos:subsectionid},
            {$pull:{completedvideos:subsectionid}}
        )

        const newcourse=await Course.findById(courseid).populate({
            path:"sections",
            populate:{
                path:"subsection",
            }
        })
        .populate("category");

        res.json({
            success:true,
            message:"Subsection Deleted Successfully",
            data:newcourse,
        })
    }
    catch(err){
        return res.json({
            success:false,
            message:"something went wrong while delting subsection"
        })
    }
}


exports.getinstructorcourse=async (req,res)=>{
    try{
        const {id,email}=req.user;
        const user=await User.findById(id).populate({
            path:"courses",
            populate:[
                {path:"ratingandreviews"},
                {path:"category"},
                {path:"sections",
                    populate:{path:"subsection"}},

            ]
            
        });
        console.log("dsa",user)
        if(!user){
            return res.json({
                success:false,
                message:"User Not Registered",
            })
        }

        

        

        

        res.json({
            success:true,
            message:"fetched details successfylly",
            data:user.courses,
        })




    }
    catch(err){
        console.log("eror is ",err)
        return res.json({
            success:false,
            message:"something went wrong while fetching course details"
        })
    }
}

exports.getcategorycourses=async (req,res)=>{
    try{
        const {firstcategory}=req.body;
        console.log(firstcategory)
        const catedata=await Category.find({}).populate({
            path:"courses",
            populate:{
                path:"ratingandreviews"
            }
        })
        
        const reqcate=catedata.filter((cate)=>cate.name===firstcategory);
        const othercate=catedata.filter((cate)=>cate.name!==firstcategory);

        console.log("catedata si =>",catedata);



        res.json({
            success:true,
            message:"Fetched cat data successfuly",
            data:[...reqcate,...othercate]
        })
    }
    catch(err){
        console.log("error is ",err)
        return res.json({
            success:false,
            message:"something went wrong while getting category courses"
        })
    }
}


exports.createcourseprogress=async (req,res)=>{
    try{
        const {email,id}=req.user;
        const {courseid}=req.body;

        

        const user=await User.findById(id);
        if(!user){
            return res.json({
                success:true,
                message:"User not Registered",
            })
        }

        await Course.findByIdAndUpdate(courseid,
            {$push:{studentsenrolled:id}})

        await User.findByIdAndUpdate(id,
            {$push:{courses:courseid}})

        const courseprogress=await Courseprogress.create({course:courseid,email});
        await User.findByIdAndUpdate(id,
            {$push:{courseprogress:courseprogress._id}});
        res.json({
            success:true,
            message:"course progress created",
        })

    }
    catch(err){
        return res.json({
            success:false,
            message:"somethign went wrong while crating course fprogress"
        })
    }
}


exports.updatecourseprogress=async (req,res)=>{
    try{
        const {id,email}=req.user;
        const {courseid,subsectionid}=req.body;
        const user=await User.findById(id).populate("courseprogress");
        if(!user){
            return res.json({
                success:true,
                message:"User not Registered",
            })
        }
        const subsec=(await Courseprogress.findOne({email,course:courseid}))?.completedvideos;
        console.log("list of completed videos is",subsec);
        if(subsec?.some((ele)=>ele==subsectionid)){
            return res.json({
                success:false,
                message:"Already seen the video"
            })
        }

        const updateprogrress=await Courseprogress.findOneAndUpdate({email:email , course:courseid},
            {$push:{completedvideos:subsectionid}},{new:true});
        
        res.json({
            success:true,
            message:"course progress updated successfully",
            data:updateprogrress
        })

    }
    catch(err){
        console.log(err)
        return res.json({
            success:false,
            message:"something went wrong while updating course progress"
        })
    }
}

exports.getcompletedvideos=async (req,res)=>{
    try{
        const {id,email}=req.user;
        const {courseid}=req.body;
        const completedvideos=await Courseprogress.findOne({email:email , course:courseid});
        res.json({
            success:true,
            message:"fetched completed videos",
            data:completedvideos,
        })
    }
    catch(err){
        return res.json({
            success:false,
            message:"something went wrong",
        })
    }
}


exports.getcourse=async (req,res)=>{
    try{
        const {id,email}=req.user;
        const {courseid}=req.body;
        if(!id){
            return res.json({
                success:false,
                message:"User not found"
            })
        }
        
        const course=await Course.findById(courseid).populate("instructor").populate("sections").populate("category").populate("ratingandreviews");
        console.log("course  data is ",course);

        if(!course){
            return res.json({
                success:false,
                message:"Course not found"
            })
        }

        


        // if(course.sustus!=="Published"){
        //     return res.json({
        //         success:false,
        //         message:"Course is under draft"
        //     })
        // }

        res.json({
            success:true,
            message:"Course  fetched successfully",
            data:course,
        })

    }
    catch(err){
        return res.json({
            success:false,
            message:"somethign went wrong while fetcheing courses"
        })
    }
}


exports.coursepagedetails=async (req,res)=>{
    try{
       const {courseid}=req.body;
       const coursedata=await Course.findById(courseid)
       .populate({
        path:"sections",
        populate:{
            path:"subsection"
        }
       })
       if(!coursedata){
        return res.json({
            success:false,
            message:"No Course found"
        })
       }

       res.json({
        success:true,
        message:"Fetched Course details successfully",
        data:coursedata,
       })

    }
    catch(err){
        return res.json({
            success:false,
            message:"somethng went wrong while fethcing course detaisl"
        })
    }
}


exports.getenrolledcourses=async (req,res)=>{
    try{
        const id=req.user.id;
        const user=await User.findById(id).populate({
            path:"courses",
            populate:{
                path:"instructor"
            }
        });
        if(!user){
            return res.json({
                success:false,
                message:"User not registerd"
            })
        }

        res.json({
            success:true,
            message:"fetched courses succcessfully",
            data:user
        })
    }
    catch(err){
        return res.json({
            success:false,
            message:"something went wrong while fetching courses"
        })
    }
}


exports.createrating=async (req,res)=>{
    try{
        const {id,email}=req.user;
        const {courseid,rating,review}=req.body;
        if(!courseid || !rating || !review){
            return res.json({
                success:false,
                message:"All fields are required"
            })
        }
        const checkuser=await User.findById(id);
        if(!checkuser){
            return res.json({
                success:false,
                message:"User Not registered"
            })
        }

        const checkreview=await Ratingandreviews.findOne({user:id,course:courseid})
        if(checkreview){
            return res.json({
                success:false,
                message:"Review Can be Given Once"
            })
        }

        const ratingreview=await Ratingandreviews.create({
            user:id,
            course:courseid,
            rating,
            review
        })

        const course=await Course.findByIdAndUpdate(courseid,
            {$push:{ratingandreviews:ratingreview._id}})

        res.json({
            success:true,
            message:"Review Created Successfully"
        })

    }
    catch(err){
        return res.json({
            success:false,
            message:"something went wrsong while creating review"
        })
    }
}







