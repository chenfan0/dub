import { parse } from "@/lib/middleware/utils";
import { DUB_PROJECT_ID } from "@dub/utils";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
// import { conn } from "../planetscale";
import { UserProps } from "../types";
import prisma from "../prisma";

export default async function AdminMiddleware(req: NextRequest) {
  const { path } = parse(req);
  let isAdmin = false;

  const session = (await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  })) as {
    id?: string;
    email?: string;
    user?: UserProps;
  };


  let response 
  if (session?.user?.id) {
    response = await prisma.projectUsers.findMany({
      where: {
        userId: session?.user?.id,
      },
      select: {
        projectId: true,
      },
    })
    response = response[0] as { projectId: string } | undefined
  }
  if (response?.projectId === DUB_PROJECT_ID) {
    isAdmin = true;
  }

  if (path === "/login" && isAdmin) {
    return NextResponse.redirect(new URL("/", req.url));
  } else if (path !== "/login" && !isAdmin) {
    return NextResponse.redirect(new URL(`/login`, req.url));
  }

  return NextResponse.rewrite(
    new URL(`/admin.dub.co${path === "/" ? "" : path}`, req.url),
  );
}
