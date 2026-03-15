const defaultConfig = {
  theme: "night",
  enableExploreGate: true,
  entry: {
    titleTypeSpeedMs: 38,
    subtitleTypeSpeedMs: 18,
    subtitleDelayMs: 180,
    blinkMinOpacity: 0.45,
    blinkGlowAlpha: 0.55,
    blinkGlowSizePx: 10,
    leaveDurationMs: 430,
  },
  enableIdleSlideshow: true,
  idleTimeoutMs: 30000,
  slideshowIntervalMs: 4500,
  particles: {
    dayDesktop: 260,
    nightDesktop: 180,
    dayMobile: 110,
    nightMobile: 70,
  },
  wallpaper: {
    day: "assets/images/wallpapers/day.png",
    night: "assets/images/wallpapers/night.jpg",
    default: "assets/images/wallpapers/default.jpg",
  },
  gallery: [],
  greetings: ["Hi", "Hello"],
  cat: {
    svg: "/assets/images/cat/cat.svg",
  },
  visits: {
    enabled: true,
    provider: "countapi",
    namespace: "10WTW01",
    key: "site",
  },
};

let configPromise = null;

function mergeConfig(source = {}) {
  return {
    ...defaultConfig,
    ...source,
    wallpaper: {
      ...defaultConfig.wallpaper,
      ...(source.wallpaper || {}),
    },
    gallery: Array.isArray(source.gallery) ? source.gallery : defaultConfig.gallery,
    greetings: Array.isArray(source.greetings) && source.greetings.length > 0 ? source.greetings : defaultConfig.greetings,
    cat: {
      ...defaultConfig.cat,
      ...(source.cat || {}),
    },
    entry: {
      ...defaultConfig.entry,
      ...(source.entry || {}),
    },
    visits: {
      ...defaultConfig.visits,
      ...(source.visits || {}),
    },
    particles: {
      ...defaultConfig.particles,
      ...(source.particles || {}),
    },
  };
}

export async function loadSiteConfig() {
  if (!configPromise) {
    configPromise = fetch("/data/site-config.json", { cache: "no-store" })
      .then((response) => {
        if (!response.ok) {
          return defaultConfig;
        }
        return response.json();
      })
      .then((json) => mergeConfig(json))
      .catch(() => defaultConfig);
  }

  return configPromise;
}
