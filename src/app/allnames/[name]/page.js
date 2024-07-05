// no tailwind
import { sql } from "@vercel/postgres";
import { auth } from '@clerk/nextjs/server';
import Comment from '../../../components/Comment.js'
import CommentForm from '../../../components/CommentForm.js'
import {getNamesAndComments} from '../../../components/server_actions.js'
import Delete from '../../../components/Delete.js'

export default async function SingleName({params}) {

    const {userId} = auth();
    const postId = params.name

    const childname = await getNamesAndComments(postId)
  
    // console.log("getnamesandcomments: ", childname)

    const result = await sql `SELECT user_profile.username 
                          FROM child_names JOIN user_profile
                          ON child_names.clerk_id = user_profile.clerk_id
                          WHERE child_names.id=${postId}`
    const username = result.rows[0].username;

  return (
    <div>
        <h3>{childname.first_name} {childname.last_name}</h3>
        <h4>{username}</h4>
        <Delete postId={postId}/>
        <CommentForm userId={userId} postId= {postId} parentId={null}/>
        <ul>
        {childname.comments.length > 0 &&  childname.comments.map((comment, index) => {
          return (
            <div key={"comment_" + index}>
              <Comment comment = {comment} userId={userId} postId= {postId}/>
            </div> 
          )})}
        </ul>
    </div>
  )
}
