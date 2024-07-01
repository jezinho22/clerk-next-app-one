"use client";
import CommentForm from "./CommentForm"


export default function Comment ({comment, userId, postId}) {   
  
  function handleShowComments (){
    console.log("show comments is working - userId: ", userId, " - postId: ", postId, " - commentId: ", comment.commentId)
  } 

  return (
        <li key={"comment_" + comment.commentId} className="bg-glaucous text-mintcream border-russianviolet m-5 p-2">

        <div>{comment.comment}</div>
            <p>{comment.author} 👍 <span className="">3</span> 👎</p>
        <CommentForm userId = {userId} postId={postId} parentId = {comment.commentId}/>
        <button onClick={handleShowComments}>Show comments</button>
        // get the comments that come under

        </li>
  )
}
