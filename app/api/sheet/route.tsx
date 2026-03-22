import React from "react";
import { google } from "googleapis";
import { Sheet } from "lucide-react";

export async function GET() {
  const google_auth = new google.auth.JWT({
    email: process.env.GOOGLE_SHEET_CLIENT_EMAIL,
    key: process.env.GOOGLE_SHEET_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });
  const shit = google.sheets({ version: "v4", auth: google_auth });
  const response = await shit.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_SPREADSHEET_ID,
    range: process.env.GOOGLE_SHEET_RANGE,
  });
  const data = response.data.values ?? [];

  return Response.json(data);
}
