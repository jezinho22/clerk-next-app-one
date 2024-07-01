import { sql } from "@vercel/postgres";
import { auth } from '@clerk/nextjs/server';
import { getNamesAndComments} from '../../components/server_actions';
import Link from 'next/link'

import Comment from '../../components/Comment.js'

export default async function YourNames() {

  const {userId} = auth();

  const data = await getNamesAndComments("user_2hsmwJjMKkKQdT9NiSXVm8DR1gu", "", sql)

    // comment object has comment, commentId, author, parentId and postId
      
  const result = await sql `SELECT child_names.first_name, child_names.last_name, child_names.id, child_names.comment, user_profile.username  
                            FROM child_names JOIN user_profile 
                            ON child_names.clerk_id = user_profile.clerk_id
                            WHERE user_profile.clerk_id = ${userId}`
  const posts = result.rows
  
    return (
      <div>
        <h2>See all the names here and add your thoughts</h2>
        {posts && posts.map((child_name) => {
          return (
            <Link href={`/allnames/${child_name.id}`} key={"child_" + child_name.id}>
               <h4 >{child_name.first_name} {child_name.last_name}</h4>
            </Link>
          )
        })}  
      </div>
  )
}