import { useState } from "react"
import Comment from "./Comment"


export default function ChildComments({parentId, postId}) {
    const [showComments, setShowComments] = useState([])

    function handleShowComments (){
        // console.log("child comments is working")
        //call a server function that fetches the comments that match
        // render the button conditionally upon whether or not there are child comments
    }

  return (
        <div>
          <button onClick={()=>setShowComments(!showComments)}>Comment on this</button>
          {showComments && 
            <Comment userId={parentId} postId={postId}/>
          }
        </div>
  )
}
