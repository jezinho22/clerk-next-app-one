"use server";

export async function handleCommentSubmit (formData){
    console.log("handleCommentSubmit working")
    // const comment = formData.get("comment")
    // console.log(`VALUES (${userId}, ${params.name}, ${comment})`)

    // await sql `INSERT INTO comments 
    // (author_id, post_id, comment)
    // VALUES (${userId}, ${params.name}, ${comment})`

    // revalidatePath(`/allnames/${params.name}`);
    // redirect(`/allnames/${params.name}`)
}

async function handleCommentSubmit2 (formData){

    console.log("userId: ", userId)
 
    const comment = formData.get("comment")
    console.log(`VALUES (${userId}, ${postId}, ${comment})`)
  
    await sql `INSERT INTO comments 
    (author_id, post_id, comment)
    VALUES (${userId}, ${postId}, ${comment})`
}

export async function testing () {
    console.log("Testing")
}