import { DbConnection } from "@/src/app/dbconfig/dbConfig";
import User from "@/src/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcyptjs from "bcryptjs";

DbConnection();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    //! check user exist or not
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "User does not exist in DB" },
        { status: 400 }
      );
    }
    //! match password
    const verifyPwd = await bcyptjs.compare(password, user.password);
    if (!verifyPwd) {
      return NextResponse.json(
        { message: "ID and password does not match" },
        { status: 400 }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
