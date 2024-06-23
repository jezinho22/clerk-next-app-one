import { sql } from "@vercel/postgres";
import { auth } from '@clerk/nextjs/server';

import Comment from '../../components/Comment.js'

export default async function YourNames() {

  const {userId} = auth();

  const result = await sql `SELECT 
    child_names.first_name, 
    child_names.last_name, 
    child_names.id AS post_id,
    ARRAY_AGG(comments.id) FILTER (WHERE comments.id IS NOT NULL) AS comment_ids,
    ARRAY_AGG(comments.comment) FILTER (WHERE comments.comment IS NOT NULL) AS comments, 
    ARRAY_AGG(user_profile.username) FILTER (WHERE user_profile.username IS NOT NULL) AS authors,
    ARRAY_AGG(comments.parent_id) AS parent_ids

    FROM child_names LEFT JOIN comments 
    ON child_names.id = comments.post_id
    LEFT JOIN user_profile 
    ON user_profile.clerk_id = comments.author_id
    WHERE child_names.clerk_id = ${userId}
    GROUP BY child_names.id`
  const posts = result.rows

  // lengthy mapping to process all the data into a neat object to send for rendering
  const names = posts.map((child_name) => {

    const comments =  child_name.comments == null ? [] : child_name.comments.map((comment, index) =>  {
      return ({comment: comment, 
              author: child_name.authors[index], 
              commentId: child_name.comment_ids[index],
              parentId: child_name.parent_ids[index]}
            )})

    console.log(comments)
    const newObj = {first_name:child_name.first_name, 
                    last_name:child_name.last_name,
                    post_id:child_name.post_id,
                    comments: comments
                    }
    return newObj
    })

  return (
      
    <div>
      <h2>Review the comments on your name ideas here</h2>

      {names.map((name) => {
        return (
          <div key={"child" + name.id} className="bg-shamrockgreen">
          <h3>{name.first_name} {name.last_name}</h3>
          <h4>{name.username}</h4>
          <ul>
          {name.comments.map((comment) => {
            return (
              <Comment comment={comment} userId={userId}/>

              )})}
          </ul>
          
          </div>
        )})}
    </div>
  
  )
}