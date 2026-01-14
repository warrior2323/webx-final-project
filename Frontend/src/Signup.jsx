import {useState} from "react"
import {useNavigate} from "react-router-dom"
import {ArrowLeft} from "lucide-react"
import bgVideo from './assets/background.mp4';
export default function Signup(){
    const [username , setUsername]=useState("")
    const [password,setPassword] =useState("")
    const [email,setEmail]=useState("")
    const navigate=useNavigate()

    const handleSubmit=async (e)=>{
        e.preventDefault()

        if(username==""|| password=="" || email==""){
            return alert("Please enter the details completely")
        }
        try{
            const response=await fetch("http://localhost:3000/api/signup",{
                method:'POST',
                header:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({email:email,username:username,password:password})
            })

            const data=await response.json()

            if(response.ok){
                if(data.accessToken){
                    localStorage.setItem('userToken',data.accessToken)
                    localStorage.setItem('userId',data.id)
                    localStorage.setItem('username',data.username)
                    alert("Signup Successfull")
                    navigate(`/${data.id}/common`)
                }else{
                    alert(data)
                }

            }else{
                alert(data)
            }


        }catch(error){
            console.log(error.message)
        }
    }
    

    return(
        <div className="fixed top-0 left-0 flex justify-center items-center z-1000  h-full w-full  ">
            {/* <video autoPlay loop muted playsInline className="absolute z-0 min-w-full min-h-full max-w-none object-cover">
                        <source src={bgVideo} type="video/mp4"/>
                        
                    </video>  */}
            <div className="text-white text-center flex-col items-center justify-center bg-black p-5 rounded-xl z-2000">
                <form className="flex-col items-center justify-center" onSubmit={handleSubmit}>
                    <div className="flex items-left">
                    <button onClick={()=> navigate("/")}>
                        <ArrowLeft className="h-5 w-5 text-violet-500 cursor-pointer"></ArrowLeft>
                    </button>
                    </div>
                    <h1 className="text-violet-500">Login</h1>
                    <input type="text"
                           placeholder="email"
                           value={email}
                           onChange={(e)=> setEmail(e.target.value)}
                           className="w-full h-8 mb-3 mt-2 rounded-xl border-violet-600 placeholder:text-white pl-2 border"></input>

                    <input type="text"
                           placeholder="username"
                           value={username}
                           onChange={(e)=> setUsername(e.target.value)}
                           className="w-full h-8 mb-3 mt-2 rounded-xl border-violet-600 placeholder:text-white pl-2 border"></input>
                    <input type="password"
                           placeholder="password"
                           value={password}
                           onChange={(e)=> setPassword(e.target.value)}
                           className="w-full h-8 mb-3 rounded-xl border-violet-600  placeholder:text-white pl-2 border"></input>
                    <button type="submit" className="bg-violet-600 w-full h-8 mb-3 text-white rounded-xl">Submit</button>
                </form>
            </div>
        </div>
    )
}
