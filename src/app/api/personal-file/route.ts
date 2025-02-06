import { NextResponse } from "next/server";

export const GET = () => {
  return new NextResponse("Hello, World!", {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
    },
  });
};

export const POST = () => {
  return NextResponse.json({ message: "creating a new user ..." });
};
