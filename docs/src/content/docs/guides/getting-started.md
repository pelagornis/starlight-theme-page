---
title: 시작하기
description: Starlight Theme Page를 설치하고 사용하는 방법을 배워보세요.
---

Starlight Theme Page는 [starlight-theme-black](https://github.com/adrian-ub/starlight-theme-black)에서 영감을 받아 만든 현대적인 Starlight 테마입니다.

## 설치

### 1. 패키지 설치

```bash
npm install @pelagornis/page
```

### 2. Astro 설정

`astro.config.js` 파일에서 테마 플러그인을 추가합니다:

```js
import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
import pagePlugin from "@pelagornis/page";

export default defineConfig({
  integrations: [
    starlight({
      plugins: [
        pagePlugin({
          navLinks: [
            {
              label: "홈",
              link: "/",
              attrs: {},
            },
            {
              label: "문서",
              link: "/docs/",
              attrs: {},
            },
          ],
        }),
      ],
      title: "My Documentation",
      customCss: ["@pelagornis/page/styles"],
    }),
  ],
});
```

## 주요 기능

### 🎨 현대적인 디자인

- **HSL 색상 시스템**: 쉽게 커스터마이즈 가능한 색상 변수
- **그라데이션 효과**: 미묘하고 세련된 시각적 깊이
- **Glass Effect**: 다크모드에서 backdrop-filter 효과

### 🌊 부드러운 애니메이션

- 모든 버튼과 링크에 hover 효과
- 페이지 로드 시 slide-in 애니메이션
- 테마 전환 시 회전 애니메이션

### 📱 반응형 디자인

- 모바일 우선 디자인
- 브레이크포인트별 최적화
- 터치 친화적 인터페이스

## 커스터마이제이션

### 색상 변경

CSS 변수를 사용하여 테마 색상을 쉽게 변경할 수 있습니다:

```css
:root {
  --color-primary: hsl(your-hue, saturation%, lightness%);
  --color-accent: hsl(your-hue, saturation%, lightness%);
}
```

### 네비게이션 링크

플러그인 설정에서 네비게이션 링크를 설정할 수 있습니다:

```js
pagePlugin({
  navLinks: [
    {
      label: "Blog",
      link: "/blog/",
      badge: "New",
    },
  ],
});
```

## 다음 단계

이제 테마가 설정되었습니다! 헤더의 테마 토글 버튼을 클릭해보거나, 로고에 마우스를 올려보세요.
모든 인터랙션이 부드러운 애니메이션과 함께 작동합니다.
