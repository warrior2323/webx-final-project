require('dotenv').config()
const express=require('express')
const router=express.Router()
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const {Pool}=require('pg')

router.use(express.json())

const pool = new Pool({
    connectionString:process.env.DATABASE_URL,
    ssl:true
})

router.post('/signup',async (req,res)=>{
     try{
        const find_query='SELECT * FROM users WHERE username = $1'
        const result= await pool.query(find_query,[req.body.username])
        console.log(result.rows[0])
        if(result.rows.length===0){
            const salt= await bcrypt.genSalt()
            const hashedPassword =await bcrypt.hash(req.body.password,salt)
            console.log(salt)
            console.log(hashedPassword)
            const insert_query='INSERT INTO users(username,email,password_hash) VALUES($1,$2,$3) RETURNING *'
            const newUser= await pool.query(insert_query,[req.body.username,req.body.email,hashedPassword])
            const userData=newUser.rows[0]

            const user={username:req.body.username}
            const accessToken=jwt.sign(user,process.env.ACCESS_TOKEN_SECRET)
            res.status(200).json({accessToken:accessToken,id:userData.id,username:req.body.username})
        }else{
            res.status(400).send('"user already exists"')
        }
    }catch(err){
        console.error(err)
        res.status(500).send()
    }
})

router.post("/login",async (req,res)=>{
    console.log(req.body)
    try{
        const find_query='SELECT * FROM users WHERE username = $1'
        const result =await pool.query(find_query,[req.body.username])
        
        if(result.rows.length!=0){           
            console.log(req.body.password)
            const password =result.rows[0].password_hash   
            const id=result.rows[0].id
            const username=req.body.username
            console.log(password)
            if(await bcrypt.compare(req.body.password , password)){

                const user={username:req.body.username}
                const accessToken=jwt.sign(user,process.env.ACCESS_TOKEN_SECRET)
                res.status(200).json({accessToken:accessToken,id:id,username:username})
            }else{
                res.send('"wrong password"')
            }
        }else{
            res.status(400).send('"username does not exits"')
        }
    }catch(err){
        console.error(err)
        res.status(500).send(err.message)
    }
})
module.exports=router
