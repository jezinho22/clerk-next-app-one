import { sql } from "@vercel/postgres";
import { auth } from '@clerk/nextjs/server';



export default async function SingleName({params}) {

    const {userId} = auth();
    console.log("userId: ", userId)
    console.log("params.name: ", params.name)

    const data = await sql `SELECT * FROM child_names WHERE id = ${params.name}`
    const childName = data.rows[0]

    async function handleSubmit (formData){
        "use server";
        const comment = formData.get("comment")
    
        await sql `INSERT INTO comments 
        (clerk_id, post_id, comment)
        VALUES (${userId}, ${params.name}, ${comment})`
  
        // revalidatePath(`/allnames/${params.name}`);
        // redirect(`/allnames/${params.name}`)
    }

  return (
    <div>
        <h3>{childName.first_name} {childName.last_name}</h3>
        <h4>Poster username</h4>
        <p>{childName.comment}</p>
        <div>Add comment</div>

        <form className="formAddName" action={handleSubmit}>

            <label htmlFor="comment">Comment</label>
            <input type='text' name='comment' id='comment' placeholder="comment"/>

            <button type='submit'>Submit</button>

        </form>
    </div>
  )
}
