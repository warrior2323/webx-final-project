const express=require('express')
const router=express.Router()
const {Pool} =require('pg')

const pool=new Pool({
    connectionString:process.env.DATABASE_URL,
    ssl:true
})

router.get('/allblogs',async (req,res)=>{
    try{
        blog_query='SELECT posts.*, users.username FROM posts JOIN users ON posts.author_id = users.id;'
        const result=await pool.query(blog_query)
        console.log(result.rows)
        res.status(200).send(result.rows)
        
    }catch(err){
        console.error(err)
        res.status(500).send()
    }
})


module.exports=router