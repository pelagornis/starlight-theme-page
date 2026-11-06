import { Tabs, TabsContent, TabsList, TabsTrigger } from '@refineui/react';

export function InstallTabs({ packageName = '@pelagornis/page' }: { packageName?: string }) {
  const commands = [
    { value: 'bun', label: 'bun', command: `bun add ${packageName}` },
    { value: 'npm', label: 'npm', command: `npm install ${packageName}` },
    { value: 'pnpm', label: 'pnpm', command: `pnpm add ${packageName}` },
    { value: 'yarn', label: 'Yarn', command: `yarn add ${packageName}` },
  ];

  return (
    <Tabs defaultValue="bun" className="not-content">
      <TabsList>
        {commands.map((item) => (
          <TabsTrigger key={item.value} value={item.value}>
            {item.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {commands.map((item) => (
        <TabsContent key={item.value} value={item.value}>
          <pre
            className="m-0 overflow-x-auto"
            style={{
              marginBlockStart: 'var(--refineui-spacing-size-small)',
              padding: 'var(--refineui-spacing-size-large) var(--refineui-spacing-size-x-large)',
              border: 'var(--refineui-stroke-width-thin) solid var(--refineui-color-alias-border-default)',
              borderRadius: 'var(--refineui-radius-rounded-large)',
              background: 'var(--refineui-color-alias-surface-sunken)',
              color: 'var(--refineui-color-alias-foreground-primary)',
              fontFamily: 'var(--__sl-font-mono)',
              fontSize: 'var(--refineui-typography-body-2-font-size)',
              lineHeight: 'var(--refineui-typography-body-1-line-height)',
            }}
          >
            <code>{item.command}</code>
          </pre>
        </TabsContent>
      ))}
    </Tabs>
  );
}
