import { DbConnection } from "@/src/app/dbconfig/dbConfig";
import User from "@/src/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcyptjs from "bcryptjs";
import { toast } from "react-hot-toast";
import jwt from "jsonwebtoken";

DbConnection();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json(); //! data from frontend comes in request.json() like in react it comes in req.body()
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
    //! create token data
    const tokenData = {
      id: user._id,
      email: user.email,
      username: user.username,
    };
    // ! create token
    const token = await jwt.sign(tokenData, process.env.TOKEN_ENCRY!, {
      expiresIn: "1h",
    });
    const response = await NextResponse.json({
      message: "Login Successfull",
      success: true,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
    });
    return response;
  } catch (error: any) {
    toast.error(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
