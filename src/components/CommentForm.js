import { sql } from "@vercel/postgres";
import {handleCommentSubmit} from "./server_actions"
import {testing} from "./server_actions"


export default function CommentForm({userId, postId, comment, parentId}) {

  function handler (formData) {

    console.log("Form is working")

  }
  
    // revalidatePath(`/allnames/${params.name}`);
    // redirect(`/allnames/${params.name}`)
  
  // comment form needs author_id, post_id, comment, parent_id
  return (
    <div>

      <form action={testing}>
        <label htmlFor="comment">Comment</label>
        <input type='text' name='comment' id='comment' placeholder="comment" className="text-russianviolet"/>
        <button type='submit'>Submit</button>
      </form>

    </div>
  )
}
