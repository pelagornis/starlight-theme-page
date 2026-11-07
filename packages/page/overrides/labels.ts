import type { PageTranslationKey } from "../i18n.ts";

type Translate = (key: string) => string;

/** Every UI string the React islands render, resolved for the current locale. */
export function docsLabels(t: Translate) {
  const page = (key: PageTranslationKey) => t(key);
  return {
    nav: t("sidebarNav.accessibleLabel"),
    search: t("search.label"),
    searchPlaceholder: page("pelagornisPage.search.placeholder"),
    searchEmpty: page("pelagornisPage.search.empty"),
    searchPages: page("pelagornisPage.search.pages"),
    searchContent: page("pelagornisPage.search.content"),
    menuOpen: t("menuButton.accessibleLabel"),
    menuClose: page("pelagornisPage.menu.close"),
    theme: t("themeSelect.accessibleLabel"),
    themeDark: t("themeSelect.dark"),
    themeLight: t("themeSelect.light"),
    previous: t("page.previousLink"),
    next: t("page.nextLink"),
    pagination: page("pelagornisPage.pagination"),
    breadcrumb: page("pelagornisPage.breadcrumb"),
    footer: page("pelagornisPage.footer"),
    fileTree: page("pelagornisPage.fileTree"),
    sidebarResize: page("pelagornisPage.sidebar.resize"),
    sidebarOpen: page("pelagornisPage.sidebar.open"),
    sidebarClose: page("pelagornisPage.sidebar.close"),
    sidebarPin: page("pelagornisPage.sidebar.pin"),
  };
}

export type DocsLabels = ReturnType<typeof docsLabels>;
