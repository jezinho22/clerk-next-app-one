import Link from 'next/link'

import {
    ClerkProvider,
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton
  } from '@clerk/nextjs'

export default function Header({userId}) {
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
            {userId && <><li>
                <Link href="/allnames">View all names</Link>
            </li>            
            <li>
                <Link href="/yournames">View your names</Link>
            </li>
            <li>
                <Link href="/addname">Add names</Link>
            </li></>}
        </ul>
    </>
  )
}
