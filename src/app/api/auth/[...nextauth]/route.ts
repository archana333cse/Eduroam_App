// import NextAuth, { type NextAuthOptions } from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import { query } from '@/lib/mysql'; // <-- New MySQL Query Function
// import * as bcrypt from 'bcryptjs'; 

// // Define the shape of the user object retrieved from the database
// interface DbUser {
//     id: string;
//     email: string;
//     password_hash: string;
//     // NOTE: MySQL can return NULL for this field, which is why we must handle it.
//     institution: string | null; 
//     name: string | null;
// }

// // The 'authOptions' is no longer exported, resolving the App Router conflict.
// const authOptions: NextAuthOptions = {
//     session: {
//         strategy: 'jwt', 
//         maxAge: 60 * 60 // 1 day in seconds
//     },

//     providers: [
//         CredentialsProvider({
//             name: 'Credentials',
//             credentials: {
//                 username: { label: 'Email', type: 'text' },
//                 password: { label: 'Password', type: 'password' },
//             },
//             async authorize(credentials) {
//                 console.log("Authorize: Starting credential check for:", credentials?.username);

//                 if (!credentials?.username || !credentials.password) {
//                     return null;
//                 }

//                 // 1. Find User in MySQL via raw SQL
//                 const users = await query<DbUser>(
//                     'SELECT id, email, password_hash, institution, name FROM users WHERE email = ?', 
//                     [credentials.username]
//                 );

//                 const user = users[0];

//                 if (!user) {
//                     console.log("Authorize: User not found.");
//                     return null; 
//                 }

//                 // 2. Compare Hashed Password
//                 const isPasswordValid = await bcrypt.compare(
//                     credentials.password,
//                     user.password_hash
//                 );

//                 if (!isPasswordValid) {
//                     console.log("Authorize: Invalid password.");
//                     return null; // Invalid password
//                 }

//                 console.log("Authorize: Success! User found with ID:", user.id);

//                 // 3. Successful authorization - return the user object (must contain id)
//                 // NOTE: We rely on the global User interface to implicitly define the return type
//                 return {
//                     id: user.id, 
//                     email: user.email,
//                     name: user.name,
//                     // institution is included here, even if it's null/string
//                     institution: user.institution, 
//                 };
//             },
//         }),
//     ],

//     // 4. Callbacks to pass custom user data (like 'institution') into the session
//     callbacks: {
//         async jwt({ token, user }) {
//             console.log("JWT Callback: Processing token...");
//             if (user) {
//                 // 'user' is the object returned by authorize()
//                 token.id = user.id; 

//                 // 🛑 CRITICAL FIX: Ensure 'user.institution' is not null before assigning 
//                 // it, or cast it carefully if the global type permits null/undefined.
//                 // Based on your global type, we ensure it's treated as string | undefined
//                 token.institution = (user.institution || undefined) as (string | undefined); 

//                 console.log(`JWT Callback: Assigned ID: ${token.id}, Institution: ${token.institution}`);
//             }
//             return token;
//         },
//         async session({ session, token }) {
//             // Ensure the properties are assigned correctly based on the JWT token
//             session.user.id = token.id as string;

//             // 🛑 CRITICAL FIX: Check if token.institution exists before casting
//             if (token.institution) {
//                  session.user.institution = token.institution;
//             } else {
//                  session.user.institution = undefined; // Explicitly set undefined if missing
//             }

//             console.log("Session Callback: Final session user:", session.user);
//             return session;
//         },
//     },
// };

// const handler = NextAuth(authOptions);

// // ✅ Final App Router exports
// export { handler as GET, handler as POST };




// import NextAuth, { type NextAuthOptions } from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import { query } from '@/lib/mysql'; // <-- New MySQL Query Function
// import * as bcrypt from 'bcryptjs';

// // --- CHANGE 1 ---
// // Update the DbUser interface to include 'role'
// interface DbUser {
//     id: string;
//     email: string;
//     password_hash: string;
//     institution: string | null;
//     name: string | null;
//     role: 'admin' | 'superAdmin'; // <-- ADDED
// }

// // The 'authOptions' is no longer exported, resolving the App Router conflict.
// const authOptions: NextAuthOptions = {
//     session: {
//         strategy: 'jwt',
//         maxAge: 60 * 60 // 1 hour in seconds (was 1 day, changed to 1 hour as per original code)
//     },

//     providers: [
//         CredentialsProvider({
//             name: 'Credentials',
//             credentials: {
//                 username: { label: 'Email', type: 'text' },
//                 password: { label: 'Password', type: 'password' },
//             },
//             async authorize(credentials) {
//                 console.log("Authorize: Starting credential check for:", credentials?.username);

