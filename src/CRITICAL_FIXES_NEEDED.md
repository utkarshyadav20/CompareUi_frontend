# Critical Optimization Fixes for App.tsx

## ✅ Already Fixed:
1. New Project Form modal - Now responsive (w-full md:w-[500px])
2. Controls bar - Responsive padding and scrolling
3. Search input - Responsive width

## ⚠️ Still Need Fixing:

### High Priority - Theme Issues (Light mode broken):

**Line 687-724:** Baselining Images Header
- `border-white/10` → `border-black/10 dark:border-white/10`
- `text-white` → `text-black dark:text-white`
- All tooltips `bg-[#2a2a2a]` → `bg-black dark:bg-[#2a2a2a]`

**Line 779-783:** URL Input when images exist
- `bg-[#1e1e1e]` → `bg-white dark:bg-[#1e1e1e]`
- `text-white` → `text-black dark:text-white`
- `border-white/10` → `border-black/50 dark:border-white/10`
- Button: `bg-white text-black` → `bg-black dark:bg-white text-white dark:text-black`

**Line 800-840:** Image Cards in Upload List
- `text-white` → `text-black dark:text-white`
- All menu items need dark mode support

**Line 862-863:** Upload from Device
- `text-white` → `text-black dark:text-white`

**Line 884-920:** Live Website Preview Header
- `text-white` → `text-black dark:text-white`
- All controls need theme support

**Line 957:** Website URL Input
- `text-white` → `text-black dark:text-white`

**Line 1000-1001:** Waiting State
- `text-white` → `text-black dark:text-white`

### Medium Priority - Responsive Issues:

**Header Section:**
- `px-8` → `px-4 md:px-8` (multiple places)

**Form Sections:**
- `px-6` → `px-4 md:px-6`

**Grid Layouts:**
- Add proper breakpoints for mobile

### Low Priority - Polish:

1. Consistent spacing across all sections
2. Ensure all hover states work in both themes
3. Focus states should be visible in both themes

## Quick Fix Script (Search & Replace):

```
# Baselining section - add these replacements:
"text-white text-[20px]" → "text-black dark:text-white text-[20px]"
"text-white" (in upload section) → "text-black dark:text-white"  
"bg-[#1e1e1e] dark:bg-[#1e1e1e]" → "bg-white dark:bg-[#1e1e1e]"
"bg-[#2a2a2a] text-white" → "bg-black dark:bg-[#2a2a2a] text-white"
"border-white/10" (in baselining) → "border-black/10 dark:border-white/10"
```

## Testing Checklist:
- [ ] Light theme - all text visible
- [ ] Dark theme - all text visible
- [ ] Mobile (375px) - no horizontal scroll
- [ ] Tablet (768px) - proper layout
- [ ] Desktop (1440px+) - full features
