import Link from 'next/link'
import Image from 'next/image'

import {
    ClerkProvider,
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton
  } from '@clerk/nextjs'

export default function Header({user}) {
  return (
    <div className="bg-shamrockgreen p-2 text-mintcream">
      <div className="flex flex-row items-center justify-between pb-5 ">

        <div className="flex items-center w-200">
          <Image  src="/vecteezy_cute-cartoon-boy-laughing-out-loudly-pointing_18792623.jpg" 
                  alt="logo"
                  priority={true}
                  width={75}
                  height={75}
                  className = "rounded-full"/>
          <div className="flex-col ">
            <h1 className="text-2xl">Playground_</h1>
            <h1 className="text-2xl">Taunts</h1>
          </div>
        </div>
        <div>
          <SignedOut>
            <SignInButton/>
          </SignedOut>
          <SignedIn >          
            {user && 
              <div className="flex flex-col items-center justify-center">        
                <UserButton />                
                <p className="mr-5 text-sm self-center text-center">{user.username}</p>

              </div>}
          </SignedIn>
        </div>
        
    </div>

        <ul className="flex flex-row justify-between align-center">    
            <li className="text-sm">
                <Link href="/">Home</Link>
            </li >
            {user && <>
            <li className="text-sm">
                <Link href="/allnames">All names</Link>
            </li>            
            <li className="text-sm">
                <Link href="/yournames">Your names</Link>
            </li>
            <li className="text-sm">
                <Link href="/addname">Add names</Link>
            </li></>}
        </ul>

    </div>
  )
}
