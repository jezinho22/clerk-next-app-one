"use client";
import React from 'react'
import {handleDelete} from './server_actions'

export default function Delete ({postId}) {



  return (
    <div>
        <button onClick={()=>handleDelete(postId)} className="text-mintcream bg-russianviolet pl-2 pr-2 rounded-md hover:border-midnight">Delete</button>
    </div>
  )
}
