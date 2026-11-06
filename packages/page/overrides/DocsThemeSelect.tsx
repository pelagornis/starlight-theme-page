import { useEffect, useState } from "react";
import { iconSizes } from "@refineui/tokens";
import { Button, WebIcon } from "@refineui/react";
import type { DocsLabels } from "./labels";

type DocsTheme = "light" | "dark";

const STORAGE_KEY = "starlight-theme";

function preferredScheme(): DocsTheme {
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function parseTheme(value: string | null): DocsTheme {
    if (value === "light" || value === "dark") return value;
    return preferredScheme();
}

function applyTheme(theme: DocsTheme) {
    document.documentElement.dataset.theme = theme;
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem(STORAGE_KEY, theme);
}

function ThemeGlyph({ theme }: { theme: DocsTheme }) {
    const size = iconSizes.small;
    const name = theme === "dark" ? "moon" : "weather-sunny";
    return <WebIcon name={name} size={size} color="currentColor" />;
}

export function DocsThemeSelect({ labels }: { labels: Pick<DocsLabels, "theme" | "themeDark" | "themeLight"> }) {
    const [theme, setTheme] = useState<DocsTheme>("light");

    useEffect(() => {
        const next = parseTheme(localStorage.getItem(STORAGE_KEY));
        setTheme(next);
        applyTheme(next);
    }, []);

    const nextTheme: DocsTheme = theme === "light" ? "dark" : "light";

    return (
        <Button
            layout="icon"
            variant="ghost"
            size="md"
            aria-label={`${labels.theme}: ${theme === "light" ? labels.themeLight : labels.themeDark}`}
            onClick={() => {
                setTheme(nextTheme);
                applyTheme(nextTheme);
            }}
        >
            <ThemeGlyph theme={theme} />
        </Button>
    );
}
