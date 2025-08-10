# <img src="https://github.com/pelagornis/starlight-theme-page/blob/main/packages/page/assets/page.svg" alt="" align="left" width="40" height="40"> Starlight Theme Page

> A modern, elegant Starlight theme inspired by starlight-theme-black with enhanced UX and beautiful animations

![Official](https://badge.pelagornis.com/official.svg)
[![npm version](https://img.shields.io/npm/v/@pelagornis/page.svg)](https://www.npmjs.com/package/@pelagornis/page)
[![license](https://img.shields.io/npm/l/@pelagornis/page.svg)](https://github.com/pelagornis/starlight-theme-page/blob/main/LICENSE)
[![stars](https://img.shields.io/github/stars/pelagornis/starlight-theme-page.svg)](https://github.com/pelagornis/starlight-theme-page)

### Installation

```bash
npm install @pelagornis/page
```

### Basic Configuration

```js
// astro.config.mjs
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import pagePlugin from "@pelagornis/page";

export default defineConfig({
  integrations: [
    starlight({
      plugins: [pagePlugin()],
      title: "My Documentation",
      // Add your Starlight configuration here
    }),
  ],
});
```

### Add Styles

```css
/* src/styles/global.css */
@import "@pelagornis/page/styles";
```

## 🎨 Customization

### Color System

The theme uses a modern HSL-based color system for easy customization:

```css
:root {
  --page-primary: hsl(222.2, 84%, 4.9%);
  --page-accent: hsl(210, 40%, 92%);
  --page-background: hsl(0, 0%, 100%);
  --page-foreground: hsl(222.2, 84%, 4.9%);
  /* More color variables available */
}
```

### Advanced Configuration

```js
pagePlugin({
  navigation: [
    { href: "/guides/", label: "Guides" },
    { href: "/api/", label: "API", badge: "New" },
  ],
  // Customize theme colors, animations, and more
});
```

## 🚀 Complete Feature Set

### ✅ Fully Overridden Components

| Component            | Features                                               |
| -------------------- | ------------------------------------------------------ |
| **Header**           | Sticky navigation, glass effects, gradient backgrounds |
| **Hero**             | Animated backgrounds, floating elements, gradient text |
| **Sidebar**          | Modern styling, hover effects, animated expansion      |
| **Footer**           | Transparent design, link hover effects, social icons   |
| **ThemeSelect**      | Rotation animations, glass effects, smooth transitions |
| **Search**           | Blur backgrounds, modern modal, enhanced input fields  |
| **Navigation**       | Hover effects, active states, badge system             |
| **SocialIcons**      | Platform colors, stagger animations, 3D effects        |
| **MobileMenu**       | Hamburger animations, touch-friendly interface         |
| **TwoColumnContent** | Enhanced TOC, sticky sidebar, scroll tracking          |
| **MarkdownContent**  | Typography improvements, code styling, table design    |

### 🎨 Design System

- **Colors**: HSL-based modern palette with light/dark mode support
- **Typography**: Optimized font sizes, line-heights, and spacing
- **Animations**: 60fps smooth transitions and micro-interactions
- **Gradients**: Consistent brand gradient system
- **Shadows**: Multi-layered shadow system for depth
- **Spacing**: Consistent spacing scale using CSS custom properties

### 📱 User Experience

- **Accessibility**: WCAG 2.1 AA compliance, screen reader support
- **Performance**: Optimized CSS, GPU acceleration, lazy loading
- **Responsive**: Mobile-first design with fluid typography
- **Dark Mode**: Perfect dark mode with system preference detection
- **Internationalization**: Multi-language support with RTL compatibility

## 🌟 Recent Updates

### ✨ Latest Improvements

- **Enhanced Sidebar**: Improved navigation with better visual hierarchy
- **Language Select**: Refined language switcher with better UX
- **Mobile Experience**: Optimized mobile menu and touch interactions
- **Performance**: Reduced bundle size and improved loading times
- **Accessibility**: Enhanced keyboard navigation and screen reader support

### 🔧 Technical Enhancements

- **TypeScript**: Full TypeScript support with improved type safety
- **Build Optimization**: Faster build times and smaller output
- **CSS Architecture**: Better organized styles with improved maintainability
- **Component Structure**: Cleaner component architecture and better reusability

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

**starlight-theme-page** is under MIT license. See the [LICENSE](LICENSE) file for more info.
