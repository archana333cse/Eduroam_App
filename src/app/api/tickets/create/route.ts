import { NextResponse } from "next/server";
import { query } from "@/lib/mysql";

// Generate Ticket ID: EDR-2025-00001
async function generateTicketID() {
    const year = new Date().getFullYear();

    const rows = await query<any>(
        "SELECT COUNT(*) AS count FROM tickets WHERE YEAR(created_at) = ?",
        [year]
    );

    const nextNumber = rows[0].count + 1;
    const padded = String(nextNumber).padStart(5, "0");

    return `EDR-${year}-${padded}`;
}

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const {
            subject,
            submitter_email,
            user_id,
            description,
            ilr_config_details,
            device_os,
        } = body;

        if (!subject || !submitter_email || !description) {
            return NextResponse.json(
                { error: "Required fields missing." },
                { status: 400 }
            );
        }

        // Generate new ticket ID
        const ticket_id = await generateTicketID();

        await query(
            `INSERT INTO tickets 
                (ticket_id, user_id, submitter_email, subject, description, ilr_config_details, device_os) 
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                ticket_id,
                user_id || null,
                submitter_email,
                subject,
                description,
                ilr_config_details || null,
                device_os || null
            ]
        );

        return NextResponse.json({
            message: "Ticket created successfully",
            ticket_id: ticket_id
        });
    } catch (error) {
        console.error("Create Ticket Error:", error);
        return NextResponse.json(
            { error: "Ticket creation failed" },
            { status: 500 }
        );
    }
}
