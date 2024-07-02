"use client";
import { useState } from "react";
import CommentForm from "./CommentForm"
import ChildComment from "./ChildComment" 


export default function Comment ({comment, userId, postId}) {
  console.log("COMMENT: ", comment)

  return (
        <li key={"comment_" + comment.commentId} className="bg-glaucous text-mintcream border-russianviolet m-5 p-2">

          <div>{comment.comment}</div>
              <p>{comment.author} 👍 <span className="">3</span> 👎</p>
          <CommentForm userId={userId} postId={postId} parentId={comment.commentId}/>
          <ChildComment parentId={comment.id} postId={postId}/>

        </li>
  )
}
