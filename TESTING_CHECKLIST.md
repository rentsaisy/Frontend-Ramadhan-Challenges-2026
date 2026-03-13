# TESTING CHECKLIST - Ramadhan Portal 2026

## 1. CROSS-BROWSER TESTING

### Chrome/Edge (Chromium-based)
- [ ] All pages load correctly
- [ ] Navigation menu works (desktop & mobile toggle)
- [ ] Responsive design switches at breakpoints (768px, 576px)
- [ ] Animations and transitions smooth
- [ ] Form inputs work (zakat calculator, todo items)
- [ ] Local storage/session storage working
- [ ] Console shows no errors

### Firefox
- [ ] All pages load correctly
- [ ] Check vendor-prefixed CSS (-moz- properties)
- [ ] Flexbox/Grid layout renders correctly
- [ ] Transitions work smoothly
- [ ] SVG backgrounds render (if used)
- [ ] Console shows no errors or warnings

### Safari (macOS & iOS)
- [ ] All pages load and render correctly
- [ ] Check -webkit- prefixed CSS working
- [ ] Smooth scrolling behavior
- [ ] Tap/touch events work on iOS
- [ ] Form elements styled properly
- [ ] Navigation menu on mobile (hamburger works)
- [ ] Auto-save/localStorage works

### Mobile Browsers
- [ ] Chrome Android
- [ ] Firefox Android
- [ ] Samsung Internet
- [ ] Opera Android

---

## 2. MOBILE RESPONSIVENESS TESTING

### Viewport Sizes Tested
- [ ] 320px (iPhone SE/small phones)
- [ ] 375px (iPhone X/11)
- [ ] 480px (Various Android phones)
- [ ] 540px (Tablets - portrait)
- [ ] 768px (Tablets - landscape/iPad)
- [ ] 1024px (Large tablets)
- [ ] 1440px+ (Desktop)

