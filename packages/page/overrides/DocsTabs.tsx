import { useCallback, useLayoutEffect, useState, type ReactNode } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@refineui/react";

interface DocsTab {
  label: string;
  html: string;
  /** Whether the tab's `icon<index>` slot is filled; Astro can pass slots that are empty. */
  icon: boolean;
}

const SYNC_EVENT = "page:synced-tabs";

/** Starlight keeps synced tab choices under this key, so a choice made before the theme still applies. */
const storageKey = (syncKey: string) => `starlight-synced-tabs__${syncKey}`;

type SyncDetail = { syncKey: string; label: string };

/**
 * Starlight's `<Tabs>` as RefineUI Tabs. Panels arrive as rendered HTML; icons arrive as `icon0`, `icon1`, … slots.
 * Tab sets with the same `syncKey` switch together and remember the choice across pages.
 */
export function DocsTabs({
  tabs,
  syncKey,
  ...icons
}: { tabs: DocsTab[]; syncKey?: string } & Record<`icon${number}`, ReactNode>) {
  const [value, setValue] = useState("0");

  const selectLabel = useCallback(
    (label: string | null) => {
      const index = tabs.findIndex((tab) => tab.label === label);
      if (index !== -1) setValue(String(index));
    },
    [tabs],
  );

  useLayoutEffect(() => {
    if (!syncKey) return;
    selectLabel(localStorage.getItem(storageKey(syncKey)));
    const onSync = (event: Event) => {
      const detail = (event as CustomEvent<SyncDetail>).detail;
      if (detail.syncKey === syncKey) selectLabel(detail.label);
    };
    window.addEventListener(SYNC_EVENT, onSync);
    return () => window.removeEventListener(SYNC_EVENT, onSync);
  }, [syncKey, selectLabel]);

  const onValueChange = (next: string) => {
    setValue(next);
    const label = tabs[Number(next)]?.label;
    if (!syncKey || label === undefined) return;
    localStorage.setItem(storageKey(syncKey), label);
    window.dispatchEvent(new CustomEvent<SyncDetail>(SYNC_EVENT, { detail: { syncKey, label } }));
  };

  return (
    <Tabs value={value} onValueChange={onValueChange} data-refineui-docs-tabs>
      <TabsList className="not-content">
        {tabs.map((tab, index) => (
          <TabsTrigger key={index} value={String(index)}>
            {tab.icon ? icons[`icon${index}`] : null}
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab, index) => (
        <TabsContent key={index} value={String(index)} dangerouslySetInnerHTML={{ __html: tab.html }} />
      ))}
    </Tabs>
  );
}
