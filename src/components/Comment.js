"use client"
import { useState } from "react"
import CommentForm from "./CommentForm"


export default function Comment ({comment, userId}) {
    const [showForm, setShowForm] = useState(false)

    // <div>{comment[1]}</div>
    // </li>
    // <div className = "bg-russianviolet text-mintcream p-2">{comment[0]}</div>

  return (
        <li key={"comment_" + comment.id} className="bg-glaucous text-mintcream border-russianviolet m-5 p-2">

        <div>{comment.comment}</div>
            <p>{comment.author} 👍 <span className="">3</span> 👎</p>
            <button onClick={()=>setShowForm(!showForm)}>Comment on this</button>

            {showForm && <CommentForm userId={userId} postId= {comment.postId}/>}

        </li>
  )
}
