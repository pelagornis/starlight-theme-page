import {
  Footer,
  FooterBrand,
  FooterBrandDescription,
  FooterBrandName,
  FooterCopyright,
  FooterGroup,
  FooterGroupLabel,
  FooterLink,
  FooterMeta,
  FooterNav,
} from "@pelagornis/page/components";

export default function FooterDemo() {
  return (
    <Footer className="w-full">
      <FooterBrand>
        <FooterBrandName>Page</FooterBrandName>
        <FooterBrandDescription>A Starlight theme built on RefineUI.</FooterBrandDescription>
      </FooterBrand>
      <FooterNav>
        <FooterGroup>
          <FooterGroupLabel>Docs</FooterGroupLabel>
          <FooterLink href="/guides/getting-started/">Getting started</FooterLink>
          <FooterLink href="/components/">Components</FooterLink>
        </FooterGroup>
        <FooterGroup>
          <FooterGroupLabel>Project</FooterGroupLabel>
          <FooterLink href="https://github.com/pelagornis/starlight-theme-page">GitHub</FooterLink>
        </FooterGroup>
      </FooterNav>
      <FooterMeta>
        <FooterCopyright>© Pelagornis</FooterCopyright>
      </FooterMeta>
    </Footer>
  );
}
