
import { sql } from "@vercel/postgres";
import { auth } from '@clerk/nextjs/server';
import Comment from '../../../components/Comment.js'
export default async function SingleName({params}) {

    const {userId} = auth();
    // console.log("userId: ", userId)
    // console.log("params.name: ", params.name)

    const data = await sql `SELECT child_names.first_name, child_names.last_name, child_names.comment, user_profile.username AS username 
    FROM child_names 
    JOIN user_profile 
    ON child_names.clerk_id = user_profile.clerk_id
    WHERE child_names.id = ${params.name}`
    const childName = data.rows[0]
    // console.log("childName: ", childName)

    const comment_data = await sql `SELECT comments.comment, comments.id, user_profile.username AS username 
    FROM comments
    JOIN user_profile
    ON comments.author_id = user_profile.clerk_id
    WHERE comments.post_id = ${params.name}`
    const comments = comment_data.rows
    // console.log("comments: ", comments)    

  return (
    <div>
        <h3>{childName.first_name} {childName.last_name}</h3>
        <h4>{childName.username}</h4>
        <p>{childName.comment}</p>
        <ul>
        {comments &&  comments.map((comment) => {
          return (
            <Comment comment = {comment} userId={userId} postId= {params.name}/>    
          )})}
        </ul>
    </div>
  )
}
