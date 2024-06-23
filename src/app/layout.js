import {ClerkProvider} from '@clerk/nextjs'
import { auth, currentUser } from '@clerk/nextjs/server';
import { sql } from "@vercel/postgres";

import { Inter } from "next/font/google";
import "./globals.css";
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProfileForm from '../components/ProfileForm'
import { Children } from 'react';


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Playground taunts",
  description: "Check the names you are choosing for your newborn",
};

export default async function RootLayout({ children }) {
  const user = await currentUser();

  if (user) {
    console.log('username: ',user.username)
    // need to account for the situation when nobody is logged in  - so no user
    const profiles = await sql `SELECT * FROM user_profile WHERE clerk_id = ${user.id}`;

    // if the user is logged in AND they don't have an entry in the profiles table, add it
    if (profiles.rowCount === 0 && user.id !== null) {
      console.log("Woah! No profile!")
      // add them to our database
      await sql `INSERT INTO user_profile (username, first_name, last_name, clerk_id) 
                 VALUES (${user.username}, ${user.firstName}, ${user.lastName}, ${user.id})`
    } else if (user.username == null) {
      await sql `UPDATE user_profile SET username = ${user.username} WHERE user_profile.clerk_id = ${user.id}`
    }
  }

  return (
    <ClerkProvider>
      <html lang="en">
        <body className="flex justify-center">
          <div className = "bg-mintcream max-w-3xl">
            <Header user = {user ? user : null} />
            {children}
            <Footer/>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}