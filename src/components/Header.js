import Link from 'next/link'
import Image from 'next/image'

import {
    ClerkProvider,
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton
  } from '@clerk/nextjs'

  import x from "../../public/vecteezy_cute-cartoon-boy-laughing-out-loudly-pointing_18792623.jpg"
export default function Header({user}) {
  return (
    <div className="bg-shamrockgreen p-2 text-mintcream">
      <Image  src="/vecteezy_cute-cartoon-boy-laughing-out-loudly-pointing_18792623.jpg" 
              alt="logo"
              width={100}
              height={100}
              className = "rounded-full"/>
    <h1 className="text-2xl">Playground_Taunts.com</h1>
        <SignedOut>
          <SignInButton />
        </SignedOut>
          <SignedIn >          
            {user && <div className="flex flex-row align-middle">        
                <UserButton />
                <p className="ml-5">{user.username}</p>
            </div>}
        </SignedIn>
        <ul className="flex flex-row justify-between">    
            <li >
                <Link href="/">Home</Link>
            </li>
            {user && <><li>
                <Link href="/allnames" className="hover:scale-25 p-1">View all names</Link>
            </li>            
            <li>
                <Link href="/yournames">View your names</Link>
            </li>
            <li>
                <Link href="/addname">Add names</Link>
            </li></>}
        </ul>

    </div>
  )
}
