// import { NextResponse } from "next/server";
// import { query } from "@/lib/mysql";

// export async function POST(req: Request) {
//   try {
//     const { institution } = await req.json(); // value from frontend

//     if (!institution) {
//       return NextResponse.json(
//         { error: "Institution not provided" },
//         { status: 400 }
//       );
//     }

//     // Query using ilr_config_details column
//     const tickets = await query(
//       "SELECT ticket_id, subject, status_id, created_at FROM tickets WHERE ilr_config_details = ? ORDER BY created_at DESC",
//       [institution]
//     );

//     return NextResponse.json({ success: true, tickets });
//   } catch (error) {
//     console.error("Tickets fetch error:", error);
//     return NextResponse.json(
//       { error: "Server error while fetching tickets" },
//       { status: 500 }
//     );
//   }
// }


import { NextResponse } from "next/server";
import { query } from "@/lib/mysql";

export async function POST(req: Request) {
  try {
    const { institution } = await req.json();

    if (!institution) {
      return NextResponse.json(
        { error: "Institution not provided" },
        { status: 400 }
      );
    }

    const tickets = await query(
      `SELECT ticket_id, subject,
              CASE 
                WHEN status_id = 1 THEN 'open'
                WHEN status_id = 2 THEN 'pending'
                WHEN status_id = 3 THEN 'closed'
                ELSE 'unknown'
              END AS status,
              created_at
       FROM tickets
       WHERE ilr_config_details = ?
       ORDER BY created_at DESC`,
      [institution]
    );

    return NextResponse.json({ success: true, tickets });
  } catch (error) {
    console.error("Tickets fetch error:", error);
    return NextResponse.json(
      { error: "Server error while fetching tickets" },
      { status: 500 }
    );
  }
}
