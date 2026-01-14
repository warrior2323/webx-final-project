import {useNavigate} from "react-router-dom"
export default function Blog(props){
const navigate=useNavigate()
const rawDate = props.date // Example from your DB

const formattedDate = new Date(rawDate).toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric'
});

    const handleClickTitle=async (e)=>{
    e.preventDefault()

    navigate(`/${localStorage.userId}/common/post/${props.id}`,{
        state:{
            title:props.title,
            content:`${props.content}`,
            username:props.username,
            date:props.formattedDate,
            post_id:props.id
        }
    });

}

    return(
        <>
        <div className="bg-gray-500 mb-5 ml-10 hover:scale-101 rounded-3xl pr-2 mt-5">
        <section className='flex justify-start items-center gap-5'>
            <h1 className='text-white ml-15 text-[20px]'>{props.username}</h1>
            <h3 className='text-white'>{formattedDate}</h3>
        </section>
        <div className='text-white text-[20px] ml-12 mt-5 mb-5'>
            <h1 className=' text-violet-950 text-[30px] font-sans cursor-pointer' onClick={handleClickTitle}>{props.title}</h1>
            <h2 className='text-black'>{props.descryption}</h2>
        </div>
        <hr className='border-violet-500 ml-12'/>
        </div>
        </>
    )
}