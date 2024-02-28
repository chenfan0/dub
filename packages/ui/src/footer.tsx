"use client";

import { ALL_TOOLS, COMPARE_PAGES } from "@dub/utils";
import va from "@vercel/analytics";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FEATURES_LIST } from "./content";
import { Github, LinkedIn, LogoType, Twitter, YouTube } from "./icons";
import { MaxWidthWrapper } from "./max-width-wrapper";
import Image from "next/image";

const navigation = {
  features: FEATURES_LIST.map(({ shortTitle, slug }) => ({
    name: shortTitle,
    href: `/${slug}`,
  })),
  product: [
    { name: "Blog", href: "/blog" },
    { name: "Changelog", href: "/changelog" },
    { name: "Customers", href: "/customers" },
    { name: "Pricing", href: "/pricing" },
    { name: "Enterprise", href: "/enterprise" },
    { name: "Help Center", href: "/help" },
  ],
  compare: COMPARE_PAGES.map(({ name, slug }) => ({
    name,
    href: `/compare/${slug}`,
  })),
  legal: [
    { name: "Privacy", href: "/privacy" },
    { name: "Terms", href: "/terms" },
    { name: "Abuse", href: "/abuse" },
  ],
  tools: ALL_TOOLS.map(({ name, slug }) => ({
    name,
    href: `/tools/${slug}`,
  })),
};

export function Footer() {
  const { domain = "dub.co" } = useParams() as { domain: string };

  const createHref = (href: string) =>
    domain === "dub.co" ? href : `https://dub.co${href}`;

  return (
    <footer>
      <MaxWidthWrapper className="relative z-10 overflow-hidden border border-b-0 border-gray-200 bg-white/50 pb-60 pt-16 backdrop-blur-lg md:rounded-t-2xl">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <Link
              href={createHref("/")}
              {...(domain !== "dub.co" && {
                onClick: () => {
                  va.track("Referred from custom domain", {
                    domain,
                    medium: `footer item (logo)`,
                  });
                },
              })}
            >
              <span className="sr-only">
                {process.env.NEXT_PUBLIC_APP_NAME} Logo
              </span>
              <LogoType className="h-7 text-gray-800" />
            </Link>
            <p className="max-w-xs text-sm text-gray-500">
              Giving modern marketing teams superpowers with short links that
              stand out.
            </p>
            <p className="text-sm leading-5 text-gray-400">
              © {new Date().getFullYear()} Dub Technologies, Inc.
            </p>
            <div className="flex items-center space-x-3">
              <a
                href="https://twitter.com/dubdotco"
                target="_blank"
                rel="noreferrer"
                className="group rounded-full border border-gray-200 p-2 transition-colors hover:bg-gray-100 active:bg-gray-200"
              >
                <span className="sr-only">Twitter</span>
                <Twitter className="h-4 w-4 text-gray-600" />
              </a>
              <a
                href="https://github.com/dubinc/dub"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-gray-200 p-2 transition-colors hover:bg-gray-100 active:bg-gray-200"
              >
                <span className="sr-only">Github</span>
                <Github className="h-4 w-4 text-gray-600" />
              </a>
              <a
                href="https://www.linkedin.com/company/dubinc"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-gray-200 p-2 transition-colors hover:bg-gray-100 active:bg-gray-200"
              >
                <span className="sr-only">LinkedIn</span>
                <LinkedIn className="h-4 w-4 text-gray-600" />
              </a>
              <a
                href="https://www.youtube.com/@dubdotco"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-gray-200 p-2 transition-colors hover:bg-gray-100 active:bg-gray-200"
              >
                <span className="sr-only">YouTube</span>
                <YouTube className="h-4 w-4 text-gray-600" />
              </a>
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-4 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2">
              <div>
                <h3 className="text-sm font-semibold text-gray-800">
                  Features
                </h3>
                <ul role="list" className="mt-4 space-y-4">
                  {navigation.features.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={createHref(item.href)}
                        {...(domain !== "dub.co" && {
                          onClick: () => {
                            va.track("Referred from custom domain", {
                              domain,
                              medium: `footer item (${item.name})`,
                            });
                          },
                        })}
                        className="text-sm text-gray-500 hover:text-gray-800"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-800">Product</h3>
                <ul role="list" className="mt-4 space-y-4">
                  {navigation.product.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={createHref(item.href)}
                        {...(domain !== "dub.co" && {
                          onClick: () => {
                            va.track("Referred from custom domain", {
                              domain,
                              medium: `footer item (${item.name})`,
                            });
                          },
                        })}
                        className="text-sm text-gray-500 hover:text-gray-800"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2">
              <div className="flex flex-col space-y-8">
                <div>
                  <h3 className="text-sm font-semibold text-gray-800">
                    Compare
                  </h3>
                  <ul role="list" className="mt-4 space-y-4">
                    {navigation.compare.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={createHref(item.href)}
                          {...(domain !== "dub.co" && {
                            onClick: () => {
                              va.track("Referred from custom domain", {
                                domain,
                                medium: `footer item (${item.name})`,
                              });
                            },
                          })}
                          className="text-sm text-gray-500 hover:text-gray-800"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-800">Legal</h3>
                  <ul role="list" className="mt-4 space-y-4">
                    {navigation.legal.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={createHref(item.href)}
                          {...(domain !== "dub.co" && {
                            onClick: () => {
                              va.track("Referred from custom domain", {
                                domain,
                                medium: `footer item (${item.name})`,
                              });
                            },
                          })}
                          className="text-sm text-gray-500 hover:text-gray-800"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-800">Tools</h3>
                <ul role="list" className="mt-4 space-y-4">
                  {navigation.tools.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={createHref(item.href)}
                        {...(domain !== "dub.co" && {
                          onClick: () => {
                            va.track("Referred from custom domain", {
                              domain,
                              medium: `footer item (${item.name})`,
                            });
                          },
                        })}
                        className="text-sm text-gray-500 hover:text-gray-800"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <Image
          src="https://d2vwwcvoksz7ty.cloudfront.net/footer.png"
          alt="Dub Technologies, Inc. Logo"
          width={1959}
          height={625}
          className="pointer-events-none absolute inset-x-0 bottom-0 z-0"
        />
      </MaxWidthWrapper>
    </footer>
  );
}
