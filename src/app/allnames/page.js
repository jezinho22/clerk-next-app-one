import { sql } from "@vercel/postgres";

export default async function AllNames() {

  const result = await sql `SELECT child_names.first_name, child_names.last_name, child_names.comment, user_profile.username  
  FROM child_names JOIN user_profile ON child_names.clerk_id = user_profile.clerk_id`
  const posts = result.rows

  return (
    <div>
      <h2>See all the names here and add your thoughts</h2>
      {posts && posts.map((child_name) => {
        return (
          <h4>{child_name.first_name} {child_name.last_name}</h4>
        )
      })}

    </div>
  )
}
