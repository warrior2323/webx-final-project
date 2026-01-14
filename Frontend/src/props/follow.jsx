import {useState} from "react"
import default_img from "../assets/default.png"
export default function Follow(props){
    const [isFollow,setIsFollow]=useState("Follow")
    const token=localStorage.token
    const handleFollowClick=async(username)=>{
        try{
        const response =await fetch("http://localhost:3000/getusers/follow",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            },
            body:JSON.stringify({
                "follower_id":parseInt(localStorage.userId, 10),
                "following_id":props.value.id
            })
        })
        
        const data=await response.json()

        if(response.ok){
            setIsFollow("Following")
            console.log("Successfully followed")
        }else{
            console.log("not followed")
        }}catch(err){
            console.error(err)
        }
    }

    return(
        <div className='bg-violet-500 mb-2 rounded-2xl h-12 flex justify-between items-center '>
                            <div className='flex justify-left items-center'>
                            <img src={default_img} className='h-5 md:h-10'></img>
                            <h1 className='text-white text-[20px] ml-2'>{props.value.username}</h1>
                            </div>
                            <button className='text-white mr-3 rouned-2xl cursor-pointer text-[20px]' onClick={()=>handleFollowClick(props.value.username)}>{isFollow}</button>
        </div>
    )
}