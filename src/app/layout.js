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

  // trying to work out how to get info from auth
const {userId} = auth()
console.log("user id from auth: ", userId)
const user = await currentUser();

// struggling a little with the query output
const profile = sql `SELECT * FROM user_profile WHERE clerk_id = ${userId}`
console.log(profile.rows)

// if (!profile) {
//   sql `INSERT INTO user_profile (first_name, last_name, clerk_id)`
// }

  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Header userId = {userId}/>
          {children}
          <Footer/>
        </body>
      </html>
    </ClerkProvider>
  );
}