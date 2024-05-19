import { sql } from "@vercel/postgres";
import { auth } from '@clerk/nextjs/server';

export default async function YourNames() {

  const {userId} = auth();
  console.log("user id from yournames page: ", userId)

  // const result = await sql `SELECT child_names.first_name, child_names.last_name, child_names.comment, user_profile.username  
  // FROM child_names JOIN user_profile ON child_names.clerk_id = user_profile.clerk_id WHERE child_names.clerk_id = ${userId}`
  // const posts = result.rows
  // console.log(posts)

  return (
    <div>
      <h2>Review the comments on your name ideas here</h2>
      <h3>First Name and Last Name</h3>
      <h4>Poster username</h4>
      <p>Comment 1 and username and likes</p>
      <p>Comment 2 and username and likes</p>


    </div>
  )
}
