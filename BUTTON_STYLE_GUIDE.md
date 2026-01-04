# Button Style Guide - PawMart

## Consistent Button System

All buttons across the application now use a unified design system with consistent:
- **Colors**: Matching the global color palette
- **Padding**: Standardized for all sizes
- **Border Radius**: var(--radius-md) = 0.5rem
- **Transitions**: Smooth hover and active states
- **Shadows**: Elevated on hover

---

## Button Variants

### Primary Button (.btn-primary)
- **Color**: Primary gradient (#713600 → #8a4200)
- **Use**: Main CTAs, submit buttons, important actions
- **Example**: Login, Sign Up, Submit, Add Listing

```jsx
<button className="btn-primary">Submit</button>
```

### Secondary Button (.btn-secondary)
- **Color**: Secondary gradient (#3B82F6 → #2563EB)
- **Use**: Alternative actions, less emphasis than primary
- **Example**: Browse, Learn More

```jsx
<button className="btn-secondary">Learn More</button>
```

### Success Button (.btn-success)
- **Color**: Accent/Green gradient (#10B981 → #059669)
- **Use**: Edit, Update, Confirm actions
- **Example**: Edit button, Update profile

```jsx
<button className="btn-success">Edit</button>
```

### Danger Button (.btn-danger)
- **Color**: Red gradient (#EF4444 → #DC2626)
- **Use**: Delete, Remove, Destructive actions
- **Example**: Delete listing, Remove item

```jsx
<button className="btn-danger">Delete</button>
```

### Neutral Button (.btn-neutral)
- **Color**: Neutral gradient (Dark grays)
- **Use**: Less important actions, Cancel
- **Example**: Cancel, Close, Reset Password

```jsx
<button className="btn-neutral">Cancel</button>
```

---

## Button Sizes

### Default Size
- **Padding**: 0.5rem 1.5rem (var(--spacing-sm) var(--spacing-lg))
- **Font Size**: 1rem

```jsx
<button className="btn-primary">Default Button</button>
```

### Small (.btn-sm)
- **Padding**: 0.25rem 1rem (var(--spacing-xs) var(--spacing-md))
- **Font Size**: 0.875rem

```jsx
<button className="btn-primary btn-sm">Small Button</button>
```

### Extra Small (.btn-xs)
- **Padding**: 0.25rem 0.75rem
- **Font Size**: 0.75rem

```jsx
<button className="btn-primary btn-xs">XS Button</button>
```

---

## Hover & Active States

All buttons have consistent interaction states:

1. **Hover**: 
   - Darker gradient
   - Shadow elevation (--shadow-md)
   - Slight upward movement (-2px)

2. **Active**:
   - Reset to original position

3. **Disabled**:
   - 50% opacity
   - No cursor pointer
   - No transform on hover
   - Cannot be clicked

---

## Implementation Examples

### Form Submit Button
```jsx
<button 
  type="submit" 
  disabled={loading}
  className="btn-primary w-full"
>
  {loading ? 'Submitting...' : 'Submit'}
</button>
```

### Action Buttons
```jsx
<div className="flex gap-3">
  <button className="btn-success btn-sm">Edit</button>
  <button className="btn-danger btn-sm">Delete</button>
</div>
```

### Link as Button
```jsx
<Link to="/services" className="btn-primary">
  Browse Pets
</Link>
```

---

## CSS Classes Applied

All buttons use these global CSS variables:
- `--spacing-xs`: 0.25rem
- `--spacing-sm`: 0.5rem
- `--spacing-md`: 1rem
- `--spacing-lg`: 1.5rem
- `--radius-md`: 0.5rem
- `--shadow-sm`: Light shadow
- `--shadow-md`: Medium shadow

---

## Files Updated

✅ src/index.css - Button style definitions
✅ src/Pages/ViewDetails/ViewDetails.jsx - Adopt/Order buttons
✅ src/Pages/MyServices/MyServices.jsx - Edit/Delete buttons
✅ src/Pages/AddServices/AddServices.jsx - Submit button
✅ src/Pages/UpdateSercices/UpdateServices.jsx - Update button
✅ src/Pages/ForgotPassword/ForgotPassword.jsx - Reset button
✅ src/Pages/LoginPage/LoginPage.jsx - Login button (already using)
✅ src/Pages/RegistrationPage/RegistrationPage.jsx - Register button (already using)
✅ src/Components/Navbar/Navbar.jsx - Navigation buttons (already using)
✅ src/Components/Banner/Banner.jsx - CTA buttons (already using)

---

## Benefits

✨ **Consistency**: All buttons look and feel the same
✨ **Maintainability**: Change colors globally by updating CSS variables
✨ **Accessibility**: Proper disabled and focus states
✨ **Responsive**: Works on all screen sizes
✨ **Dark Mode**: Automatically compatible
✨ **Professional**: Portfolio-ready appearance
