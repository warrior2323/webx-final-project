import { useEditor, EditorContent } from '@tiptap/react'
import {useParams,useNavigate} from 'react-router-dom'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import pen from "./assets/pen_paper.png"
const API_BASE_URL=import.meta.env.VITE_BACKEND_URL
export default function Write(){
  const navigate=useNavigate()
  const {id} =useParams()
  const titleeditor = useEditor({
    extensions: [StarterKit,
    Placeholder.configure({
        placeholder:"Write here ! You can also include @mentions"
    })]
  })

  const bodyeditor = useEditor({
    extensions: [StarterKit,
        Placeholder.configure({
            placeholder:"Enter the title of your Blog!"
        })
    ],
  })

  const summaryeditor = useEditor({
    extensions: [StarterKit,
        Placeholder.configure({
            placeholder:"Please enter a summary of your blog which you want to be showed on the home page."
        })
    ],
  })
  const handleSubmit=async (e)=>{
    try{
          e.preventDefault()
    if(!titleeditor || !bodyeditor) return 
    
    if(titleeditor.isEmpty){
       alert("Please assign a title to your blog")
    }

    if(bodyeditor.isEmpty){
        alert("Please enter some data!")
    }

    const titleData=titleeditor.getText()
    const bodyData=bodyeditor.getText()
    const summaryData=bodyeditor.getText()
    

    const response =await fetch(`${API_BASE_URL}/owner/write`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({author_id:id,title:titleData,content:bodyData,summary:summaryData})
    })

    const data=await response.json()

    if(response.ok){
       alert(data)
       navigate(`/${id}/common`)
       
    }else{
      alert("There is some error!")
    }
    }catch(err){
      console.error(err)
    }

  }
  return ( <>
           <img src={pen} className="fixed left-0 top-0 -z-1000 h-full w-full"></img>
           <div className="flex flex-col justify-center items-center gap-10 ">
           <div className="title-wrapper w-[80%]">
           <EditorContent editor={bodyeditor} />
           </div>

           <div className="body-wrapper w-[80%] min-h-[700]">
           <EditorContent editor={titleeditor} />   
           </div>

           <div className='summary-wrapper w-[80%]'>
            <EditorContent editor={summaryeditor}/>
           </div>
           <div className='flex justify-end items-center w-[80%]'>
            <button onClick={handleSubmit} className="hover:scale-115 hover:bg-black hover:text-violet-500 bg-violet-500 text-white rounded-xl w-25 h-12 text-[25px] cursor-pointer">Create</button>
           </div>
           </div>
           </>
         )
}