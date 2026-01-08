
import { NextRequest, NextResponse } from 'next/server';
import ExcelJS from 'exceljs';

export async function POST(req: NextRequest) {
  try {
    // Get the JSON data from the client, not the file
    const { accessData, fticksData, roamingData } = await req.json();

    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'Eduroam Dashboard';
    workbook.created = new Date();

    // --- Add Access Logs sheet ---
    const accessSheet = workbook.addWorksheet('AccessLogs');
    accessSheet.columns = [
      { header: 'Timestamp', key: 'Timestamp', width: 25 },
      { header: 'Event', key: 'Event', width: 20 },
      { header: 'Username', key: 'Username', width: 30 },
      { header: 'Source', key: 'Source', width: 20 },
      { header: 'Destination', key: 'Destination', width: 20 },
      { header: 'ServerIP', key: 'ServerIP', width: 20 },
    ];
    accessSheet.addRows(accessData);

    // --- Add F-TICKS Logs sheet ---
    const fticksSheet = workbook.addWorksheet('FTicksLogs');
    fticksSheet.columns = [
      { header: 'Timestamp', key: 'Timestamp', width: 25 },
      { header: 'REALM', key: 'REALM', width: 30 },
      { header: 'VISCOUNTRY', key: 'VISCOUNTRY', width: 15 },
      { header: 'VISINST', key: 'VISINST', width: 30 },
      { header: 'CSI', key: 'CSI', width: 30 },
      { header: 'RESULT', key: 'RESULT', width: 15 },
    ];
    fticksSheet.addRows(fticksData);
    
    // --- Add Enhanced Roaming sheet ---
    const roamingSheet = workbook.addWorksheet('EnhancedRoaming');
    // (Add all relevant columns)
    roamingSheet.columns = [
        { header: 'Timestamp', key: 'Timestamp', width: 25 },
        { header: 'Username', key: 'Username', width: 30 },
        { header: 'Event', key: 'Event', width: 20 },
        { header: 'RESULT', key: 'RESULT', width: 15 },
        { header: 'Home University', key: 'REALM', width: 30 },
        { header: 'Visiting University', key: 'VISINST', width: 30 },
        { header: 'Source', key: 'Source', width: 20 },
        { header: 'MAC', key: 'MAC', width: 20 },
        { header: 'Match Type', key: 'Access_Match_Type', width: 20 },
    ];
    roamingSheet.addRows(roamingData);


    // --- Send the file back ---
    const buffer = await workbook.xlsx.writeBuffer();
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': 'attachment; filename="Eduroam_Log_Analyzer.xlsx"',
      },
    });

  } catch (error: any) {
    console.error("Error in /api/export-excel:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}