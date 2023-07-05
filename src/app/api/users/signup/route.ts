import { DbConnection } from "@/src/app/dbconfig/dbConfig";
import User from "@/src/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcyptjs from "bcryptjs";

DbConnection();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    console.log(reqBody);
    //! check if user exist
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    //! hash password

    const salt = await bcyptjs.genSalt(10);
    const hashedPwd = await bcyptjs.hash(password, salt);
    //! save user to db

    const newUser = new User({
      username,
      email,
      password: hashedPwd,
    });
    const savedUser = await newUser.save();
    console.log(savedUser);
    return NextResponse.json({
      message: "User Created Sucessfully",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
