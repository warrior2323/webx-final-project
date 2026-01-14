const express=require('express')
const router =express.Router()
const {Pool} =require('pg')
const pool =new Pool({
    connectionString:process.env.DATABASE_URL,
    ssl:true
})

router.post("/users",async (req,res)=>{
    try{
    const get_query='SELECT username,id FROM users WHERE username!=$1'
    const result=await pool.query(get_query,[req.body.username])
    res.status(200).send(result.rows)
    }catch(err){
        console.error(err)
        res.status(500).send(err.message)
    }
})

router.post("/follow",async(req,res)=>{
    try{
        follow_query='INSERT INTO follows(following_id,follower_id) VALUES($1,$2)'
        const result=await pool.query(follow_query,[req.body.following_id,req.body.follower_id])
        res.status(200).send()
    }catch(err){
        console.error(err)
        res.status(500).send(err.message)
    }
})
module.exports=router