import styles from "./page.module.css";
import { auth, currentUser } from "@clerk/nextjs/server";



export default async function Home() {
"use client";

const {userId } = auth()
let lastActive = "";
let timeActive = "";

const user = await currentUser()
if (user) {
  const date = new Date(user.lastActiveAt); // The 0 there is the key, which sets the date to the epoch
  lastActive = date.toDateString()
  timeActive = date.toLocaleTimeString()
}

  return (
    <>
    <h2>Here we are then, logging in hopefully!</h2>
    <p>And this is me: {userId}</p>
    {user && <>
      <img src={user.imageUrl} width={100} height={100}/>
      <p>{user.firstName}</p>
      <p>{user.lastName}</p>
      <p>{user.emailAddresses[0].emailAddress}</p>
      <p>Last active: {lastActive} at {timeActive}</p>
      </>
    }
    
    </>
  );
}
