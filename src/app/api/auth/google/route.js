import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req) {
  try {
    const { name, email } = await req.json();

    if (!email)
      return NextResponse.json({ success: false, error: "No email from Google" }, { status: 400 });

    await connectDB();

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ name, email, provider: "google" });
    }

    const token = jwt.sign(
      { userId: user._id, name: user.name, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return NextResponse.json({ success: true, token, user: { name: user.name, email: user.email } });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}