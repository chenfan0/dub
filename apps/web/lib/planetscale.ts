import { DomainProps, ProjectProps } from "./types";
// import mysql from 'mysql2/promise'


import prisma from "@/lib/prisma";

export const pscale_config = {
  url: process.env.DATABASE_URL,
};

// export const conn = connect(pscale_config);

export const getProjectViaEdge = async (projectId: string) => {
  if (!process.env.DATABASE_URL) return null;

  const project = await prisma.project.findUnique({
    where: {
      id: projectId
    }
  });
  return project || null;
};

export const getDomainViaEdge = async (domain: string) => {
  if (!process.env.DATABASE_URL) return null;

  const domains = await prisma.domain.findMany({
    where: {
      slug: domain
    }
  });
  return domains && domains.length > 0
    ? (domains[0] as DomainProps)
    : null;
};

export const getLinkViaEdge = async (domain: string, key: string) => {
  if (!process.env.DATABASE_URL) return null;

  const links = await prisma.link.findMany({
    where: {
      domain,
      key: decodeURIComponent(key)
    }
  })

  return links  && links.length > 0
    ? (links[0] as unknown as {
        id: string;
        domain: string;
        key: string;
        url: string;
        proxy: number;
        title: string;
        description: string;
        image: string;
        rewrite: number;
        password: string | null;
        expiresAt: string | null;
        ios: string | null;
        android: string | null;
        geo: object | null;
        projectId: string;
        publicStats: number;
      })
    : null;
};

export async function getDomainOrLink({
  domain,
  key,
}: {
  domain: string;
  key?: string;
}) {
  if (!key || key === "_root") {
    const data = await getDomainViaEdge(domain);
    if (!data) return null;
    return {
      ...data,
      key: "_root",
      url: data?.target,
    };
  } else {
    return await getLinkViaEdge(domain, key);
  }
}
