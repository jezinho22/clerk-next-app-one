
import { sql } from "@vercel/postgres";
import { auth } from '@clerk/nextjs/server';
import Comment from '../../../components/Comment.js'
import CommentForm from '../../../components/CommentForm.js'
import {getNamesAndComments} from '../../../components/server_actions.js'

export default async function SingleName({params}) {

    const {userId} = auth();
    const postId = params.name
    console.log("yournames postId: ", params.name)

    const childnameResult = await getNamesAndComments("", postId, sql)
    const childname = childnameResult[0]

    const result = await sql `SELECT user_profile.username 
                          FROM child_names JOIN user_profile
                          ON child_names.clerk_id = user_profile.clerk_id
                          WHERE child_names.id=${postId}`
    const username = result.rows[0].username;

    // const data = await sql `SELECT child_names.first_name, child_names.last_name, child_names.comment, user_profile.username AS username 
    // FROM child_names 
    // JOIN user_profile 
    // ON child_names.clerk_id = user_profile.clerk_id
    // WHERE child_names.id = ${params.name}`
    // const childName = data.rows[0]
    // // console.log("childName: ", childName)

    // const comment_data = await sql `SELECT comments.comment, comments.id, user_profile.username AS username 
    // FROM comments
    // JOIN user_profile
    // ON comments.author_id = user_profile.clerk_id
    // WHERE comments.post_id = ${params.name}`
    // const comments = comment_data.rows
    // // console.log("comments: ", comments)    

    // comments has .comment, .id, 

  return (
    <div>
        <h3>{childname.first_name} {childname.last_name}</h3>
        <h4>{username}</h4>
        <ul>
        {childname.comments.length > 0 &&  childname.comments.map((comment) => {
          return (
            <div>
              <CommentForm userId={userId} postId= {comment.postId} parentId={comment.id}/>
              <Comment comment = {comment} userId={userId} postId= {postId}/>
            </div> 
          )})}
        </ul>
    </div>
  )
}
