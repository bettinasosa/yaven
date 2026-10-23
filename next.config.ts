import type { NextConfig } from "next";

const RETIRED_AUDIENCE_PAGES = [
  "/coaches",
  "/fractionals",
  "/influencer-marketing",
  "/marketing-agency",
  "/outreach",
];

const nextConfig: NextConfig = {
  // The audience test pages are retired. Old links and campaign URLs land on
  // the homepage with their query string (utm tags, referral codes) intact.
  async redirects() {
    return RETIRED_AUDIENCE_PAGES.map((source) => ({
      source,
      destination: "/",
      permanent: true,
    }));
  },
  // Serve the Sparkle auto-update feed under yaven.us. The app's SUFeedURL is
  // https://yaven.us/releases/appcast.xml; this rewrite proxies the appcast that
  // scripts/release.sh publishes to the GitHub releases repo, so installed apps
  // find updates at the branded URL.
  async rewrites() {
    return [
      {
        source: "/releases/appcast.xml",
        destination:
          "https://raw.githubusercontent.com/nprice4/yaven-releases/main/appcast.xml",
      },
    ];
  },
};

export default nextConfig;
