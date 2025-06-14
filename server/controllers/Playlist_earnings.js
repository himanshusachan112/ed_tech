const {pool}=require("../config/ConnectToDatabase");
const {cloudinaryuploader}=require("../utils/cloudinaryuploader");
const axios=require("axios");
require("dotenv").config();
const { v4: uuidv4 } = require('uuid');



const createplaylist=async(req,res)=>{
    try{
        console.log("comming")
        const {id,email}=req.user;
        const thumbnail=req.files.thumbnail;
        const {name}=req.body;



        // 1. Get user ID from email
            const userResult = await pool.query(
            `SELECT id FROM users WHERE email = $1`,
            [email]
            );

            if (userResult.rowCount === 0) {
            return res.status(404).json({ error: 'User not found' });
            }

            const user_id = userResult.rows[0].id;
            const thumbnailurl=(await cloudinaryuploader(thumbnail,process.env.FOLDER_NAME,1000,1000)).secure_url;

            // 2. Insert playlist
            const playlistResult = await pool.query(
            `INSERT INTO playlists (user_id, name, thumbnail_url) VALUES ($1, $2, $3) RETURNING *`,
            [user_id, name, thumbnailurl]
            );

            res.status(201).json({
                success:true,
                message:"playlist created",
                data:playlistResult.rows
            });
        
        
    }
    catch(err){
        console.log(err);
        res.status(404).json({
            success:false,
            message:"problem while creating playlist",

        })
    }
}

const getplaylist=async(req,res)=>{
    try{
        const {email}=req.user;
        const result = await pool.query(
      `
      SELECT
        p.id AS playlist_id,
        p.name AS playlist_name,
        p.thumbnail_url AS playlist_thumbnail,
        v.id AS video_id,
        v.title AS video_title,
        v.video_file,
        v.thumbnail_url AS video_thumbnail,
        v.description,
        v.taglist,
        v.watchtime,
        v.views,
        v.earnings
      FROM users u
      JOIN playlists p ON u.id = p.user_id
      LEFT JOIN videos v ON p.id = v.playlist_id
      WHERE u.email = $1
      ORDER BY p.id, v.id
      `,
      [email]
    );

    // Group by playlist
    const playlists = {};
    result.rows.forEach(row => {
      const pid = row.playlist_id;
      if (!playlists[pid]) {
        playlists[pid] = {
          playlist_id: pid,
          name: row.playlist_name,
          thumbnail_url: row.playlist_thumbnail,
          videos: []
        };
      }
      if (row.video_id) {
        playlists[pid].videos.push({
          id: row.video_id,
          title: row.video_title,
          video_file: row.video_file,
          thumbnail_url: row.video_thumbnail,
          description: row.description,
          taglist: row.taglist,
          watchtime: row.watchtime,
          views: row.views,
          earnings: row.earnings
        });
      }
    });

    res.json({
        success:true,
        message:"fetched playlists successfully",
        data:playlists
    })



    }
    catch(err){
        console.log(err.message);
        res.json({
            success:false,
            message:"error on playlist"
        })
    }
}

