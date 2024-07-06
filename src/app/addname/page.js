// no tailwind
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

    // console.log(user.id, first_name, last_name, comment)

    await sql `INSERT INTO child_names 
    (clerk_id, first_name, last_name, comment)
    VALUES (${user.id},${first_name}, ${last_name}, ${comment})`

    revalidatePath("/yournames");
    redirect("/yournames")
  }

  return (
    <div>
        <h2  className="text-lg p-5">You can add your prospective names here</h2>
        <form className="px-5 m-5 flex flex-col" action={handleSubmit}>
        <div className="py-2">
          <label htmlFor="firstName" className="p-5">First name</label>
          <input type='text' 
                  name='firstName' 
                  id='firstName' 
                  placeholder="First name"
                  className="bg-teagreen text-russianviolet rounded-sm px-2" />
        </div>
        <div className="py-2">
          <label htmlFor="lastName" className="p-5">Last name</label>
          <input type='text' 
                  name='lastName' 
                  id='lastName' 
                  defaultValue={user.lastName}
                  className="bg-teagreen text-russianviolet rounded-sm px-2"/>
        </div>
          {/* <label htmlFor="comment">Comment</label>
          <input type='text' name='comment' id='comment' placeholder="comment"/> */}

          <button type='submit' className="px-3 my-10 self-center bg-russianviolet text-mintcream rounded-md w-40">Submit</button>

        </form>
    </div>
  )
}
