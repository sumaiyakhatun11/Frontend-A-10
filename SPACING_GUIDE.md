# Spacing & Layout Guide - PawMart

## Design System Variables

All spacing throughout the application uses CSS custom properties (variables) for consistency:

```css
--spacing-xs: 0.25rem;    /* 4px */
--spacing-sm: 0.5rem;     /* 8px */
--spacing-md: 1rem;       /* 16px */
--spacing-lg: 1.5rem;     /* 24px */
--spacing-xl: 2rem;       /* 32px */
--spacing-2xl: 3rem;      /* 48px */
--spacing-3xl: 4rem;      /* 64px */
```

## Container Classes

### `.container-custom`
- **Max Width**: 1280px
- **Horizontal Padding**: 
  - Desktop: `var(--spacing-lg)` (24px)
  - Mobile: `var(--spacing-md)` (16px)
- **Usage**: Wrap all page content for consistent maximum width and side margins
- **Example**: 
  ```jsx
  <div className="container-custom">
    {/* Content */}
  </div>
  ```

### `.section-padding`
- **Vertical Padding**:
  - Desktop: `var(--spacing-3xl)` top & bottom (64px)
  - Mobile: `var(--spacing-2xl)` top & bottom (48px)
- **Usage**: Apply to `<section>` elements for consistent vertical spacing
- **Example**:
  ```jsx
  <section className="section-padding bg-white dark:bg-neutral-900">
    <div className="container-custom">
      {/* Section content */}
    </div>
  </section>
  ```

## Utility Classes

### Gap (Grid/Flex spacing)
- `.gap-sm` → `var(--spacing-sm)` (8px)
- `.gap-md` → `var(--spacing-md)` (16px)
- `.gap-standard` / `.gap-lg` → `var(--spacing-lg)` (24px)
- `.gap-xl` → `var(--spacing-xl)` (32px)

### Margins
- `.mb-standard` → Bottom margin `var(--spacing-lg)` (24px)
- `.mt-standard` → Top margin `var(--spacing-lg)` (24px)

### Padding
- `.p-standard` → All sides `var(--spacing-lg)` (24px)
- `.px-standard` → Left & Right `var(--spacing-lg)` (24px)
- `.py-standard` → Top & Bottom `var(--spacing-lg)` (24px)

## Component Spacing Standards

### Page Layouts
All pages should follow this structure:
```jsx
<div className="min-h-screen bg-white dark:bg-neutral-900">
  <section className="section-padding">
    <div className="container-custom">
      {/* Page content */}
    </div>
  </section>
</div>
```

### Card Grids
Use `.card-grid` class for consistent 4-column layouts:
```jsx
<div className="card-grid">
  {/* Cards */}
</div>
```
- Auto-fills with minimum 280px column width
- Desktop: Fixed 4 columns
- Responsive gap: `var(--spacing-lg)` (24px)

### Form Layouts
```jsx
<div className="container-custom section-padding">
  <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-neutral-800 shadow-md rounded-lg">
    <form className="space-y-4">
      {/* Form fields */}
    </form>
  </div>
</div>
```

## Components Updated

### ✅ Home Page Sections
- **Banner**: Uses `h-[60vh]` with proper container padding
- **Features**: `section-padding` with `container-custom`
- **Statistics**: `section-padding` with gradient background
- **Testimonials**: `section-padding` with responsive grid
- **FAQ**: `section-padding` with accordion spacing
- **Newsletter**: `section-padding` with centered form
- **CTA**: `section-padding` with background pattern
- **CategoryCardSection**: `section-padding` with 4-column grid
- **Popular**: `section-padding` with 3-column grid
- **WhyAdopt**: `section-padding` with centered content
- **PetHeroes**: `section-padding` with 4-column grid

### ✅ Pages
- **About**: Hero section + multiple sections with `section-padding`
- **Contact**: Hero section + info cards + form with `section-padding`
- **Services**: `container-custom` + `py-8` for filters
- **ViewDetails**: `container-custom section-padding` wrapper
- **Profile**: `container-custom section-padding` wrapper
- **AddServices**: `container-custom section-padding` wrapper
- **UpdateServices**: `container-custom section-padding` wrapper
- **MyServices**: `container-custom section-padding` wrapper
- **MyOrders**: `container-custom section-padding` wrapper
- **ForgotPassword**: Full-height centering with proper padding
- **Terms**: `container-custom section-padding` wrapper

### ✅ Global Components
- **Navbar**: Sticky with `container-custom` and `py-4`
- **Footer**: `container-custom` with `py-12`

## Spacing Best Practices

### 1. Section Hierarchy
```
Page Container (min-h-screen)
  └─ Section (section-padding)
      └─ Container (container-custom)
          └─ Content Grid/Flex (gap-standard)
```

### 2. Responsive Spacing
- Use CSS variables that scale automatically
- Mobile-first approach with larger spacing on desktop
- Grid gaps remain consistent across breakpoints

### 3. Dark Mode Compatibility
All spacing classes work seamlessly with dark mode. Focus on:
- Background colors: `bg-white dark:bg-neutral-900`
- Text colors: `text-neutral-900 dark:text-white`
- Borders: `border-neutral-200 dark:border-neutral-700`

### 4. Avoid Hard-coded Values
❌ **Don't use**:
```jsx
<div className="p-4 m-8 py-12 px-6">
```

✅ **Do use**:
```jsx
<div className="section-padding">
  <div className="container-custom">
```

## Common Patterns

### Hero Section
```jsx
<section className="bg-gradient-to-r from-primary to-orange-900 text-white">
  <div className="container-custom section-padding text-center">
    <h1>Title</h1>
    <p>Description</p>
  </div>
</section>
```

### Content Section
```jsx
<section className="section-padding bg-neutral-50 dark:bg-neutral-800">
  <div className="container-custom">
    <h2 className="text-center mb-8">Section Title</h2>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Cards */}
    </div>
  </div>
</section>
```

### Form Section
```jsx
<div className="container-custom section-padding">
  <div className="max-w-2xl mx-auto">
    <form className="space-y-6">
      {/* Form fields */}
    </form>
  </div>
</div>
```

## Checklist for New Components

- [ ] Use `section-padding` for vertical spacing
- [ ] Use `container-custom` for horizontal constraints
- [ ] Use CSS variables for custom spacing needs
- [ ] Test on mobile, tablet, and desktop
- [ ] Verify dark mode spacing consistency
- [ ] Ensure proper nesting: Page → Section → Container → Content

---

**Last Updated**: January 4, 2026
**Maintained By**: PawMart Development Team
