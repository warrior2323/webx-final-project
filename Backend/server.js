require('dotenv').config()
const express = require('express')
const login =require('./routes/login.js')
const allBlogs =require('./routes/allblogs.js')
const myBlogs =require('./routes/myblogs.js')
const likecomment=require('./routes/likecomment.js')
const getusers=require('./routes/getusers.js')
const {authenticateToken}=require('./middleware/auth.js')
const cors=require('cors')
const { Pool } = require('pg')

const app = express()
PORT=3000

app.use(express.json())


const pool =new Pool({
    connectionString:process.env.DATABASE_URL,
    ssl:true
})

pool.connect()
.then(()=> console.log("connected"))
.catch((err)=> console.error(err))
app.use(cors())

app.use("/api",login)
app.use("/read",authenticateToken,allBlogs)
app.use('/owner',authenticateToken,myBlogs)
app.use('/likecomment',authenticateToken,likecomment)
app.use("/getusers",authenticateToken,getusers)
app.listen(PORT,()=>{
    console.log("server is listening.........")
})


