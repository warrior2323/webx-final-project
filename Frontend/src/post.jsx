import { useLocation } from "react-router-dom"
import {ThumbsUp} from "lucide-react"
import {useState,useEffect} from "react"
import {ArrowLeft} from "lucide-react"
const API_BASE_URL=import.meta.env.VITE_BACKEND_URL
export default function Post(){
    const location=useLocation()
    const {title,content,username,date,post_id}=location.state || {}
    const [isLiked,setIsLiked]=useState(false)
    const [fillColor,setFillColor]=useState("none")
    const [isVisible,setVisible]=useState(false)
    const [comment ,setComment]=useState("")
    const [comments,setComments]=useState([])
    const token=localStorage.userToken

    useEffect(()=>{

        const checkLikeStatus=async ()=>{
         const response =await fetch(`${API_BASE_URL}/likecomment/like_check`,{
            method:'POST',
            headers:{
                'Content-Type':"application/json",
                "Authorization": `BEARER ${token}`
            },
            body:JSON.stringify({
                    id:localStorage.userId,
                    post_id:post_id
            })
         })
         const data =await response.json()

         if(response.ok){
            if(data==="black"){
                setIsLiked(true)
                setFillColor("black")
            }else{
                setIsLiked(false)
                setFillColor("none")
            }
         }
    }
    checkLikeStatus()

},[])
      
    useEffect(()=>{
        const getComments=async ()=>{
            const response = await fetch(`${API_BASE_URL}/likecomment/getcomment`,{
                method:"POST",
                headers:{
                    'Content-Type':'application/json',
                    "Authorization": `BEARER ${token}`
                },
                body:JSON.stringify({
                    post_id:post_id
                })        
            })

            const data = await response.json()

            if(response.ok){
                const comments_=data.map((value,index)=><p className="text-white ml-12 mt-2 text-[20px]" key={index}>{value.user_username} : {value.comment}</p>)
                setComments(comments_)            
            }else{
                console.log("there is some mistake.")
            }        
        }

        getComments()
    })


    const handleSubmitComment=async (e)=>{
        e.preventDefault()
        setVisible(false)
        
        if(comment===""){
            return alert("comment something bro!")
        }

        const response =await fetch(`${API_BASE_URL}/likecomment/comment`,{
            method:'POST',
            headers:{
                'Content-Type':"application/json",
                "Authorization": `BEARER ${token}`
            },
            body:JSON.stringify({
                id:localStorage.userId,
                post_id:post_id,
                comment:comment,
                user_username:localStorage.username
            })
         })

         const data =await response.json()

         if(response.ok){
            console.log(data)
         }else{
            console.log(data)
         }
    }

    const handleClick=async (e)=>{
        e.preventDefault()


        setIsLiked(!isLiked)

        if(isLiked){
            setFillColor("black")

            const response= await fetch(`${API_BASE_URL}/likecomment/like`,{
                method:"POST",
                headers:{
                    'Content-Type':"application/json",
                    "Authorization": `BEARER ${token}`
                },
                body:JSON.stringify({
                    id:localStorage.userId,
                    post_id:post_id
                })  
            })

            const data=await response.json()
            if(response.ok){
                console.log(data)
            }else{
                console.log("error hai bro kuch ")
            }
        }else{
           setFillColor("none")

           const response=await fetch(`${API_BASE_URL}/likecomment/like`,{
            method:"DELETE",
            headers:{
                'Content-Type':"application/json",
                "Authorization": `BEARER ${token}`
            },
            body:JSON.stringify({
                id:localStorage.userId,
                post_id:post_id
            })

           })
        }
    }
    
    return(    
        <>
        {isVisible && 
        <div className="fixed top-0 left-0 flex justify-center items-center z-1000 h-full w-full">
            <div className="flex flex-col justify-start bg-black p-5 rounded-xl z-1000 w-[30%] h-[15%]">
                <div className="flex items-left mb-2">
                    <button onClick={()=>{setVisible(false)}}>
                        <ArrowLeft className="h-10 w-10 text-violet-500 cursor-pointer"></ArrowLeft>
                    </button>
                </div>
                <form onSubmit={handleSubmitComment}>
                <input type="text" placeholder="comment" className="border mt-3 border-violet-500 w-full bg-white text-violet-500 h-10 text-[20px] font-bold p-2 rounded-xl" value={comment} onChange={(e)=> setComment(e.target.value)}></input>
                </form>
            </div>
        </div>
        }
        <span className="ml-20 text-white text-[30px]">{username}</span>
        <span className="ml-10 text-white text-[20px]">{date}</span>
        <h1 className="text-violet-500 text-[40px] ml-20 font-bebas">{title}</h1>
        <div className="border border-violet-500 bg-violet-500 mr-10 ml-10 mt-5 rounded-2xl shadow-white shadow">
        <p className="text-white text-[25px] ml-10 mr-10 mt-5">{content}</p>
        </div>
        <div className="flex justify-end items-center mr-10 mt-2 gap-2 ">
        <button className="bg-violet-500 text-white cursor-pointer rounded-2xl" onClick={handleClick}  ><ThumbsUp fill={fillColor} className="size-10"/></button>
        <button className="bg-violet-500 text-white cursor-pointer w-25 text-[20px] h-10 rounded-2xl" onClick={()=>{setVisible(true)}}>Comment</button>
        </div>
        <h1 className="text-white text-[30px] ml-12">Comments :-</h1>
        {comments}
        </>
    )
}




























