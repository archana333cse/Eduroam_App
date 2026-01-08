// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../[...nextauth]/route"; 

// export async function GET() {
//   try {
//     const session = await getServerSession(authOptions);

//     if (!session || !session.user) {
//       return NextResponse.json(
//         { error: "Not authenticated" },
//         { status: 401 }
//       );
//     }

//     return NextResponse.json({
//       success: true,
//       user: {
//         id: session.user.id,
//         email: session.user.email,
//         name: session.user.name,
//         role: session.user.role,
//         institution: session.user.institution,
//       },
//       token: session, // OR return token from JWT if needed
//     });
//   } catch (err) {
//     console.error("ME route error:", err);
//     return NextResponse.json(
//       { error: "Server error" },
//       { status: 500 }
//     );
//   }
// }


import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../authOptions";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        role: session.user.role,
        institution: session.user.institution,
      },
      token: session, // If needed you can return actual JWT later
    });
  } catch (error) {
    console.error("ME route error:", error);

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
