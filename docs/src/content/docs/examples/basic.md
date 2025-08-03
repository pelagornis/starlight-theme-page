---
title: 기본 예제
description: Starlight Theme Page의 기본 사용법과 예제
---

이 페이지는 테마의 모든 기본 요소들을 보여줍니다.

## 🎨 타이포그래피

### 제목들 (Headings)

# 이것은 H1 제목입니다

## 이것은 H2 제목입니다

### 이것은 H3 제목입니다

#### 이것은 H4 제목입니다

### 텍스트 스타일

일반 텍스트는 **굵게**, _기울임_, ~~취소선~~, `인라인 코드`로 꾸밀 수 있습니다.

[링크](/)는 호버 시 그라데이션 언더라인이 나타납니다.

## 📝 리스트

### 순서 없는 리스트

- 첫 번째 항목
- 두 번째 항목
  - 중첩된 항목
  - 또 다른 중첩 항목
- 세 번째 항목

### 순서 있는 리스트

1. 첫 번째 단계
2. 두 번째 단계
3. 세 번째 단계

## 💻 코드 블록

### JavaScript 예제

```javascript
// 테마 변경 함수
function toggleTheme() {
  const currentTheme = document.documentElement.dataset.theme;
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = newTheme;
}

// 부드러운 애니메이션과 함께 테마 변경
document.querySelector(".theme-toggle").addEventListener("click", toggleTheme);
```

### CSS 예제

```css
/* 현대적인 버튼 스타일 */
.modern-button {
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius);
  background: var(--gradient-primary);
  border: none;
  color: white;
  transition: all 0.2s ease;
}

.modern-button:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}
```

## 📊 표격

| 기능       | Light Mode       | Dark Mode        | 애니메이션         |
| ---------- | ---------------- | ---------------- | ------------------ |
| Header     | ✅ Glass Effect  | ✅ Enhanced Blur | ✅ Slide Down      |
| Sidebar    | ✅ Clean Design  | ✅ Dark Theme    | ✅ Expand/Collapse |
| Footer     | ✅ Links & Info  | ✅ Transparent   | ✅ Hover Effects   |
| Navigation | ✅ Hover Effects | ✅ Glass Accent  | ✅ Underline       |

## 💬 인용구

> 이 테마는 **starlight-theme-black**에서 영감을 받아 개발되었습니다.
>
> shadcn/ui의 디자인 원칙을 적용하여 현대적이고 세련된 문서 사이트를 만들 수 있습니다.

## 🚨 알림 (Callouts)

:::note
이것은 노트 스타일 callout입니다. 중요한 정보를 강조할 때 사용합니다.
:::

:::tip
팁: 테마 토글 버튼을 클릭해보세요! 부드러운 회전 애니메이션을 볼 수 있습니다.
:::

:::caution
주의: 모든 애니메이션은 `prefers-reduced-motion` 설정을 존중합니다.
:::

:::danger
경고: 이 테마는 최신 브라우저에서만 완전히 지원됩니다.
:::

## 🖼️ 이미지

이미지는 자동으로 반응형으로 조정되며, 호버 시 약간의 확대 효과가 있습니다.

<!-- 이미지 예제는 실제 프로젝트에서 assets 폴더에 이미지를 추가한 후 사용하세요 -->
<!-- ![Starlight Logo](../../assets/your-image.webp) -->

## 🔗 링크와 버튼

다양한 스타일의 링크들:

- [내부 링크](/)
- [외부 링크](https://github.com/pelagornis/starlight-theme-page)
- [가이드 링크](/guides/getting-started/)

## 📋 체크리스트

완료된 기능들:

- [x] 현대적인 색상 시스템
- [x] 부드러운 애니메이션
- [x] 반응형 디자인
- [x] 다크 모드 지원
- [x] 접근성 개선
- [ ] 추가 컴포넌트 (진행 중)

---

이 예제 페이지에서 테마의 모든 기본 요소들을 확인할 수 있습니다.
각 요소들이 부드러운 애니메이션과 함께 반응하는 것을 체험해보세요!
