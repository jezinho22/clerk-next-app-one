import React, { useState } from 'react'


export default function Name({childname, userId, postId}) {

    return (
        <div>
            <h3>{childname.first_name} {childname.last_name}</h3>
            <h4>{username}</h4>
            <ul>
            {childname.comments.length > 0 &&  childname.comments.map((comment) => {
            return (
                <div>
                <CommentForm userId={userId} postId= {postId} parentId={comment.id}/>
                <Comment comment = {comment} userId={userId} postId= {postId}/>
                </div> 
            )})}
            </ul>
        </div>
    )
}
