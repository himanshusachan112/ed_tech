 const mongoose=require("mongoose");
 require("dotenv").config();
  const { Pool } = require('pg');


 const databaseConnect_mongodb=async ()=>{
    await mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then(()=>{
        console.log("Mongodb database connection is successful");
    })
    .catch((err)=>{
        console.log("Mongodb database conncection faliled");
        console.error(err);
        process.exit(1);
    })
 }




// thsi is proste sql


const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
     rejectUnauthorized: false, // path to your downloaded CA cert
  },
});

const databaseConnect_prostesql = async () => {
  try {
    await pool.connect();
    console.log('Connected to PostgreSQL database');
  } catch (error) {
    console.error('Database PostgreSQL connection error:', error);
    process.exit(1); // exit process with failure
  }
};



 module.exports={
    databaseConnect_mongodb,
    databaseConnect_prostesql,
    pool
 }