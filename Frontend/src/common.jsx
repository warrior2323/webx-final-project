import {Menu ,Bell,SquarePen} from 'lucide-react'
import {useState , useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import Blog from './props/blogs'
import default_img from "./assets/default.png"
import Blogs from "./props/follow.jsx"
const API_BASE_URL=import.meta.env.VITE_BACKEND_URL

export default function Common(){
    const navigate=useNavigate()
    const [blogs ,setBlogs]=useState([])
    const [users,setUsers]=useState([])
    const [isLoading ,setIsLoading]=useState(false)
    const token=localStorage.userToken

    useEffect(()=>{
        const fetchData=async ()=>{
            try{
                setIsLoading(true)
            const response =await fetch(`${API_BASE_URL}/read/allblogs`,{
                method:'GET',
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`BEARER ${token}`
                }
            })
            const data=await response.json()
            
            
            if(response.ok){
                setBlogs(data.map(value => <Blog key={value.id} title={value.title} descryption={value.summary} username={value.username} date={value.published_at} id={value.id} content={value.content}/>))
                console.log(data)
            }
            else{
                console.log("There is some error ")
            }
            }catch(err){
                console.log(err)
            }finally{
                setIsLoading(false)
            }
        }

        const fetchusers=async()=>{
            try{
            const response =await fetch(`${API_BASE_URL}/getusers/users`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                },
                body:JSON.stringify({
                    "username":`${localStorage.username}`
                })
            })
            const data =await response.json()

            if(response.ok){
                setUsers(data.map(value=><Blogs value={value}/>))
            }else{
                console.log("error")
            }
        }catch(err){
                console.log(err)
            }


        }       
        fetchData()
        fetchusers()
    },[])
    return(
        <>
        <nav className='md: flex justify-between items-center bg-violet-500 fixed w-full top-0 h-20 z-1000'>
            <button className=' ml-5 md:ml-25'><Menu size={36} className='md : text-black'/></button>
            <h1 className='text-[20px] md:text-[30px] font-sans font-bold'>Reader</h1>
            <div className='md: flex justify-center items-center gap-10 mr-25'>
                <button><Bell size={36} className='md: text-black'/></button>
                
                <label for="photo-upload" className="md:custom-file-upload">
                 <img src={default_img} className='h-5 md:h-10'></img>
                 </label>
                <input id="photo-upload" type="file" className='md: hidden'/>
                <button onClick={()=> navigate(`/${localStorage.userId}/write`)} className='md:cursor-pointer hover:scale-115 hover:text-white flex justify-center items-center gap-2 border-3 border-black w-25 h-10 rounded-xl'><SquarePen/>Write</button>
            </div>
        </nav>
        <section className='md: mt-20 flex justify-between items-between'>
            
            <section className='md: w-[70%] mt-10'>
                <div className='md: ml-12 flex justify-start items-center gap-10'>
                    <input type="text" placeholder='Search..' className=' md: border-3 border-violet-500 h-12 w-90 rounded-4xl pl-10 placeholder:text-white placeholder:text-[20px]'></input>
                    <h1 className="md: text-white text-[20px] font-sans font-bold">Hot Topics:                 
                    </h1>
                    <div className='md: flex justify-center items-center gap-5 text-violet-500 font-bold'>
                    <button className='md: bg-white w-30 h-10 rounded-4xl cursor-pointer'>UX</button>
                    <button className='md: bg-white w-30 h-10 rounded-4xl cursor-pointer'>Development</button>
                    <button className='md: bg-white w-30 h-10 rounded-4xl cursor-pointer'>Marketing</button>
                    <button className='md: bg-white w-30 h-10 rounded-4xl cursor-pointer'>Design</button>
                    </div>
                </div>
                <h1 className='md: text-white ml-12 mt-8 text-[25px] mb-5'>Articles</h1>
                <hr className='md: border-violet-500 ml-12'></hr>
                {isLoading ? (<h1 className='md: text-white text-[50px] mt-80 ml-200'>Loading Blogs...</h1>) : blogs}   
            </section>
            <aside className='sidebar w-[30%] border-l-white border-l-2 ml-4 flex flex-col items-center  '>
                <div>
                    <h1 className='text-white text-[25px]'>People You might be interested-</h1>
                    {users}
                </div>
            </aside>
            
        </section>
        </>
    )
}