import {revalidatePath} from "next/cache";
import { redirect } from 'next/navigation';
import { auth, currentUser } from '@clerk/nextjs/server';


import { sql } from "@vercel/postgres";

export default async function AddName() {

  const user = await currentUser();

    async function handleSubmit (formData){
      "use server";
      const first_name = formData.get("firstName")
      const last_name = formData.get("lastName")
      const comment = formData.get("comment")

      console.log(user.id, first_name, last_name, comment)

      await sql `INSERT INTO child_names 
      (clerk_id, first_name, last_name, comment)
      VALUES (${user.id},${first_name}, ${last_name}, ${comment})`

      revalidatePath("/yournames");
      redirect("/yournames")

  }

  return (
    <div>
        <h2>You can add your prospective names here</h2>
        <form className="formAddName" action={handleSubmit}>

          <label htmlFor="firstName">First name</label>
          <input type='text' name='firstName' id='firstName' placeholder="First name"/>

          <label htmlFor="lastName">Last name</label>
          <input type='text' name='lastName' id='lastName' defaultValue={user.lastName}/>

          <label htmlFor="comment">Comment</label>
          <input type='text' name='comment' id='comment' placeholder="comment"/>

          <button type='submit'>Submit</button>

        </form>
    </div>
  )
}
