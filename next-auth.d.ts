// import { DefaultSession, DefaultUser } from "next-auth";
// import { JWT } from "next-auth/jwt";

// // 1. Extend the JWT (JSON Web Token) type
// declare module "next-auth/jwt" {
//   interface JWT {
//     role?: string;
//     institution?: string;
//   }
// }

// // 2. Extend the Session user object type
// declare module "next-auth" {
//   interface Session {
//     user: {
//       id: string;
//       role: string;
//       institution: string;
//     } & DefaultSession["user"];
//   }
  
//   // 3. Extend the User object (used in the authorize function)
//   interface User extends DefaultUser {
//     role: string;
//     institution: string;
//   }
// }

// import { DefaultSession, DefaultUser } from "next-auth";
// import { JWT } from "next-auth/jwt";

// // 1. Define the full shape of the user object retrieved from the database
// interface DbUser {
//     id: string;
//     email: string;
//     password_hash: string; // Used only internally for comparison
//     institution: string | null; // CRITICAL: Must allow null to match MySQL
//     name: string | null;
// }

// // 2. Define the public shape of the User object (what authorize returns)
// // We use Omit<DbUser, 'password_hash'> to ensure password_hash is excluded 
// // from the public User object type.
// export type PublicUser = Omit<DbUser, 'password_hash'>;


// // 3. Extend the JWT (JSON Web Token) type
// declare module "next-auth/jwt" {
//     interface JWT {
//         id: string; // Ensure the ID is passed
//         institution?: string | null; // CRITICAL: Must allow null/undefined
//     }
// }

// // 4. Extend the Session user object type
// declare module "next-auth" {
//     // Extend the built-in Session type
//     interface Session extends DefaultSession {
//         user: {
//             id: string; // Ensure ID is visible in the session
//             institution?: string | null; // CRITICAL: Must allow null/undefined
//         } & DefaultSession["user"];
//     }
    
//     // 5. Extend the User object (the object returned from authorize)
//     // We now ensure the User object only conforms to the PublicUser type
//     // which includes the nullable properties, solving the type conflict.
//     interface User extends PublicUser {
//         id: string;
//         institution: string | null; // CRITICAL: Must allow null to match the database
//     }
// }


import { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

// 1. Define the full shape of the user object retrieved from the database
interface DbUser {
    id: string;
    email: string;
    password_hash: string; // Used only internally for comparison
    institution: string | null;
    name: string | null;
    role: 'admin' | 'superAdmin'; // <-- CHANGE 1: ADDED (Matches your DB)
}

// 2. Define the public shape of the User object (what authorize returns)
// This will now automatically include 'role' since it's in DbUser
export type PublicUser = Omit<DbUser, 'password_hash'>;


// 3. Extend the JWT (JSON Web Token) type
declare module "next-auth/jwt" {
    interface JWT {
        id: string; 
        institution?: string | null; 
        role: string; // <-- CHANGE 2: ADDED
    }
}

// 4. Extend the Session user object type
declare module "next-auth" {
    // Extend the built-in Session type
    interface Session extends DefaultSession {
        user: {
            id: string;
            institution?: string | null; 
            role: string; // <-- CHANGE 3: ADDED
        } & DefaultSession["user"];
    }
    
    // 5. Extend the User object (the object returned from authorize)
    interface User extends PublicUser {
        id: string;
        institution: string | null; 
        role: string; // <-- CHANGE 4: ADDED
    }
}