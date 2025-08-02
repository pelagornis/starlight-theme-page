# <img src="/packages/page/assets/page.svg" alt="" align="left" width="40" height="40"> Starlight Theme Page

> starlight-theme-black에서 영감을 받은 현대적인 Starlight 테마

## ✨ 특징

### 🎨 현대적인 디자인

- **shadcn/ui 스타일**: 최신 웹 디자인 트렌드를 반영한 컴포넌트
- **라이트/다크 모드**: 부드러운 전환 애니메이션과 함께 완벽한 테마 지원
- **그라데이션 효과**: 미묘하고 세련된 그라데이션으로 시각적 깊이 추가

### 🚀 향상된 사용자 경험

- **부드러운 애니메이션**: 모든 인터랙션에 자연스러운 전환 효과
- **반응형 디자인**: 모든 기기에서 완벽한 사용자 경험
- **접근성 개선**: WCAG 가이드라인을 따른 포용적 디자인

### 🎯 주요 컴포넌트 개선

- **Header**: 글래스 효과와 sticky 네비게이션
- **ThemeSelect**: 회전 애니메이션이 있는 테마 토글
- **Navigation**: 호버 효과와 활성 상태 표시기
- **Search**: 현대적인 모달과 블러 배경
- **SiteTitle**: 인터랙티브 로고와 그라데이션 텍스트

## 🛠 설치 및 사용

### 설치

```bash
npm install @pelagornis/page
```

### 설정

```js
// astro.config.js
import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
import pagePlugin from "@pelagornis/page";

export default defineConfig({
  integrations: [
    starlight({
      plugins: [pagePlugin()],
      title: "My Documentation",
      // 기타 설정...
    }),
  ],
});
```

## 🎨 커스터마이제이션

### 색상 시스템

테마는 HSL 기반 색상 시스템을 사용하여 쉽게 커스터마이즈할 수 있습니다:

```css
:root {
  --color-primary: hsl(222.2, 84%, 4.9%);
  --color-accent: hsl(210, 40%, 92%);
  /* 기타 색상 변수들... */
}
```

### 그라데이션

내장된 그라데이션 변수를 사용하여 일관된 시각적 효과를 적용할 수 있습니다:

```css
.my-element {
  background: var(--gradient-primary);
}
```

### 애니메이션

미리 정의된 애니메이션 클래스를 활용하세요:

```html
<div class="fade-in">페이드 인 효과</div>
<div class="slide-up">슬라이드 업 효과</div>
```

## 🚀 완성된 기능들

### ✅ 완전히 오버라이드된 컴포넌트들

- **Header**: Sticky 네비게이션, 글래스 효과, 그라데이션 배경
- **Hero**: 애니메이션 배경, 플로팅 이미지, 그라데이션 텍스트
- **Sidebar**: 현대적인 스타일, 호버 효과, 애니메이션 확장
- **Footer**: 투명 배경, 링크 호버 효과, 소셜 아이콘
- **ThemeSelect**: 회전 애니메이션, 글래스 효과, 부드러운 전환
- **Search**: 블러 배경, 현대적인 모달, 향상된 입력 필드
- **Navigation**: 호버 효과, 활성 상태 언더라인, 배지 시스템
- **SocialIcons**: 플랫폼별 색상, 스태거 애니메이션, 3D 효과
- **MobileMenuToggle**: 햄버거 애니메이션, 터치 친화적 인터페이스
- **TwoColumnContent**: 향상된 TOC, 스티키 사이드바, 스크롤 추적
- **MarkdownContent**: 타이포그래피 개선, 코드 블록 스타일링, 테이블 디자인

### 🎨 디자인 시스템

- **색상**: HSL 기반 현대적 팔레트 (라이트/다크 모드)
- **타이포그래피**: 최적화된 폰트 크기와 line-height
- **애니메이션**: 60fps 부드러운 전환과 마이크로 인터랙션
- **그라데이션**: 일관된 브랜드 그라데이션 시스템
- **그림자**: 깊이감을 주는 다층 그림자 시스템

### 📱 사용자 경험

- **접근성**: WCAG 준수, 스크린 리더 지원, 키보드 네비게이션
- **성능**: 최적화된 CSS, GPU 가속, lazy loading
- **반응형**: 모바일 우선 디자인, fluid typography
- **다크 모드**: 완벽한 다크 모드 지원과 시스템 선호도 감지

## 🌟 영감

이 테마는 [starlight-theme-black](https://github.com/adrian-ub/starlight-theme-black)에서 영감을 받아 개발되었습니다. shadcn/ui의 디자인 원칙을 Starlight에 적용하여 현대적이고 세련된 문서 사이트를 만들 수 있습니다.

## 📄 라이선스

MIT License © 2024-PRESENT Pelagornis

## 🤝 기여

기여는 언제나 환영합니다! 이슈를 열거나 풀 리퀘스트를 보내주세요.
