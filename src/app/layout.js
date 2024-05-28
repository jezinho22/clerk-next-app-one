import {ClerkProvider} from '@clerk/nextjs'
import { auth, currentUser } from '@clerk/nextjs/server';
import { sql } from "@vercel/postgres";


import { Inter } from "next/font/google";
import "./globals.css";
import Header from '../components/Header';
import Footer from '../components/Footer';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Playground taunts",
  description: "Check the names you are choosing for your newborn",
};

export default async function RootLayout({ children }) {

  const user = await currentUser();
  if (user) {

    console.log(user.lastName)
    // need to account for the situation when nobody is logged in  - so no user

    const profiles = await sql `SELECT * FROM user_profile WHERE clerk_id = ${user.id}`;

    // if the user is logged in AND they don't have an entry in the profiles table, add it
    if (profiles.rowCount === 0 && user.id !== null) {

      // add them to our database
      await sql `INSERT INTO user_profile (username, first_name, last_name, clerk_id) 
                 VALUES (NULL, ${user.firstName}, ${user.lastName}, ${user.id})`
    }
    
    const hasUsername = profiles.rows[0]?.username !== null ? true : false;
  }  
  // has username will be true if we have a username and (shockingly) false if we don't

  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Header userId = {user ? user.id : null} />
          {children}
          <Footer/>
        </body>
      </html>
    </ClerkProvider>
  );
}