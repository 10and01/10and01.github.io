const LANG_STORAGE = "drluffy.lang";

const dictionary = {
  en: {
    nav_home: "Home",
    nav_about: "About",
    nav_articles: "Articles",
    lang_toggle: "中文",
    theme_toggle_title: "Slide to switch between day and night",
    slideshow_title: "Photo Showcase",
    slideshow_prev: "Prev",
    slideshow_next: "Next",
    slideshow_exit: "Exit",
    slideshow_hint: "Click photo to zoom. Swipe or use the controls to browse.",
    lightbox_close: "Close",
    entry_label: "System Ready",
    entry_title: "10WTW01",
    entry_subtitle: "Welcome to my personal space",
    entry_explore: "Explore",
    home_eyebrow: "",
    home_title: "Future is unlimited.",
    home_subtitle: "",
    home_read_articles: "Read Articles",
    home_about_me: "About Me",
    home_latest_articles: "Latest Articles",
    about_title: "About Me",
    about_desc: "A eager learner.Currently a junior student majored in Computer Science.",
    about_timeline: "Timeline",
    articles_title: "Articles",
    articles_desc: "",
    articles_search_placeholder: "Search title or tags",
    article_contents: "Contents",
    article_not_found: "Article not found",
    article_missing_slug: "Missing slug parameter.",
    article_could_not_load: "The requested article could not be loaded.",
    article_prev_prefix: "Previous:",
    article_next_prefix: "Next:",
    article_back: "Back to Articles",
    article_no_results: "No articles found.",
    pager_prev: "Prev",
    pager_next: "Next",
    pager_page: "Page",
    footer_visits: "Visits",
    footer_local: "local",
    footer_disabled: "disabled",
    unit_min: "min",
    cat_munch: "Munch!",
    slideshow_empty: "Add gallery images in data/site-config.json to enable the showcase.",
  },
  zh: {
    nav_home: "首页",
    nav_about: "关于",
    nav_articles: "文章",
    lang_toggle: "EN",
    theme_toggle_title: "滑动切换白天和黑夜主题",
    slideshow_title: "相册展示",
    slideshow_prev: "上一张",
    slideshow_next: "下一张",
    slideshow_exit: "退出",
    slideshow_hint: "点击照片可放大。支持左右滑动或按钮浏览。",
    lightbox_close: "关闭",
    entry_label: "系统已就绪",
    entry_title: "10WTW01",
    entry_subtitle: "欢迎来到我的个人空间",
    entry_explore: "Explore",
    home_eyebrow: "",
    home_title: "未来无限可能",
    home_subtitle: "",
    home_read_articles: "阅读文章",
    home_about_me: "了解我",
    home_latest_articles: "最新文章",
    about_title: "关于我",
    about_desc: "持续学习者，大三计算机学生",
    about_timeline: "时间线",
    articles_title: "文章",
    articles_desc: "",
    articles_search_placeholder: "搜索标题或标签",
    article_contents: "目录",
    article_not_found: "未找到文章",
    article_missing_slug: "缺少 slug 参数。",
    article_could_not_load: "请求的文章无法加载。",
    article_prev_prefix: "上一篇：",
    article_next_prefix: "下一篇：",
    article_back: "返回文章列表",
    article_no_results: "没有匹配文章。",
    pager_prev: "上一页",
    pager_next: "下一页",
    pager_page: "第",
    footer_visits: "访问量",
    footer_local: "本地",
    footer_disabled: "已关闭",
    unit_min: "分钟",
    cat_munch: "啊呜！",
    slideshow_empty: "请在 data/site-config.json 中配置相册图片以启用展示。",
  },
};

let currentLang = localStorage.getItem(LANG_STORAGE) || "en";

function safeLang(value) {
  return value === "zh" ? "zh" : "en";
}

function applyStaticText() {
  document.documentElement.lang = currentLang;

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.getAttribute("data-i18n");
    const value = dictionary[currentLang][key];
    if (typeof value === "string") {
      node.textContent = value;
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
    const key = node.getAttribute("data-i18n-placeholder");
    const value = dictionary[currentLang][key];
    if (typeof value === "string") {
      node.setAttribute("placeholder", value);
    }
  });

  document.querySelectorAll("[data-i18n-title]").forEach((node) => {
    const key = node.getAttribute("data-i18n-title");
    const value = dictionary[currentLang][key];
    if (typeof value === "string") {
      node.setAttribute("title", value);
    }
  });
}

export function t(key) {
  return dictionary[currentLang][key] || dictionary.en[key] || key;
}

export function getLanguage() {
  return currentLang;
}

export function setupLanguageToggle(button) {
  currentLang = safeLang(currentLang);
  applyStaticText();

  if (!button) {
    return;
  }

  button.addEventListener("click", () => {
    currentLang = currentLang === "en" ? "zh" : "en";
    localStorage.setItem(LANG_STORAGE, currentLang);
    applyStaticText();
    window.dispatchEvent(new CustomEvent("lang:change", { detail: currentLang }));
  });
}
