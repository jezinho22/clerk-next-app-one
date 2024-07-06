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
      <button onClick={()=>setShowForm(!showForm)} className="text-mintcream bg-pakistangreen pl-2 pr-2 rounded-md hover:border-midnight">Add comment</button>
      {showForm && 
          <form action={handler} className="flex flex-col p-5">
            <label htmlFor="comment" className="text-russianviolet m-2">Comment</label>
            <input type='text' 
                    name='comment' 
                    id='comment' 
                    placeholder="comment" 
                    className="bg-teagreen text-russianviolet rounded-sm px-2"/>
            <input name="userId" value={userId} className="hidden"/>
            <input name="postId" value={postId}className="hidden"/>
            <input name="parentId" value={null} className="hidden"/>
            <button type='submit' className="bg-russianviolet text-mintcream rounded-md my-5">Submit</button>
          </form>
      }
    </div>
  )
}
