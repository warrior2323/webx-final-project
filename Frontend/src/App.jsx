import {createBrowserRouter , RouterProvider} from "react-router-dom"
import Login from "./Login"
import Signup from "./Signup"
import Home from "./home"
import Common from "./common"
import Write from "./write"
import Post from "./post"
export default function App(){
    const router=createBrowserRouter([
        {
            path:"/login",
            element:<Login/>
        },
        {
            path:"/signup",
            element:<Signup/>
        },
        {
            path:"/",
            element:<Home/>,

        },
        {
            path:"/:id/common",
            element:<Common/>,

        },
        {
            path:"/:id/common/post/:postId",
            element:<Post/>

        },
        {
            path:"/:id/write",
            element:<Write/>
        },
    ])

    return(
        <RouterProvider router={router}></RouterProvider>
    )
}