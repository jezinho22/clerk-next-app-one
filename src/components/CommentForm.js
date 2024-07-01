"use client";
import { sql } from "@vercel/postgres";
import {handleCommentSubmit, testing} from "./server_actions"
import { useState } from "react";
import {revalidatePath} from "next/cache";
import { redirect } from 'next/navigation';

export default function CommentForm({userId, postId, parentId}) {
  const [showForm, setShowForm] = useState(false)
  
function handler (formData) {
    console.log("Huh ", userId, postId, parentId)
    console.log("parentId: ", parentId)
    handleCommentSubmit(formData)
    setShowForm(false)
    revalidatePath(`/allnames/${postId}`);
    redirect(`/allnames/${postId}`)
  }
  

  
  // comment form needs author_id, post_id, comment, parent_id
  // need to pass data along with formData but cannot do this to a handler
  return (
    <div>
      <button onClick={()=>setShowForm(!showForm)}>Comment on this</button>
      {showForm && 
          <form action={handler}>
            <label htmlFor="comment">Comment</label>
            <input type='text' name='comment' id='comment' placeholder="comment" className="text-russianviolet"/>
            <input name="userId" value={userId} className="invisible"/>
            <input name="postId" value={postId}className="invisible"/>
            <input name="parentId" value={null} className="invisible"/>
            <button type='submit'>Submit</button>
          </form>
      }
    </div>
  )
}
