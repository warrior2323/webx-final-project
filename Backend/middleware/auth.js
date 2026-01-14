const jwt=require("jsonwebtoken")

const authenticateToken=(req,res,next)=>{
    const authHeader=req.headers['authorization']
    const token=authHeader && authHeader.split(' ')[1]
    if(!token) return res.status(500).send('"You have not logged in !"')

    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
        if(err){
            console.log(err.message)
        }
        if(err) return res.status(500).send('"Pehle hi fursat mein nikal"')
        next()
    })
}

module.exports={authenticateToken}