//                 if (!credentials?.username || !credentials.password) {
//                     return null;
//                 }

//                 // --- CHANGE 2 ---
//                 // Update the SELECT query to fetch the 'role'
//                 const users = await query<DbUser>(
//                     'SELECT id, email, password_hash, institution, name, role FROM users WHERE email = ?',
//                     [credentials.username]
//                 );

//                 const user = users[0];

//                 if (!user) {
//                     console.log("Authorize: User not found.");
//                     return null;
//                 }

//                 // 2. Compare Hashed Password
//                 const isPasswordValid = await bcrypt.compare(
//                     credentials.password,
//                     user.password_hash
//                 );

//                 if (!isPasswordValid) {
//                     console.log("Authorize: Invalid password.");
//                     return null; // Invalid password
//                 }

//                 console.log("Authorize: Success! User found with ID:", user.id);

//                 // --- CHANGE 3 ---
//                 // Return the 'role' so it can be added to the token
//               _ return {
//                     id: user.id,
//                     email: user.email,
//                     name: user.name,
//                     institution: user.institution,
//                     role: user.role // <-- ADDED
//                 };
//             },
//         }),
//     ],

//     // 4. Callbacks to pass custom user data (like 'institution') into the session
//     callbacks: {
//         async jwt({ token, user }) {
//             console.log("JWT Callback: Processing token...");

//             // --- CHANGE 4 ---
//             // Add the 'role' from the user object to the JWT token
//             if (user) {
//                 // 'user' is the object returned by authorize()
//                 token.id = user.id;
//                 token.institution = (user.institution || undefined) as (string | undefined);
//                 token.role = user.role; // <-- ADDED

//                 console.log(`JWT Callback: Assigned ID: ${token.id}, Institution: ${token.institution}, Role: ${token.role}`); // <-- 'Role' added to log
//             }
//             return token;
//         },
//         async session({ session, token }) {
//             // Ensure the properties are assigned correctly based on the JWT token
//             session.user.id = token.id as string;

//             // --- CHANGE 5 ---
//             // Add the 'role' from the token to the session object
//             session.user.role = token.role as string; // <-- ADDED

//             if (token.institution) {
//                 session.user.institution = token.institution;
//                 t
//             } else {
//                 session.user.institution = undefined; // Explicitly set undefined if missing
//             }

//             console.log("Session Callback: Final session user:", session.user);
//             return session;
//         },
//     },
// };

// const handler = NextAuth(authOptions);

// // ✅ Final App Router exports
// export { handler as GET, handler as POST };


// import NextAuth, { type NextAuthOptions } from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import { query } from '@/lib/mysql'; 
// import * as bcrypt from 'bcryptjs';

// // --- CHANGE 1 ---
// // Update the DbUser interface to include 'role'
// interface DbUser {
//     id: string;
//     email: string;
//     password_hash: string;
//     institution: string | null;
//     name: string | null;
//     role: 'admin' | 'superAdmin'; // <-- ADDED
// }

// // The 'authOptions' is no longer exported, resolving the App Router conflict.
// const authOptions: NextAuthOptions = {
//     session: {
//         strategy: 'jwt',
//         maxAge: 60 * 60 // 1 hour in seconds
//     },

//     providers: [
//         CredentialsProvider({
//             name: 'Credentials',
//             credentials: {
//                 username: { label: 'Email', type: 'text' },
//                 password: { label: 'Password', type: 'password' },
//             },
//             async authorize(credentials) {
//                 console.log("Authorize: Starting credential check for:", credentials?.username);

//                 if (!credentials?.username || !credentials.password) {
//                     return null;
//                 }

//                 // --- CHANGE 2 ---
//                 // Update the SELECT query to fetch the 'role'
//                 const users = await query<DbUser>(
//                     'SELECT id, email, password_hash, institution, name, role FROM users WHERE email = ?',
//                     [credentials.username]
//                 );

//                 const user = users[0];

//                 if (!user) {
//                     console.log("Authorize: User not found.");
//                     return null;
//                 }

//                 // 2. Compare Hashed Password
//                 const isPasswordValid = await bcrypt.compare(
//                     credentials.password,
//                     user.password_hash
//                 );

//                 if (!isPasswordValid) {
//                     console.log("Authorize: Invalid password.");
//                     return null; // Invalid password
//                 }

//                 console.log("Authorize: Success! User found with ID:", user.id);

