# 🎨 Design System Documentation
## Gyampo Frontend - Vice SRC President, University of Ghana

---

## 🎯 **Design Principles**

### **1. Accessibility First**
- WCAG AA compliance minimum
- High contrast ratios (4.5:1+)
- Keyboard navigation support
- Screen reader compatibility

### **2. Mobile-First**
- Touch-friendly interactions (44px minimum)
- Responsive breakpoints
- Progressive enhancement
- Performance optimization

### **3. Consistency**
- Unified spacing system
- Consistent component patterns
- Standardized interactions
- Brand-aligned aesthetics

---

## 🎨 **Color System**

### **Primary Palette**
```css
/* Primary Colors */
--primary-blue: #1A4BFF;      /* Main brand color */
--primary-gold: #FFD34E;      /* Accent/CTA color */
--primary-dark: #0d3ce6;      /* Primary hover state */
--primary-gold-hover: #ffc629; /* Gold hover state */

/* Neutral Colors */
--white: #FFFFFF;             /* Background */
--section-bg: #F7F9FB;        /* Section backgrounds */
--text-dark: #1E1E1E;         /* Primary text */
--text-muted: #6C7A89;        /* Secondary text */
--border-light: #E1E6ED;      /* Borders and dividers */
```

### **Semantic Colors** (Future Enhancement)
```css
/* Status Colors */
--success: #10B981;           /* Success states */
--warning: #F59E0B;           /* Warning states */
--error: #EF4444;             /* Error states */
--info: #3B82F6;              /* Information states */
```

### **Usage Guidelines**
- **Primary Blue:** Headers, links, primary actions
- **Gold:** CTAs, highlights, "Student Ventures" button
- **Muted:** Secondary text, metadata, placeholders
- **Borders:** Subtle separators, card outlines

---

## 📝 **Typography**

### **Font Stack**
```css
font-family: 'Inter', 'Poppins', system-ui, -apple-system, sans-serif;
```

### **Type Scale**
```css
/* Headings */
.heading-1 { font-size: 2.5rem; font-weight: 700; line-height: 1.2; }
.heading-2 { font-size: 2rem; font-weight: 700; line-height: 1.3; }
.heading-3 { font-size: 1.5rem; font-weight: 600; line-height: 1.4; }
.heading-4 { font-size: 1.25rem; font-weight: 600; line-height: 1.4; }

/* Body Text */
.text-large { font-size: 1.125rem; line-height: 1.6; }
.text-regular { font-size: 1rem; line-height: 1.6; }
.text-small { font-size: 0.875rem; line-height: 1.5; }

/* Mobile Adjustments */
@media (max-width: 768px) {
  .heading-1 { font-size: 2rem; }
  .heading-2 { font-size: 1.75rem; }
  .heading-3 { font-size: 1.25rem; }
}
```

### **Font Weights**
- **300:** Light (rarely used)
- **400:** Regular (body text)
- **500:** Medium (emphasized text)
- **600:** Semi-bold (subheadings)
- **700:** Bold (headings)
- **800:** Extra-bold (hero text)

---

## 📏 **Spacing System**

### **Base Unit: 8px**
```css
/* Spacing Scale */
--space-1: 8px;    /* 0.5rem */
--space-2: 16px;   /* 1rem */
--space-3: 24px;   /* 1.5rem */
--space-4: 32px;   /* 2rem */
--space-5: 40px;   /* 2.5rem */
--space-6: 48px;   /* 3rem */
--space-8: 64px;   /* 4rem */
--space-10: 80px;  /* 5rem */
```

### **Component Spacing**
```css
/* Section Padding */
.section { padding: 40px 0; }           /* Mobile */
@media (min-width: 768px) {
  .section { padding: 80px 0; }         /* Desktop */
}

/* Card Padding */
.card { padding: 16px; }                /* Mobile */
@media (min-width: 768px) {
  .card { padding: 20px; }              /* Desktop */
}

/* Grid Gaps */
.grid { gap: 16px; }                    /* Mobile */
@media (min-width: 768px) {
  .grid { gap: 24px; }                  /* Desktop */
}
```

---

## 🧩 **Component Library**

### **Buttons**

#### **Primary Button**
```css
.btn-primary {
  background: #1A4BFF;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background: #0d3ce6;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(26, 75, 255, 0.3);
}
```

