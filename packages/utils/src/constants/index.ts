export * from "./cctlds";
export * from "./countries";
export * from "./domains";
export * from "./framer-motion";
export * from "./layout";
export * from "./localhost";
export * from "./middleware";
export * from "./misc";
export * from "./pricing";
export * from "./saml";

export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Dub.co";

export const SHORT_DOMAIN =
  process.env.NEXT_PUBLIC_APP_SHORT_DOMAIN || "xmd.im";

export const HOME_DOMAIN = `https://${process.env.NEXT_PUBLIC_APP_DOMAIN}`;

export const APP_HOSTNAMES = new Set([
  `${process.env.NEXT_PUBLIC_APP_DOMAIN}`,
  `preview.${process.env.NEXT_PUBLIC_APP_DOMAIN}`,
  "localhost:8888",
  "localhost",
]);

export const APP_DOMAIN =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
    ? `https://${process.env.NEXT_PUBLIC_APP_DOMAIN}`
    : process.env.NEXT_PUBLIC_VERCEL_ENV === "preview"
      ? `https://preview.${process.env.NEXT_PUBLIC_APP_DOMAIN}`
      : "http://localhost:8888";

export const APP_DOMAIN_WITH_NGROK =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
    ? `https://${process.env.NEXT_PUBLIC_APP_DOMAIN}`
    : process.env.NEXT_PUBLIC_VERCEL_ENV === "preview"
      ? `https://preview.${process.env.NEXT_PUBLIC_APP_DOMAIN}`
      : process.env.NGROK_URL || "http://localhost:8888";

export const API_HOSTNAMES = new Set([
  `api.${process.env.NEXT_PUBLIC_APP_DOMAIN}`,
  `api.${SHORT_DOMAIN}`,
  "api.localhost:8888",
]);

export const API_DOMAIN =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
    ? `https://api.${process.env.NEXT_PUBLIC_APP_DOMAIN}`
    : process.env.NEXT_PUBLIC_VERCEL_ENV === "preview"
      ? `https://api.${process.env.NEXT_PUBLIC_APP_DOMAIN}`
      : "http://api.localhost:8888";

export const ADMIN_HOSTNAMES = new Set([
  `admin.${process.env.NEXT_PUBLIC_APP_DOMAIN}`,
  "admin.localhost:8888",
]);

export const DUB_LOGO = "https://d2vwwcvoksz7ty.cloudfront.net/logo.png";
export const DUB_THUMBNAIL =
  "https://d2vwwcvoksz7ty.cloudfront.net/thumbnail.png";

export const DEMO_LINK_ID = "clqo10sum0006js08vutzfxt3";
export const DUB_PROJECT_ID = "cl7pj5kq4006835rbjlt2ofka";
export const LEGAL_PROJECT_ID = "clrflia0j0000vs7sqfhz9c7q";
export const LEGAL_USER_ID = "clqei1lgc0000vsnzi01pbf47";

export const DUB_DOMAINS = [
  {
    id: "clce1z7ch00j0rbstbjufva4j",
    slug: 'xmd.im',
    verified: true,
    primary: true,
    archived: false,
    publicStats: false,
    target: `https://${process.env.NEXT_PUBLIC_APP_DOMAIN}`,
    type: "redirect",
    placeholder: "https://dub.co/help/article/what-is-dub1",
    clicks: 0,
    allowedHostnames: [],
    projectId: DUB_PROJECT_ID,
  },
  {
    id: "clce1z7ch00j0rbstbjufva4v",
    slug: 'spmd.io',
    verified: true,
    primary: false,
    archived: false,
    publicStats: false,
    target: `https://${process.env.NEXT_PUBLIC_APP_DOMAIN}`,
    type: "redirect",
    placeholder: "https://dub.co/help/article/what-is-dub",
    clicks: 0,
    allowedHostnames: [],
    projectId: DUB_PROJECT_ID,
  },
  ...(process.env.NEXT_PUBLIC_IS_DUB
    ? [
        {
          id: "clce1z7cs00y8rbstk4xtnj0k",
          slug: "chatg.pt",
          verified: true,
          primary: false,
          archived: false,
          publicStats: false,
          target: "https://dub.co/tools/chatgpt-link-shortener",
          type: "redirect",
          placeholder: "https://chat.openai.com/g/g-UGjKKONEe-domainsgpt",
          clicks: 0,
          allowedHostnames: ["chat.openai.com"],
          projectId: DUB_PROJECT_ID,
        },
        {
          id: "cloxw8qtk000bjt08n9b812vs",
          slug: "amzn.id",
          verified: true,
          primary: false,
          archived: false,
          publicStats: false,
          target: "https://dub.co/tools/amazon-link-shortener",
          type: "redirect",
          placeholder: "https://www.amazon.com/dp/B0BW4SWNC8",
          clicks: 0,
          allowedHostnames: [
            "amazon.com",
            "amazon.co.uk",
            "amazon.ca",
            "amazon.es",
          ],
          projectId: DUB_PROJECT_ID,
        },
        {
          id: "cloxw8y2u0003js08a7mqg1j8",
          slug: "spti.fi",
          verified: true,
          primary: false,
          archived: false,
          publicStats: false,
          target: "https://dub.co/tools/spotify-link-shortener",
          type: "redirect",
          placeholder: "https://open.spotify.com/album/1SCyi9a5pOasikidToUY5y",
          clicks: 0,
          allowedHostnames: ["open.spotify.com"],
          projectId: DUB_PROJECT_ID,
        },
      ]
    : []),
];

export const DEFAULT_XMIND_DOMAINS = DUB_DOMAINS.map(d => d.slug);
