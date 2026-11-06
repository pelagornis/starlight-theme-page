import {
  Footer,
  FooterBrand,
  FooterCopyright,
  FooterExplore,
  FooterGroup,
  FooterGroupLabel,
  FooterLink,
  FooterLocale,
  FooterMeta,
  FooterMetaEnd,
  FooterNav,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  footerLocaleTriggerClassName,
} from "@refineui/react";

export type DocsFooterLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type DocsFooterGroup = {
  label: string;
  links: DocsFooterLink[];
};

export type DocsFooterLanguage = {
  value: string;
  label: string;
};

export function DocsSiteFooter({
  groups,
  social,
  copyright,
  editHref,
  editLabel,
  languages,
  languageValue,
  languageLabel,
  navLabel,
}: {
  groups: DocsFooterGroup[];
  social: DocsFooterLink[];
  copyright?: string;
  editHref?: string;
  editLabel?: string;
  languages: DocsFooterLanguage[];
  languageValue?: string;
  languageLabel: string;
  navLabel: string;
}) {
  return (
    <Footer data-refineui-docs-site-footer>
      {groups.length > 0 || social.length > 0 ? (
        <FooterExplore>
          <FooterNav aria-label={navLabel}>
            {groups.map((group) => (
              <FooterGroup key={group.label}>
                <FooterGroupLabel>{group.label}</FooterGroupLabel>
                {group.links.map((link) => (
                  <FooterLink
                    key={link.href}
                    href={link.href}
                    {...(link.external ? { target: "_blank", rel: "noreferrer" } : {})}
                  >
                    {link.label}
                  </FooterLink>
                ))}
              </FooterGroup>
            ))}
            {social.length > 0 ? (
              <FooterGroup>
                {social.map((link) => (
                  <FooterLink key={link.href} href={link.href} target="_blank" rel="noreferrer">
                    {link.label}
                  </FooterLink>
                ))}
              </FooterGroup>
            ) : null}
          </FooterNav>
        </FooterExplore>
      ) : null}
      <FooterMeta>
        <FooterBrand>
          {copyright ? <FooterCopyright>{copyright}</FooterCopyright> : null}
          {editHref && editLabel ? <FooterLink href={editHref}>{editLabel}</FooterLink> : null}
        </FooterBrand>
        {languages.length > 1 && languageValue ? (
          <FooterMetaEnd>
            <FooterLocale>
              <Select
                size="sm"
                value={languageValue}
                onValueChange={(next) => {
                  if (next && next !== languageValue) window.location.pathname = next;
                }}
              >
                <SelectTrigger
                  appearance="plain"
                  aria-label={languageLabel}
                  className={footerLocaleTriggerClassName}
                >
                  {languages.find((language) => language.value === languageValue)?.label ?? languageLabel}
                </SelectTrigger>
                <SelectContent>
                  {languages.map((language) => (
                    <SelectItem key={language.value} value={language.value}>
                      {language.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FooterLocale>
          </FooterMetaEnd>
        ) : null}
      </FooterMeta>
    </Footer>
  );
}
