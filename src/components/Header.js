import Link from 'next/link'

import {
    ClerkProvider,
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton
  } from '@clerk/nextjs'

export default function Header() {
  return (
    <>
    <h1>Playground_Taunts.com</h1>
        <SignedOut>
        <SignInButton />
        </SignedOut>
        <SignedIn>
        <UserButton />
        </SignedIn>
        <ul>    
            <li>
                <Link href="/">Home</Link>
            </li>
            <li>
                <Link href="/posts">View all posts</Link>
            </li>
            <li>
                <Link href="/addpost">Add a post</Link>
            </li>
        </ul>
    </>
  )
}
