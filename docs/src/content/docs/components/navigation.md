---
title: 네비게이션
description: 동적 네비게이션 링크와 인터랙티브 효과
---

현대적인 호버 효과와 활성 상태 표시기를 갖춘 네비게이션 시스템입니다.

## 🎯 주요 특징

### 동적 효과

- **호버 시 이동**: translateY(-1px)로 살짝 위로 이동
- **그라데이션 배경**: 미묘한 그라데이션 효과 적용
- **그림자 효과**: box-shadow로 깊이감 연출

### 활성 상태 표시

현재 페이지는 다음과 같이 표시됩니다:

- 더 진한 배경색
- 굵은 폰트 (font-weight: 600)
- 애니메이션 언더라인

## 📱 반응형 동작

네비게이션은 화면 크기에 따라 다르게 동작합니다:

### Desktop (1024px+)

- 모든 링크가 수평으로 배치
- 충분한 간격 (gap: 1.5rem)
- 호버 효과 최대한 활용

### Tablet (768px-1023px)

- 약간 줄어든 간격 (gap: 1rem)
- 여전히 수평 배치 유지

### Mobile (768px 미만)

- 햄버거 메뉴로 전환
- 세로 드롭다운 메뉴
- 터치 친화적 인터페이스

## 🎨 스타일 상세

### 기본 링크 스타일

```css
.nav-bar a {
  position: relative;
  padding: 0.5rem 0.75rem;
  border-radius: var(--radius);
  color: var(--color-muted-foreground);
  transition: all 0.2s ease-in-out;
}
```

### 호버 효과

```css
.nav-bar a:hover {
  color: var(--color-foreground);
  background-color: var(--color-accent);
  transform: translateY(-1px);
  box-shadow: var(--shadow-sm);
}
```

### 활성 상태

```css
.nav-bar a.active {
  color: var(--color-primary-foreground);
  background-color: var(--color-primary);
  font-weight: 600;
  box-shadow: var(--shadow-md);
}
```

## 🏷️ 배지 시스템

네비게이션 링크에는 배지를 추가할 수 있습니다:

```javascript
{
  label: "새 기능",
  link: "/new-feature/",
  badge: "New"
}
```

배지는 다음과 같은 스타일을 갖습니다:

- 성공 색상 (초록색)
- 대문자 변환
- 호버 시 1.05배 확대

## ⚡ 애니메이션

### 언더라인 애니메이션

활성 링크는 하단에 애니메이션 언더라인을 표시합니다:

```css
.nav-bar a.active::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--gradient-accent);
  animation: slide-in 0.3s ease-out;
}
```

### 그라데이션 배경

모든 링크는 호버 시 미묘한 그라데이션 배경을 표시합니다:

```css
.nav-bar a::before {
  content: "";
  position: absolute;
  inset: 0;
  background: var(--gradient-accent);
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
}

.nav-bar a:hover::before {
  opacity: 0.1;
}
```

## 🌙 다크 모드

다크 모드에서는 추가적인 효과가 적용됩니다:

- **Glass Effect**: backdrop-filter: blur(8px)
- **투명 배경**: rgba(255, 255, 255, 0.1)
- **향상된 대비**: 더 명확한 색상 구분

## 설정 방법

Astro 설정에서 네비게이션 링크를 정의할 수 있습니다:

```javascript
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
      badge: "New",
    },
  ],
});
```
