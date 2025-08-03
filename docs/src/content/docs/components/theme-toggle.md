---
title: 테마 토글
description: 라이트/다크 모드를 전환하는 테마 토글 버튼
---

부드러운 애니메이션과 함께 라이트/다크 모드를 전환할 수 있는 현대적인 토글 버튼입니다.

## ✨ 애니메이션 효과

### 회전 애니메이션

테마 전환 시 아이콘이 **360도 회전**하며 부드럽게 변경됩니다.

### 호버 효과

- 마우스 호버 시 **1.05배 확대**
- 배경색과 그림자 변경
- 글래스 효과 적용

### 클릭 피드백

- 클릭 시 **0.95배 축소** 후 복원
- 즉각적인 시각적 피드백 제공

## 🎨 디자인 특징

```css
/* 주요 스타일 특징 */
.theme-toggle-button {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: var(--radius);
  transition: all 0.2s ease-in-out;
}
```

### 다크 모드 전용 효과

다크 모드에서는 추가적인 **backdrop-filter**가 적용됩니다:

```css
[data-theme="dark"] .theme-toggle-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
}
```

## 🌙 아이콘 전환

| 테마  | 아이콘  | 상태               |
| ----- | ------- | ------------------ |
| Light | 🌙 Moon | 표시               |
| Dark  | ☀️ Sun  | 표시               |
| Auto  | 🌙/☀️   | 시스템 설정에 따라 |

## 접근성

테마 토글은 완전한 접근성을 지원합니다:

- **aria-label**: 스크린 리더 지원
- **키보드 탐색**: Tab으로 포커스 가능
- **포커스 표시기**: 명확한 포커스 링
- **상태 알림**: aria-live로 변경 알림

## 사용법

테마 토글은 헤더에 자동으로 포함되며, 별도 설정 없이 바로 사용할 수 있습니다.

### 수동 테마 설정

JavaScript로 수동으로 테마를 변경할 수도 있습니다:

```javascript
// 다크 모드로 변경
document.documentElement.dataset.theme = "dark";

// 라이트 모드로 변경
document.documentElement.dataset.theme = "light";

// 시스템 설정 따르기
document.documentElement.dataset.theme = "auto";
```
