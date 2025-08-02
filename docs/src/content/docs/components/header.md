---
title: Header 컴포넌트
description: 현대적인 헤더 컴포넌트의 특징과 사용법
---

# Header 컴포넌트

현대적인 헤더는 sticky 네비게이션과 글래스 효과를 특징으로 합니다.

## 주요 기능

### 🎨 디자인 특징

- **Sticky Navigation**: 스크롤 시 상단에 고정
- **Glass Effect**: 투명도와 블러 효과
- **Gradient Background**: 미묘한 그라데이션 배경
- **Smooth Animations**: 부드러운 전환 효과

### 📱 반응형 디자인

헤더는 모든 화면 크기에서 완벽하게 작동합니다:

| 화면 크기 | 동작                 |
| --------- | -------------------- |
| Desktop   | 전체 네비게이션 표시 |
| Tablet    | 압축된 레이아웃      |
| Mobile    | 햄버거 메뉴로 전환   |

### 🌟 인터랙션

헤더의 모든 요소는 호버 시 반응합니다:

1. **로고**: 호버 시 그라데이션과 회전 효과
2. **네비게이션 링크**: 배경색 변경과 이동 효과
3. **테마 토글**: 회전 애니메이션
4. **소셜 링크**: 플랫폼별 색상 변경

## 코드 예제

```astro
---
// Header 컴포넌트 사용 예제
import Header from '@pelagornis/page/overrides/Header.astro';
---

<Header />
```

> **팁**: 헤더는 자동으로 현재 페이지를 감지하여 활성 상태를 표시합니다.

## 커스터마이제이션

CSS 변수를 사용하여 헤더의 모양을 변경할 수 있습니다:

```css
:root {
  --header-height: 4rem;
  --header-blur: 16px;
  --header-opacity: 0.8;
}
```
