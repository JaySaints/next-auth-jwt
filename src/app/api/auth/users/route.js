import connectToDB from "@/infra/database";
import UserModel from "@/models/userModel";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  await connectToDB();

  const oldUser = await UserModel.findOne({ email: body.email });

  if (oldUser) {
    return NextResponse.json(
      { error: "Email is already in use" },
      { status: 422 }
    );
  }

  const user = await UserModel.create({ ...body });

  return NextResponse.json({
    user: {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
    },
  });
}
