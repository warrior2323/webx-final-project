const express=require("express")
const router=express.Router()
const {Pool}=require('pg')

const pool=new Pool({
    connectionString:process.env.DATABASE_URL,
    ssl:true
})

router.post("/like",async (req,res)=>{
    try{
        NEW_LIKE_QUERY='INSERT INTO likes(user_id,post_id) VALUES($1,$2)'
        await pool.query(NEW_LIKE_QUERY,[req.body.id,req.body.post_id])
        res.status(200).send('"chal gya sir"')
    }catch(err){
        console.error(err)
        res.status(500).send()
    }
})
router.delete("/like",async (req,res)=>{
    try{
        const DELETE_LIKE_QUERY='DELETE FROM likes WHERE user_id=$1 AND post_id=$2'
        await pool.query(DELETE_LIKE_QUERY,[req.body.id,req.body.post_id])
        res.status(200).send('"chal gya sir"')
    }catch(err){
        console.error(err)
        res.status(500).send()
    }
})

router.post("/like_check",async (req,res)=>{
    try{
        GET_STATUS_QUERY='SELECT * FROM likes where user_id=$1 AND post_id=$2'
        const row=await pool.query(GET_STATUS_QUERY,[req.body.id,req.body.post_id])
        if(row.rows.length==0){
            res.status(200).send('"none"')
        }else{
            res.status(200).send('"black"')
        }
    }catch(err){
        console.error(err)
        res.status(500).send()
    }
})


router.post("/comment",async (req,res)=>{
    try{
        NEW_POST_QUERY='INSERT INTO comments(user_id,post_id,comment,user_username) VALUES($1,$2,$3,$4)'
        await pool.query(NEW_POST_QUERY,[req.body.id,req.body.post_id,req.body.comment,req.body.user_username])
        res.status(200).send('"Comment set!"')
    }catch(err){
        console.error(err)
        res.status(500).send()
    }
})

router.post("/getcomment",async(req,res)=>{
    try{
        GET_COMMENTS_QUERY='SELECT comment FROM comments where post_id=$1 ORDER BY id DESC'
        const result =await pool.query(GET_COMMENTS_QUERY,[req.body.post_id])
        res.status(200).json(result.rows)
    }catch(err){
        console.error(err)
        res.status(500).send()
    }
})

module.exports=router




