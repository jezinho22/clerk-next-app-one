"use client";
import { useState } from "react";
import CommentForm from "./CommentForm"

export default function Comment ({comment}) {
  console.log("COMMENT: ", comment)

  return (
        <li key={"comment_" + comment.commentId} className="bg-glaucous text-mintcream border-russianviolet m-5 p-2">

          <div>{comment.comment}</div>
          <p>{comment.author} 👍 <span className="">3</span> 👎</p>

        </li>
  )
}
