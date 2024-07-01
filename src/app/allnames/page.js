import { sql } from "@vercel/postgres";
import Link from 'next/link'

export const revalidate = 1
export default async function AllNames() {

  const result = await sql `SELECT child_names.first_name, child_names.last_name, child_names.id, child_names.comment, user_profile.username  
  FROM child_names JOIN user_profile ON child_names.clerk_id = user_profile.clerk_id`
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
