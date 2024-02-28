import { INTERVALS } from "@/lib/analytics";
import useDomains from "@/lib/swr/use-domains";
import useProject from "@/lib/swr/use-project";
import { DomainProps } from "@/lib/types";
import {
  Badge,
  BlurImage,
  Copy,
  ExpandingArrow,
  IconMenu,
  Popover,
  Switch,
  Tick,
  Tooltip,
  TooltipContent,
  useOptimisticUpdate,
  useRouterStuff,
  useScroll,
} from "@dub/ui";
import {
  APP_DOMAIN,
  DUB_LOGO,
  GOOGLE_FAVICON_URL,
  SHORT_DOMAIN,
  cn,
  getApexDomain,
  linkConstructor,
} from "@dub/utils";
import { Calendar, ChevronDown, Lock, Share2 } from "lucide-react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import punycode from "punycode/";
import { useContext, useMemo, useState } from "react";
import { toast } from "sonner";
import { AnalyticsContext } from ".";

export default function Toggle() {
  const { slug } = useParams() as { slug?: string };
  const { queryParams } = useRouterStuff();

  const { basePath, domain, key, url, interval } = useContext(AnalyticsContext);

  const [openDatePopover, setOpenDatePopover] = useState(false);

  const selectedInterval = useMemo(() => {
    return INTERVALS.find((s) => s.value === interval) || INTERVALS[1];
  }, [interval]);

  const scrolled = useScroll(80);
  const { name, plan, logo } = useProject();
  const { allDomains, primaryDomain } = useDomains();

  const isPublicStatsPage = basePath.startsWith("/stats");

  return (
    <div
      className={cn("sticky top-[6.85rem] z-10 mb-5 bg-gray-50 py-3 md:py-5", {
        "top-14": isPublicStatsPage,
        "shadow-md": scrolled,
      })}
    >
      <div className="mx-auto flex h-20 max-w-4xl flex-col items-center justify-between space-y-3 px-2.5 md:h-10 md:flex-row md:space-y-0 lg:px-0">
        {isPublicStatsPage ? (
          <a
            className="group flex items-center text-lg font-semibold text-gray-800"
            href={linkConstructor({ domain, key })}
            target="_blank"
            rel="noreferrer"
          >
            <BlurImage
              alt={url || "Dub.co"}
              src={
                url ? `${GOOGLE_FAVICON_URL}${getApexDomain(url)}` : DUB_LOGO
              }
              className="mr-2 h-6 w-6 flex-shrink-0 overflow-hidden rounded-full"
              width={48}
              height={48}
            />
            {linkConstructor({
              domain: punycode.toUnicode(domain),
              key,
              pretty: true,
            })}
            <ExpandingArrow className="h-5 w-5" />
          </a>
        ) : (
          <div className="flex items-center space-x-2">
            <BlurImage
              alt={name || "Project Logo"}
              src={logo || DUB_LOGO}
              className="h-6 w-6 flex-shrink-0 overflow-hidden rounded-full"
              width={48}
              height={48}
            />
            <h2 className="text-lg font-semibold text-gray-800">
              {primaryDomain}
            </h2>
            {allDomains && allDomains.length > 1 && (
              <Tooltip
                content={<DomainsFilterTooltip domains={allDomains} />}
                side="bottom"
              >
                <div className="flex cursor-pointer items-center">
                  <Badge
                    variant="gray"
                    className="border-gray-300 transition-all hover:bg-gray-200"
                  >
                    +{allDomains.length - 1}
                  </Badge>
                </div>
              </Tooltip>
            )}
          </div>
        )}
        <div className="flex items-center">
          {!isPublicStatsPage && key && <SharePopover />}
          <Popover
            content={
              <div className="grid w-full p-2 md:w-48">
                {INTERVALS.map(({ display, value }) =>
                  (value === "all" || value === "90d") &&
                  (!plan || plan === "free") ? (
                    <Tooltip
                      key={value}
                      content={
                        <TooltipContent
                          title={
                            slug
                              ? `${display} stats can only be viewed on a Pro plan or higher. Upgrade now to view all-time stats.`
                              : `${display} stats can only be viewed on a project with a Pro plan or higher. Create a project or navigate to an existing project to upgrade.`
                          }
                          cta="Upgrade to Pro"
                          {...(isPublicStatsPage
                            ? {
                                href: APP_DOMAIN,
                              }
                            : {
                                onClick: () => {
                                  setOpenDatePopover(false);
                                  queryParams({
                                    set: {
                                      upgrade:
                                        plan === "free" ? "pro" : "business",
                                    },
                                  });
                                },
                              })}
                        />
                      }
                    >
                      <div className="flex w-full cursor-not-allowed items-center justify-between space-x-2 rounded-md p-2 text-sm text-gray-400">
                        <p>{display}</p>
                        <Lock className="h-4 w-4" aria-hidden="true" />
                      </div>
                    </Tooltip>
                  ) : (
                    <Link
                      key={value}
                      href={
                        queryParams({
                          set: { interval: value },
                          getNewPath: true,
                        }) as string
                      }
                      className="flex w-full items-center justify-between space-x-2 rounded-md p-2 hover:bg-gray-100 active:bg-gray-200"
                    >
                      <p className="text-sm">{display}</p>
                      {selectedInterval.value === value && (
                        <Tick className="h-4 w-4" aria-hidden="true" />
                      )}
                    </Link>
                  ),
                )}
              </div>
            }
            openPopover={openDatePopover}
            setOpenPopover={setOpenDatePopover}
          >
            <button
              onClick={() => setOpenDatePopover(!openDatePopover)}
              className="flex w-full items-center justify-between space-x-2 rounded-md bg-white px-3 py-2.5 shadow transition-all hover:shadow-md md:w-48"
            >
              <IconMenu
                text={selectedInterval.display}
                icon={<Calendar className="h-4 w-4" />}
              />
              <ChevronDown
                className={`h-5 w-5 text-gray-400 ${
                  openDatePopover ? "rotate-180 transform" : ""
                } transition-all duration-75`}
              />
            </button>
          </Popover>
        </div>
      </div>
    </div>
  );
}

