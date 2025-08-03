---
title: 고급 예제
description: 고급 기능과 커스터마이제이션 예제
---

이 페이지에서는 테마의 고급 기능들과 커스터마이제이션 방법을 소개합니다.

## 🎨 고급 커스터마이제이션

### CSS 변수 오버라이드

테마의 모든 색상과 스타일을 CSS 변수로 커스터마이즈할 수 있습니다:

```css
:root {
  /* Primary Colors */
  --color-primary: hsl(120, 100%, 40%);
  --color-primary-foreground: hsl(0, 0%, 100%);

  /* Custom Gradients */
  --gradient-primary: linear-gradient(
    135deg,
    hsl(120, 100%, 40%) 0%,
    hsl(160, 100%, 35%) 100%
  );

  /* Shadows */
  --shadow-custom: 0 10px 30px rgba(0, 255, 0, 0.3);

  /* Border Radius */
  --radius: 1rem; /* 더 둥근 모서리 */
}
```

### 다크 모드 전용 스타일

```css
[data-theme="dark"] {
  --color-background: hsl(240, 10%, 3.9%);
  --color-foreground: hsl(0, 0%, 98%);

  /* 다크 모드 전용 그라데이션 */
  --gradient-dark: linear-gradient(
    135deg,
    hsl(240, 10%, 3.9%) 0%,
    hsl(240, 10%, 6%) 100%
  );
}
```

## ⚡ 고급 애니메이션

### 커스텀 애니메이션 추가

테마에 자신만의 애니메이션을 추가할 수 있습니다:

```css
/* Pulse 애니메이션 */
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.05);
  }
}

.pulse-element {
  animation: pulse 2s ease-in-out infinite;
}

/* Glow 효과 */
@keyframes glow {
  from {
    box-shadow: 0 0 5px var(--color-primary);
  }
  to {
    box-shadow: 0 0 20px var(--color-primary), 0 0 30px var(--color-primary);
  }
}

.glow-effect {
  animation: glow 1s ease-in-out infinite alternate;
}
```

## 🔧 고급 JavaScript 기능

### 테마 상태 감지

```javascript
// 현재 테마 감지
function getCurrentTheme() {
  return document.documentElement.dataset.theme || "auto";
}

// 테마 변경 이벤트 리스너
function onThemeChange(callback) {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === "data-theme") {
        callback(getCurrentTheme());
      }
    });
  });

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });

  return observer;
}

// 사용 예제
onThemeChange((theme) => {
  console.log("테마가 변경되었습니다:", theme);
  // 커스텀 로직 실행
});
```

### 스크롤 기반 애니메이션

```javascript
// Intersection Observer를 사용한 스크롤 애니메이션
function addScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  // 애니메이션을 적용할 요소들 선택
  document.querySelectorAll(".scroll-animate").forEach((el) => {
    observer.observe(el);
  });
}

// 페이지 로드 시 실행
document.addEventListener("DOMContentLoaded", addScrollAnimations);
```

## 📱 고급 반응형 기능

### 브레이크포인트 감지

```javascript
// 미디어 쿼리 매처를 사용한 반응형 로직
const breakpoints = {
  mobile: "(max-width: 767px)",
  tablet: "(min-width: 768px) and (max-width: 1023px)",
  desktop: "(min-width: 1024px)",
};

function setupResponsiveLogic() {
  Object.entries(breakpoints).forEach(([name, query]) => {
    const mq = window.matchMedia(query);

    function handleChange(e) {
      if (e.matches) {
        document.body.classList.add(`is-${name}`);
        console.log(`현재 화면: ${name}`);
      } else {
        document.body.classList.remove(`is-${name}`);
      }
    }

    mq.addListener(handleChange);
    handleChange(mq); // 초기 실행
  });
}
```

## 🎭 고급 컴포넌트 커스터마이징

### 헤더 확장

```astro
---
// custom-header.astro
import BaseHeader from '@pelagornis/page/overrides/Header.astro';
---

<div class="enhanced-header">
  <BaseHeader />

  <!-- 추가 기능들 -->
  <div class="header-extras">
    <button class="notification-bell">🔔</button>
    <div class="user-avatar">👤</div>
  </div>
</div>

<style>
  .enhanced-header {
    position: relative;
  }

  .header-extras {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    gap: 0.5rem;
  }

  .notification-bell,
  .user-avatar {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    border: none;
    background: var(--color-accent);
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .notification-bell:hover,
  .user-avatar:hover {
    transform: scale(1.1);
    background: var(--color-primary);
  }
</style>
```

## 🔍 고급 검색 기능

### 커스텀 검색 오버레이

```css
/* 고급 검색 스타일 */
.advanced-search {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(20px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}

.advanced-search.active {
  opacity: 1;
  visibility: visible;
}

.search-container {
  background: var(--color-card);
  border-radius: calc(var(--radius) + 8px);
  padding: 2rem;
  max-width: 600px;
  width: 90%;
  box-shadow: var(--shadow-2xl);
  transform: scale(0.9);
  transition: transform 0.3s ease;
}

.advanced-search.active .search-container {
  transform: scale(1);
}
```

## 🌟 성능 최적화

### 애니메이션 성능 개선

```css
/* GPU 가속을 위한 will-change 사용 */
.optimized-animation {
  will-change: transform, opacity;
  transform: translateZ(0); /* 하드웨어 가속 활성화 */
}

/* 중요하지 않은 애니메이션은 조건부 적용 */
@media (prefers-reduced-motion: no-preference) {
  .conditional-animation {
    animation: slideIn 0.5s ease-out;
  }
}

/* 성능을 위한 contain 속성 */
.performance-container {
  contain: layout style paint;
}
```

### 이미지 최적화

```css
/* 현대적인 이미지 처리 */
.optimized-image {
  object-fit: cover;
  object-position: center;
  loading: lazy;
  transition: transform 0.3s ease;
}

.optimized-image:hover {
  transform: scale(1.02);
}

/* WebP 지원 체크 */
.webp .optimized-image {
  content: url("image.webp");
}

.no-webp .optimized-image {
  content: url("image.jpg");
}
```

## 🎯 사용자 경험 개선

### 로딩 상태 표시

```javascript
// 페이지 전환 시 로딩 인디케이터
class LoadingIndicator {
  constructor() {
    this.indicator = this.createIndicator();
    this.setupNavigation();
  }

  createIndicator() {
    const indicator = document.createElement("div");
    indicator.className = "loading-indicator";
    indicator.innerHTML = '<div class="loading-bar"></div>';
    document.body.appendChild(indicator);
    return indicator;
  }

  show() {
    this.indicator.classList.add("active");
  }

  hide() {
    this.indicator.classList.remove("active");
  }

  setupNavigation() {
    document.addEventListener("astro:before-preparation", () => this.show());
    document.addEventListener("astro:after-swap", () => this.hide());
  }
}

new LoadingIndicator();
```

---

이러한 고급 기능들을 활용하여 테마를 더욱 개인화하고 향상시킬 수 있습니다.
각 예제는 독립적으로 사용하거나 조합하여 사용할 수 있습니다.
