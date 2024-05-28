import { sql } from "@vercel/postgres";
import { auth } from '@clerk/nextjs/server';

export default async function YourNames({params}) {

  console.log(params, "the params")
  const {userId} = auth();
  console.log("user id from yournames page: ", userId)

  const result = await sql `SELECT child_names.id, child_names.first_name, child_names.last_name, child_names.comment, user_profile.username  
  FROM child_names JOIN user_profile ON child_names.clerk_id = user_profile.clerk_id WHERE child_names.clerk_id = ${userId}`
  const posts = result.rows

  return (
      
    <div>
      <h2>Review the comments on your name ideas here</h2>
      {posts.map((childName) => {
        return (
          <div key={"child" + childName.id}>
          <h3>{childName.first_name} {childName.last_name}</h3>
          <h4>Poster username</h4>
          <p>{childName.comment}</p>
          <p>More comments</p>
          </div>
      )})}
      
    </div>
  )
}