const DomainsFilterTooltip = ({ domains }: { domains: DomainProps[] }) => {
  const searchParams = useSearchParams();
  const domain = searchParams?.get("domain");
  const key = searchParams?.get("key");
  const { queryParams } = useRouterStuff();
  return (
    <div className="flex w-full flex-col items-start space-y-2 divide-y divide-gray-200 p-2 md:w-48">
      <div className="flex w-full flex-col">
        {domains.map(({ slug, target }) => (
          <Link
            key={slug}
            href={
              queryParams({
                set: {
                  domain: slug,
                },
                del: "key",
                getNewPath: true,
              }) as string
            }
            className="group flex items-center justify-between space-x-2 rounded-md p-2 text-gray-500 transition-all hover:bg-gray-100 active:bg-gray-200"
          >
            <div className="flex items-center space-x-2">
              <BlurImage
                src={`${GOOGLE_FAVICON_URL}${
                  target ? getApexDomain(target) : SHORT_DOMAIN
                }`}
                alt={slug}
                className="h-5 w-5 rounded-full"
                width={20}
                height={20}
              />
              <p className="w-32 truncate text-left text-sm font-semibold text-gray-500">
                {slug}
              </p>
            </div>
            {domain === slug && !key && <Tick className="h-4 w-4" />}
          </Link>
        ))}
      </div>
    </div>
  );
};

const SharePopover = () => {
  const [openSharePopover, setopenSharePopoverPopover] = useState(false);

  const { baseApiPath, queryString, domain, key } = useContext(
    AnalyticsContext,
  ) as {
    baseApiPath: string;
    queryString: string;
    domain: string;
    key: string; // coerce to string since <SharePopover is not shown if key is undefined)
  };

  const { data, isLoading, update } = useOptimisticUpdate<{
    publicStats: boolean;
  }>(`${baseApiPath}?${queryString}`, {
    loading: "Updating...",
    success: "Successfully updated stats page visibility!",
    error: "Something went wrong",
  });

  const handleUpdate = async (checked: boolean) => {
    const res = await fetch(`${baseApiPath}?${queryString}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        publicStats: checked,
      }),
    });
    if (!res.ok) {
      throw new Error("Failed to update email preferences");
    }
    if (res.status === 200) {
      checked &&
        navigator.clipboard.writeText(
          `https://${domain}/stats/${encodeURIComponent(key)}`,
        );
    }
    return { publicStats: checked };
  };

  const [copied, setCopied] = useState(false);

  if (!data) return null;

  return (
    <Popover
      content={
        <div className="w-full divide-y divide-gray-200 text-sm md:w-60">
          <div className="p-4">
            <p className="text-gray-500">Share stats for</p>
            <p className="truncate font-semibold text-gray-800">
              {linkConstructor({ key, domain, pretty: true })}
            </p>
          </div>
          <div className="p-4">
            <div className="mb-2 flex items-center justify-between">
              <p className="font-semibold text-gray-800">Public Stats Page</p>
              <Switch
                checked={data?.publicStats}
                loading={isLoading}
                fn={(checked: boolean) => {
                  update(() => handleUpdate(checked), { publicStats: checked });
                }}
              />
            </div>
            <p className="text-gray-500">
              Making stats public will allow anyone with the link to see the
              stats for this short link.
            </p>
          </div>
          <div className="p-4">
            <p className="font-semibold text-gray-800">Share Link</p>
            <div className="divide-x-200 mt-2 flex items-center justify-between divide-x overflow-hidden rounded-md border border-gray-200 bg-gray-100">
              <div className="scrollbar-hide overflow-scroll pl-2">
                <p className="whitespace-nowrap text-gray-600">
                  https://{domain}/stats/{encodeURIComponent(key)}
                </p>
              </div>
              <button
                className="h-8 flex-none border-l bg-white px-2 hover:bg-gray-50 active:bg-gray-100"
                onClick={() => {
                  navigator.clipboard.writeText(
                    `https://${domain}/stats/${encodeURIComponent(key)}`,
                  );
                  setCopied(true);
                  toast.success("Copied to clipboard");
                  setTimeout(() => setCopied(false), 3000);
                }}
              >
                {copied ? (
                  <Tick className="h-4 w-4 text-gray-500" />
                ) : (
                  <Copy className="h-4 w-4 text-gray-500" />
                )}
              </button>
            </div>
          </div>
        </div>
      }
      align="end"
      openPopover={openSharePopover}
      setOpenPopover={setopenSharePopoverPopover}
    >
      <button
        onClick={() => setopenSharePopoverPopover(!openSharePopover)}
        className="mr-2 flex w-24 items-center justify-center space-x-2 rounded-md bg-white px-3 py-2.5 shadow transition-all duration-75 hover:shadow-md active:scale-95"
      >
        <IconMenu text="Share" icon={<Share2 className="h-4 w-4" />} />
      </button>
    </Popover>
  );
};
