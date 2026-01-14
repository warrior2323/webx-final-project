const express=require('express')
const router=express.Router()
const {Pool}=require('pg')

const pool=new Pool({
    connectionString:process.env.DATABASE_URL,
    ssl:true
})

router.post('/write', async (req ,res )=>{
    try{
        const post=req.body
        write_query='INSERT INTO posts(author_id,title,content,summary) VALUES($1,$2,$3,$4)'
        const new_post=await pool.query(write_query,[post.author_id,post.title,post.content,post.summary])
        console.log(new_post)
        res.status(200).send('"Post successfully created"')
    }catch(error){
        console.error(error)
        res.status(500).send()
    }
})

module.exports=router