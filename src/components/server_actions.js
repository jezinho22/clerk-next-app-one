"use server";
import { sql } from "@vercel/postgres";
import {revalidatePath} from "next/cache";
import { redirect } from 'next/navigation';

export async function handleCommentSubmit (formData){
    console.log("handleCommentSubmit working")
    const newComment = await formData.get("comment")
    const userId = await formData.get("userId")
    const postId = await formData.get("postId")
    const parentId = await formData.get("parentId")
    console.log(`VALUES (${userId}, ${postId}, ${parentId})`)

    await sql `INSERT INTO comments 
    (author_id, post_id, comment, parent_id)
    VALUES (${userId}, ${postId}, ${newComment}, ${parentId ? parentId : null})`

    revalidatePath(`/allnames/${postId}`);
    redirect(`/allnames/${postId}`)
}


export async function testing (formData) {
    const newComment = await formData.get("comment")
    const userId = await formData.get("userId")
    const postId = await formData.get("postId")
    const parentId = await formData.get("parentId")
    console.log("comment: ", newComment)
    console.log("userId: ", userId)
    console.log("postId: ", postId)
    console.log("parentId: ", parentId)
}

// big database fetch for single name and your names
export async function getNamesAndComments (postId) {

        // console.log("POSTID: ", postId)

        const result = await sql `SELECT 
        child_names.first_name, 
        child_names.last_name, 
        child_names.id AS post_id,
        ARRAY_AGG(comments.id) FILTER (WHERE comments.id IS NOT NULL) AS comment_ids,
        ARRAY_AGG(comments.comment) FILTER (WHERE comments.comment IS NOT NULL) AS comments, 
        ARRAY_AGG(user_profile.username) FILTER (WHERE user_profile.username IS NOT NULL) AS authors,
        ARRAY_AGG(comments.parent_id) AS parent_ids
    
        FROM child_names LEFT JOIN comments 
        ON child_names.id = comments.post_id
        LEFT JOIN user_profile 
        ON user_profile.clerk_id = comments.author_id
        WHERE child_names.id = ${postId}
        GROUP BY child_names.id`
        const child_name = result.rows[0]
        // console.log("child_name: ", child_name)
    // lengthy mapping to process all the data into a neat object to send for rendering


        const comments =  child_name.comments == null ? [] : child_name.comments.map((comment, index) =>  {
            return ({comment: comment, 
                author: child_name.authors[index], 
                commentId: child_name.comment_ids[index],
                parentId: child_name.parent_ids[index],
                postId: child_name.post_id})
            })
        
        // console.log("comments: ", comments)
        // console.log(comments)
        const output = {first_name:child_name.first_name, 
                last_name:child_name.last_name,
                post_id:child_name.post_id,
                comments: comments
                }

        return output

}