### Mobile-Specific Checks
- [ ] Viewport meta tag present: `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
- [ ] Text readable without zoom (min 16px font)
- [ ] Touch targets at least 44x44px (WCAG)
- [ ] Mobile menu toggle works (hamburger icon)
- [ ] No horizontal scroll on mobile
- [ ] Images scale properly
- [ ] Forms are mobile-friendly (large inputs)
- [ ] Hero section responsive
- [ ] Feature cards stack vertically on mobile
- [ ] Footer readable on mobile

### Pages to Test on Mobile
- [ ] index.html - Home page
- [ ] pages/jadwal.html - Schedule
- [ ] pages/doa.html - Duas
- [ ] pages/todo.html - To-Do list
- [ ] pages/zakat.html - Zakat calculator
- [ ] pages/zikir.html - Zikir counter

---

## 3. PERFORMANCE TESTING

### Speed Metrics (Target)
- [ ] First Contentful Paint (FCP) < 2s
- [ ] Largest Contentful Paint (LCP) < 2.5s
- [ ] Layout Shift (CLS) < 0.1
- [ ] Time to Interactive (TTI) < 3.5s
- [ ] Overall page load < 4s

### Tools to Use
- [ ] Google PageSpeed Insights (check desktop & mobile)
- [ ] WebPageTest.org
- [ ] Chrome DevTools Lighthouse
- [ ] Firefox Performance tab

### Optimization Checks
- [ ] CSS minified in production
- [ ] JavaScript minified in production
- [ ] Images optimized/compressed
- [ ] No unused CSS/JS loaded
- [ ] Caching headers set properly
- [ ] Lazy loading for images implemented
- [ ] No console errors/warnings

---

## 4. FUNCTIONALITY TESTING

### Navigation
- [ ] Active page highlighted in navbar
- [ ] All links work (internal and external)
- [ ] Mobile menu toggle on/off
- [ ] Mobile menu closes when link clicked
- [ ] Mobile menu closes when outside clicked

### Jadwal (Schedule)
- [ ] City selector works
- [ ] Schedule displays for selected city
- [ ] Times accurate and in correct format
- [ ] Mobile view readable

### Doa Page
- [ ] Duas display correctly
- [ ] Category filtering works (if implemented)
- [ ] Copy to clipboard works
- [ ] Share functionality works

### To-Do List
- [ ] Can add/check items
- [ ] Progress bar updates
- [ ] Data persists on refresh
- [ ] Mobile layout readable
- [ ] Colors theme consistent

### Zakat Calculator
- [ ] Penghasilan calculation correct (2.5%)
- [ ] Emas calculation correct (2.5%)
- [ ] Switch between types works
- [ ] Custom price input works
- [ ] Results display properly

### Zikir Counter
- [ ] Counter increments on click
- [ ] Target setting works (33, 100, 1000, custom)
- [ ] Progress bar updates
- [ ] Reset button works
- [ ] Data saves/loads correctly
- [ ] Target reached notification shows

### Footer
- [ ] All links work
- [ ] Footer visible on all pages
- [ ] Footer styled correctly

---

## 5. ACCESSIBILITY TESTING

### Keyboard Navigation
- [ ] Tab through all interactive elements
- [ ] Tabindex logical order
- [ ] Escape key closes mobile menu
- [ ] Enter/Space activates buttons

### Visual Accessibility
- [ ] Color contrast sufficient (WCAG AA or AAA)
- [ ] No color dependence only (icons/text also present)
- [ ] Text readable (avoid grey text on light backgrounds)
- [ ] Focus indicators visible

### Screen Reader Testing
- [ ] Use NVDA (Windows) or JAWS to test
- [ ] Headings structured correctly (h1, h2, h3...)
- [ ] Alt text for images (if any decorative: alt="")
- [ ] Link text descriptive (not "click here")
- [ ] Form labels associated with inputs

---

## 6. CROSS-BROWSER CSS COMPATIBILITY

### Vendor Prefixes Verified
- [ ] `-webkit-` (Chrome, Safari, Edge)
- [ ] `-moz-` (Firefox)
- [ ] `-ms-` (Internet Explorer/old Edge)

### CSS Features Tested
- [ ] Flexbox layouts
- [ ] Grid layouts (with fallbacks)
- [ ] CSS Variables (--primary-green, etc.)
- [ ] Gradients
- [ ] Transitions & animations
- [ ] Box shadows
- [ ] Border radius
- [ ] Transforms

### Specific CSS Checks
- [ ] Gradient backgrounds render correctly
- [ ] SVG patterns (if used) work
- [ ] Scrollbar styling (webkit only) doesn't break Firefox
- [ ] Sticky positioning for navbar

---

## 7. DEVICE-SPECIFIC TESTING

### iOS
- [ ] Safari (min iOS 12)
- [ ] Chrome iOS
- [ ] Status bar doesn't overlap content
- [ ] Keyboard doesn't cause layout shift
- [ ] Swipe gestures work naturally

### Android
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Samsung Internet
- [ ] System back button works appropriately

### Tablets
- [ ] iPad (portrait & landscape)
- [ ] Android tablets (portrait & landscape)
- [ ] Layout switches appropriately

---

## 8. FORM TESTING

### Zakat Calculator Form
- [ ] Number inputs accept decimals
- [ ] Negative numbers handled
- [ ] Very large numbers handled
- [ ] Empty fields have defaults
- [ ] Results format with commas (1.000.000)

### Todo Checkboxes
- [ ] Clicking checks/unchecks
- [ ] Visual feedback clear
- [ ] Multiple selections work
- [ ] Persist on page reload

### Doa Category Filter
- [ ] Selection/deselection works
- [ ] Active state visible
- [ ] Filtering accurate
- [ ] No console errors

---

## 9. CUSTOM TESTING SCENARIOS

### Slow Network (Throttling)
- [ ] Test at "Fast 3G" in DevTools
- [ ] Test at "Slow 3G" in DevTools
- [ ] Content loads progressively
- [ ] No timeout errors

### Offline Mode
- [ ] Service worker caches pages (if implemented)
- [ ] Navigation menu still works
- [ ] Critical content accessible

### Extreme Scenarios
- [ ] Very long page names (test overflow)
- [ ] Special characters in input
- [ ] Copy/paste special formatting
- [ ] JavaScript disabled (graceful degradation)

---

## 10. VISUAL CONSISTENCY

### Color Scheme
- [ ] Primary Green: #1b5e20 ✓
- [ ] Secondary Green: #2e7d32 ✓
- [ ] Primary Gold: #ffd700 ✓
- [ ] Cream Background: #fef5e7 ✓
- [ ] All pages use consistent colors

### Typography
- [ ] Font: -apple-system, BlinkMacSystemFont, Segoe UI
- [ ] Heading hierarchy consistent
- [ ] Line height readable (1.6)
- [ ] Font sizes responsive

### Spacing & Layout
- [ ] Padding consistent
- [ ] Margins appropriate
- [ ] No jumpy layouts (CLS)
- [ ] Whitespace balanced

---

## QUICK CHECKLIST (Before Deployment)

- [ ] Run Google PageSpeed Insights (target 90+)
- [ ] Test on 3 major browsers (Chrome, Firefox, Safari)
- [ ] Test on 2 mobile devices/viewports
- [ ] Verify all links work
- [ ] Check console for errors (F12)
- [ ] Test form submissions
- [ ] Verify responsive design at 320px and 1440px
- [ ] Check mobile menu toggle works
- [ ] Verify footer displays properly
- [ ] Test Escape key closes mobile menu
- [ ] Verify all colors match brand
- [ ] Check print preview (if needed)

---

## KNOWN ISSUES & RESOLUTIONS

### Issue 1: iOS Safari scrollbar styling
- **Status**: ⚠️ Cannot fix - iOS Safari doesn't support scrollbar styling
- **Resolution**: Fallback works, scrollbar uses default

### Issue 2: Old IE (< 10) unsupported
- **Status**: ✓ Not supported, modern browsers only
- **Target**: IE 11+, but modern browsers recommended

### Issue 3: CSS Grid on old Android browsers
- **Status**: ✓ Has Flexbox fallback
- **Browser Support**: Android Chrome 26+

---

## TESTING ENVIRONMENT SETUP

### Browser DevTools to Check
1. **Chrome DevTools** - `F12` → Lighthouse
2. **Firefox DevTools** - `F12` → Inspector & Performance
3. **Safari DevTools** - Enable in Settings → Advanced
4. **Mobile Device Testing** - Use actual devices or emulators

### Browser Emulation in DevTools
1. Open DevTools → Device Toolbar (Ctrl+Shift+M in Chrome)
2. Select device from dropdown
3. Check various orientations
4. Enable rotate to test mobile landscape

### Online Testing Tools
- [BrowserStack](https://www.browserstack.com/) - Real devices
- [LambdaTest](https://www.lambdatest.com/) - Multiple browsers
- [Responsively App](https://responsively.app/) - Desktop app for responsive testing

---

## SIGN-OFF

**Tested By**: ________________  
**Date**: ________________  
**Status**: [ ] PASS [ ] FAIL  
**Notes**: ________________________________________________  
**Sign-off**: ________________  

---

**Last Updated**: March 13, 2026  
**Maintained By**: Dev Team
