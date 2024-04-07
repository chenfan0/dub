import { DomainProps, ProjectProps } from "./types";
import mysql from 'mysql2/promise'


import prisma from "@/lib/prisma";

export const pscale_config = {
  url: process.env.DATABASE_URL,
};

let conn!: mysql.Connection

export async function getConn() {
  if (conn) return conn
  conn = await mysql.createConnection(process.env.DATABASE_URL as string)
  return conn
}


export const getProjectViaEdge = async (projectId: string) => {
  if (!process.env.DATABASE_URL) return null;

  const conn = await getConn()
  const [rows] =
    (await conn.execute("SELECT * FROM Project WHERE id = ?", [projectId])) ||
    {};

  return rows && Array.isArray(rows) && rows.length > 0
    ? (rows[0] as ProjectProps)
    : null;
};

export const getDomainViaEdge = async (domain: string) => {
  if (!process.env.DATABASE_URL) return null;

  const conn = await getConn()
  const [rows] =
    (await conn.execute("SELECT * FROM Domain WHERE slug = ?", [domain])) || {};

  return rows && Array.isArray(rows) && rows.length > 0
    ? (rows[0] as DomainProps)
    : null;
};

export const getLinkViaEdge = async (domain: string, key: string) => {
  if (!process.env.DATABASE_URL) return null;

  const conn = await getConn()

  const [rows] =
    (await conn.execute(
      "SELECT * FROM Link WHERE domain = ? AND `key` = ?",
      [domain, decodeURIComponent(key)], // we need to make sure that the key is always decoded (cause that's how we store it in MySQL)
    )) || {};
  return rows && Array.isArray(rows) && rows.length > 0
    ? (rows[0] as {
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