#### **Secondary Button**
```css
.btn-secondary {
  background: transparent;
  color: #1A4BFF;
  border: 2px solid #1A4BFF;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: #1A4BFF;
  color: white;
  transform: translateY(-2px);
}
```

#### **Accent Button (Gold)**
```css
.btn-accent {
  background: #FFD34E;
  color: #1E1E1E;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-accent:hover {
  background: #ffc629;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(255, 211, 78, 0.3);
}
```

### **Cards**

#### **Standard Card**
```css
.card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid #E1E6ED;
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
}
```

### **Form Elements**

#### **Input Fields**
```css
.form-input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #E1E6ED;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: #1A4BFF;
  box-shadow: 0 0 0 3px rgba(26, 75, 255, 0.1);
}
```

#### **Labels**
```css
.form-label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #1E1E1E;
}
```

---

## 📱 **Responsive Breakpoints**

### **Breakpoint System**
```css
/* Mobile First Approach */
/* Base styles: Mobile (< 768px) */

/* Tablet */
@media (min-width: 768px) { }

/* Desktop */
@media (min-width: 1024px) { }

/* Large Desktop */
@media (min-width: 1200px) { }
```

### **Container Widths**
```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

@media (min-width: 768px) {
  .container { padding: 0 40px; }
}
```

---

## 🎭 **Animation & Transitions**

### **Transition Standards**
```css
/* Standard Transition */
transition: all 0.3s ease;

/* Hover Effects */
transform: translateY(-2px);
box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);

/* Fade In Animation */
.fade-in {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}
```

### **Animation Principles**
- **Duration:** 0.3s for micro-interactions, 0.6s for page transitions
- **Easing:** `ease` for natural feel
- **Purpose:** Enhance UX, not distract
- **Performance:** CSS transforms and opacity only

---

## 🎨 **Visual Effects**

### **Shadows**
```css
/* Card Shadow */
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

/* Hover Shadow */
box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);

/* Button Shadow */
box-shadow: 0 6px 16px rgba(26, 75, 255, 0.3);
```

### **Border Radius**
```css
/* Standard Radius */
border-radius: 8px;    /* Buttons, inputs */
border-radius: 12px;   /* Cards, modals */
border-radius: 16px;   /* Large containers */
border-radius: 25px;   /* Pill buttons */
```

### **Gradients**
```css
/* Primary Gradient */
background: linear-gradient(135deg, #1A4BFF 0%, #FFD34E 100%);

/* Background Gradient */
background: linear-gradient(135deg, #F7F9FB 0%, #FFFFFF 100%);
```

---

## ♿ **Accessibility Standards**

### **Focus States**
```css
button:focus-visible,
a:focus-visible,
input:focus-visible,
textarea:focus-visible {
  outline: 2px solid #1A4BFF;
  outline-offset: 2px;
}
```

### **Color Contrast**
- **Normal Text:** 4.5:1 minimum ratio
- **Large Text:** 3:1 minimum ratio
- **Interactive Elements:** 3:1 minimum ratio

### **Touch Targets**
- **Minimum Size:** 44px × 44px
- **Spacing:** 8px minimum between targets
- **Visual Feedback:** Clear hover/active states

---

## 📊 **Usage Guidelines**

### **Do's**
✅ Use consistent spacing from the scale  
✅ Maintain proper color contrast ratios  
✅ Apply hover states to interactive elements  
✅ Use semantic HTML structure  
✅ Test on multiple devices and screen sizes  

### **Don'ts**
❌ Mix different spacing values arbitrarily  
❌ Use colors that don't meet contrast requirements  
❌ Create touch targets smaller than 44px  
❌ Use color as the only way to convey information  
❌ Ignore keyboard navigation  

---

## 🔧 **Implementation Notes**

### **CSS Modules**
- All styles are scoped to components
- Use camelCase for class names
- Import styles in components: `import styles from './Component.module.css'`

### **Global Styles**
- Typography and base styles in `globals.css`
- Utility classes for common patterns
- CSS custom properties for theming

### **Performance**
- Use CSS transforms for animations
- Minimize repaints and reflows
- Optimize font loading with `font-display: swap`

---

**Design System Version:** 1.0  
**Last Updated:** December 2024  
**Maintainer:** Gyampo Frontend Team


