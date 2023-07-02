import { DbConnection } from "@/src/app/dbconfig/dbConfig";
import User from "@/src/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcyptjs from "bcryptjs";

DbConnection();

export async function POST(request: NextRequest) {
  try {
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
