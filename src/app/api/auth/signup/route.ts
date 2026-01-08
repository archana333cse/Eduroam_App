// src/app/api/auth/signup/route.ts
// import { NextResponse } from "next/server";
// import { hash } from "bcryptjs";
// import clientPromise from "@/lib/mongodb"; // Import your MongoDB client

// export async function POST(request: Request) {
//   try {
//     const { username, password, institution } = await request.json();

//     if (!username || !password || !institution) {
//       return NextResponse.json(
//         { error: "All fields are required." },
//         { status: 400 }
//       );
//     }

//     const client = await clientPromise;
//     const db = client.db("eduroam_db"); // Must match the DB name in MONGO_URL
//     const usersCollection = db.collection("users");

//     // Normalize email to lowercase
//     const normalizedEmail = username.toLowerCase();

//     // Check 1: User existence
//     const existingUser = await usersCollection.findOne({ email: normalizedEmail });
//     if (existingUser) {
//       return NextResponse.json(
//         { error: "User already registered." },
//         { status: 409 }
//       );
//     }

//     // Check 2: Password hashing
//     const hashedPassword = await hash(password, 10);

//     // Action: Save new user
//     await usersCollection.insertOne({
//       email: normalizedEmail,
//       password: hashedPassword,
//       institution,
//       role: "student",
//       createdAt: new Date(),
//     });

//     return NextResponse.json(
//       { message: "Registration successful! Proceed to login." },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Signup API error:", error);
//     return NextResponse.json(
//       { error: "Internal server error during signup." },
//       { status: 500 }
//     );
//   }
// }



// app/api/auth/signup/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/mysql'; // <-- New MySQL Query Function
import * as bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto'; // To generate a unique ID (primary key)

export async function POST(req: NextRequest) {
    try {
        const { username, password, institution } = await req.json();

        if (!username || !password || !institution) {
            return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
        }
        
        // 1. Check if user already exists
        const existingUsers = await query<any>('SELECT email FROM users WHERE email = ?', [username]);

        if (existingUsers.length > 0) {
            return NextResponse.json({ error: 'User with this email already exists.' }, { status: 409 });
        }

        // 2. Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds
        const userId = randomUUID(); // Generate a unique ID (VARCHAR/string)

        // 3. Create user in MySQL via raw SQL
        await query(
            'INSERT INTO users (id, email, password_hash, institution) VALUES (?, ?, ?, ?)',
            [userId, username, hashedPassword, institution]
        );

        return NextResponse.json({ message: 'User registered successfully.' }, { status: 201 });

    } catch (error) {
        console.error('Signup Error:', error);
        return NextResponse.json({ error: 'An internal server error occurred.' }, { status: 500 });
    }
}