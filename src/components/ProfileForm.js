import { sql } from "@vercel/postgres";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export default function ProfileForm() {
  const { userId } = auth();

  async function handleUpdateProfile(formData) {
    "use server";
    const username = formData.get("username");

    await sql
      `UPDATE user_profile SET username = ${username} WHERE clerk_id = ${userId}`
    ;
    revalidatePath("/");
  }

  return (
    <div>
      <h2>Update Profile</h2>
      <p>Welcome to Playground Taunts, please choose your username!</p>
      <form action={handleUpdateProfile}>
        <input type = 'text' name = 'username' placeholder = 'Make a username'></input>
        <button>Submit</button>
      </form>
    </div>
  );
}