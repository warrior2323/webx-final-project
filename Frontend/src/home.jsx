import image from "./assets/padhaku.png"
import {useNavigate} from "react-router-dom"
export default function Home(){
    const navigate=useNavigate()
    return(
        <section className="text-white bg-black fixed top-0 left-0 w-full h-full">
        <div className="flex justify-between">
            <span className="cursor-pointer text-[50px] ml-10 mt-5 text-violet-500">Blogger</span>
            <button onClick={()=> navigate("/login")} className="cursor-pointer bg-black h-15 mt-10 mr-10 text-[30px] w-35  border-violet-500 border-4 rounded-4xl flex justify-center items-center shadow-[0_0_15px_#a855f7] px-[30] ">Login</button>
        </div>
        <section className="flex justify-around items-center">
            <div className="mt-30">
                <h1 className=" cursor-default font-sans font-bold tracking-tight text-[60px] ml-30">Publishing platform <br></br>for Professional <br></br>bloggers</h1>
                <h1 className="cursor-default text-[20px] text-violet-500 ml-30 mt-5">Create beautiful , indipendent online publication<br></br> by writing faster and better than you ever have <br></br>before</h1>
                <button onClick={()=> navigate("/signup")} className="cursor-pointer ml-30 mt-10 bg-violet-500 w-60 h-15 text-[30px] font-sans font-bold tracking-tight">Get Started!</button>

            </div>
            <img src={image} className="w-5/12"></img>
        </section>
        </section>

    )
}