//                 // --- CHANGE 3 ---
//                 // Return the 'role' so it can be added to the token
//                 // 🛑 TYPO FIX: Removed stray '_' before 'return'
//                 return {
//                     id: user.id,
//                     email: user.email,
//                     name: user.name,
//                     institution: user.institution,
//                     role: user.role // <-- ADDED
//                 };
//             },
//         }),
//     ],

//     // 4. Callbacks to pass custom user data (like 'institution') into the session
//     callbacks: {
//         async jwt({ token, user }) {
//             console.log("JWT Callback: Processing token...");

//             // --- CHANGE 4 ---
//             // Add the 'role' from the user object to the JWT token
//             if (user) {
//                 // 'user' is the object returned by authorize()
//                 token.id = user.id;
//                 token.institution = (user.institution || undefined) as (string | undefined);
//                 token.role = user.role; // <-- ADDED

//                 console.log(`JWT Callback: Assigned ID: ${token.id}, Institution: ${token.institution}, Role: ${token.role}`); // <-- 'Role' added to log
//             }
//             return token;
//         },
//         async session({ session, token }) {
//             // Ensure the properties are assigned correctly based on the JWT token
//             session.user.id = token.id as string;

//             // --- CHANGE 5 ---
//             // Add the 'role' from the token to the session object
//             session.user.role = token.role as string; // <-- ADDED

//             if (token.institution) {
//                 session.user.institution = token.institution;
//                 // 🛑 TYPO FIX: Removed stray 't' from here
//             } else {
//                 session.user.institution = undefined; // Explicitly set undefined if missing
//             }

//             console.log("Session Callback: Final session user:", session.user);
//             return session;
//         },
//     },
// };

// const handler = NextAuth(authOptions);

// // ✅ Final App Router exports
// export { handler as GET, handler as POST };



// import NextAuth, { type NextAuthOptions } from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import { query } from '@/lib/mysql'; 
// import * as bcrypt from 'bcryptjs';
// import { authOptions } from "../authOptions";

// interface DbUser {
//     id: string;
//     email: string;
//     password_hash: string;
//     institution: string | null;
//     name: string | null;
//     role: 'admin' | 'superAdmin';
// }

// const authOptions: NextAuthOptions = {
//     session: {
//         strategy: 'jwt',
//         maxAge: 60 * 60 // 1 hour
//     },

//     providers: [
//         CredentialsProvider({
//             name: 'Credentials',
//             credentials: {
//                 username: { label: 'Email', type: 'text' },
//                 password: { label: 'Password', type: 'password' },
//                 role: { label: 'Role', type: 'text' } // <--- ADDED THIS
//             },
//             async authorize(credentials) {
//                 console.log("Authorize: Starting check for:", credentials?.username);

//                 if (!credentials?.username || !credentials?.password || !credentials?.role) {
//                     return null;
//                 }

//                 // 1. Fetch user from DB
//                 const users = await query<DbUser>(
//                     'SELECT id, email, password_hash, institution, name, role FROM users WHERE email = ?',
//                     [credentials.username]
//                 );

//                 const user = users[0];

//                 if (!user) {
//                     console.log("Authorize: User not found.");
//                     return null;
//                 }

//                 // 2. Verify Role Selection
//                 // We strictly check if the role selected in the Dropdown (credentials.role)
//                 // matches the role assigned in the Database (user.role)
//                 if (user.role !== credentials.role) {
//                     console.log(`Authorize: Role Mismatch. DB says '${user.role}', User selected '${credentials.role}'`);
//                     // Returning null causes a Generic Login Error on the frontend
//                     return null; 
//                 }

//                 // 3. Compare Hashed Password
//                 const isPasswordValid = await bcrypt.compare(
//                     credentials.password,
//                     user.password_hash
//                 );

//                 if (!isPasswordValid) {
//                     console.log("Authorize: Invalid password.");
//                     return null;
//                 }

//                 console.log("Authorize: Success! User verified with correct role:", user.role);

//                 return {
//                     id: user.id,
//                     email: user.email,
//                     name: user.name,
//                     institution: user.institution,
//                     role: user.role
//                 };
//             },
//         }),
//     ],

//     callbacks: {
//         async jwt({ token, user }) {
//             if (user) {
//                 token.id = user.id;
//                 token.institution = (user.institution || undefined) as (string | undefined);
//                 token.role = user.role; 
//             }
//             return token;
//         },
//         async session({ session, token }) {
//             session.user.id = token.id as string;
//             session.user.role = token.role as string;

//             if (token.institution) {
//                 session.user.institution = token.institution;
//             } else {
//                 session.user.institution = undefined;
//             }

//             return session;
//         },
//     },
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST, };


import NextAuth from "next-auth";
import { authOptions } from "../authOptions";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