const uploadvideo=async(req,res)=>{
    try{

        const {
    playlistid,
    playlistName,
    videoTitle,
    description,
    tagList
  } = req.body;
  console.log("this is rq, body",req.body)
  console.log("one");
  const videofile = req.files.videoFile;
  const thumbnailfile = req.files.thumbnailFile;
  const watchtime=0;

  console.log("mid");
  const videoPath=(await cloudinaryuploader(videofile,process.env.FOLDER_NAME,1000,1000)).secure_url;
  console.log("mid++")
  const thumbnailPath=(await cloudinaryuploader(thumbnailfile,process.env.FOLDER_NAME,1000,1000)).secure_url;
  console.log("two")
  

  const result = await pool.query(
      `INSERT INTO videos (
        playlist_id, title, video_file, thumbnail_url,
        description, taglist, watchtime
      ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [
        playlistid,
        videoTitle,
        videoPath,
        thumbnailPath,
        description,
        JSON.parse(tagList),
        watchtime || 0
      ]
    );
    console.log("three")

        return res.json({
            success:true,
            message:"uploaded successfully",
            data:result.rows
        })

    }
    catch(err){
        console.log(err.message);
        return res.json({
            success:false,
            message:"error occoured while uploading playlist"
        })
    }
}


const getPaginatedVideos=async (req,res)=> {
  try{
    
    // Get query parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || ""; // optional search
    const offset = (page - 1) * limit;

    const result = await pool.query(`
      SELECT v.*
      FROM videos v
      INNER JOIN playlists p ON v.playlist_id = p.id
      WHERE 
        (LOWER(v.title) LIKE LOWER($1)
        OR EXISTS (
            SELECT 1 FROM unnest(v.taglist) AS tag
            WHERE LOWER(tag) LIKE LOWER($1)
        )
        OR LOWER(p.name) LIKE LOWER($1))
      ORDER BY v.id DESC
      LIMIT $2 OFFSET $3
    `, [`%${search}%`, limit, offset]);



    res.json({
      success: true,
      message:"fetched videos successfully",
      page,
      limit,
      data: result.rows,
    });

  }
  catch(err){
    console.log(err)
    return res.json({
      success:false,
      message:"cannot fetch videos"
    })
  }
}


const savewatchtimevideo=async(req,res)=>{
  try{
    const {videoid, time}=req.body;
    const response=await pool.query("update videos set watchtime=watchtime  + $1 where id=$2 returning *", [time,videoid]);
    return res.json({
      success:true,
      message:"updated watchtime successfully",
      data:response.rows
    })
  }
  catch(err){
    return res.json({
      success:false,
      message:"error occured whitle svaing watchtime"
    })
  }
}

// noe for making payouts to customeses. .................to be continued

const AUTH = {
  auth: {
    username: process.env.RAZORPAY_KEY,
    password: process.env.RAZORPAY_SECRET
  }
};

const createContact = async (user) => {
  const res = await axios.post(
    'https://api.razorpay.com/v1/contacts',
    {
      name: user.name,
      email: user.email,
      contact: user.phone,
      type: 'customer'
    },
    AUTH
  );
  return res.data.id;
};


const createVpaFundAccount = async (contact_id, vpa) => {
  const res = await axios.post(
    'https://api.razorpay.com/v1/fund_accounts',
    {
      contact_id,
      account_type: 'vpa',
      vpa: {
        address: vpa // e.g. "himanshu@okaxis"
      }
    },
    AUTH
  );
  return res.data.id;
};


const createPayout = async (fundAccountId,amount) => {
  const res = await axios.post(
    'https://api.razorpay.com/v1/payouts',
    {
      account_number: "7878780080316316",
      fund_account_id: fundAccountId,
      amount: amount,
      currency: "INR",
      mode: "UPI",
      purpose: "refund",
      queue_if_low_balance: true,
    },
    {
      auth: {
        username: process.env.RAZORPAY_KEY,
        password: process.env.RAZORPAY_SECRET
      },
      headers: {
        "Content-Type": "application/json",
        "X-Payout-Idempotency": "53cda91c-8f81-4e77-bbb9-7388f4ac6bf4"
      }
    }
  );

  return res.data;
};



const withdraw_amount=async(req,res)=>{
  try{
    const {email}=req.user;
    const { name, phone , vpa ,amount} = req.body;
    console.log(req.body);
    const user = {
      name: name,
      email: email,
      phone: phone
    };

    const contactId = await createContact(user);
    console.log("first");
    const fundAccountId = await createVpaFundAccount(contactId, vpa);
    console.log("second");
    const payout = await createPayout(fundAccountId, amount);

    

    res.json({ 
      success: true, 
      message:"withdrawl successfull",
      data:payout });
  }
  catch(err){
    console.log(err)
    res.json({
      success:false,
      message:err
    })
  }
}

//==============================================================


module.exports={createplaylist,getplaylist,uploadvideo, getPaginatedVideos, savewatchtimevideo,withdraw_amount};
