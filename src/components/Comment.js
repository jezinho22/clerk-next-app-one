"use client";
import { useState } from "react";
import CommentForm from "./CommentForm"


export default function Comment ({comment}) {
  // console.log("COMMENT: ", comment)

  //className="bg-glaucous text-mintcream border-russianviolet m-5 p-2"
  return (
        <li key={"comment_" + comment.commentId} className="bg-teagreen">

          <h4 className="bg-teagreen text-russianviolet my-2">{comment.comment}</h4>
          <p className="bg-shamrockgreen text-sm text-mintcream mb-3 w-auto">Posted by: {comment.author}</p>
          {/* <p>{comment.author} 👍 <span className="">3</span> 👎</p> */}

        </li>
  )
}
