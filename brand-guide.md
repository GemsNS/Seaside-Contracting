# Seaside Contracting - Brand Guidelines & UI Style Guide

## 1. Brand Identity & Global Data
- **Company Name:** Seaside Contracting
- **Previous Name:** BH Contracting LTD (Big Hoss) - *Strictly do not reference or display.*
- **Brand Voice:** Professional, modern, reliable, coastal, and precise. 
- **Primary Website:** `www.seasidecontracting.ca`
- **Primary Phone:** `(902) 809-9412`
- **Primary Service Area:** Halifax & Coastal Nova Scotia
- **Tagline (Placeholder):** "Precision in Every Build" / "Building the Coast's Future"

## 2. Color Palette
These hex codes are definitive. Use them precisely for all UI elements, backgrounds, and text.

| Color | Hex Code | Usage |
| :--- | :--- | :--- |
| **Aqua Blue (Primary)** | `#00B4D8` | Primary buttons (CTAs), logo accents, active navigation links, hover states, accent icons. |
| **Deep Black (Base)** | `#121212` | Main headings (H1, H2), dark section backgrounds, dark text, truck decal bases. |
| **Crisp White (Base)** | `#FFFFFF` | Main page background, negative space, light text on dark sections. |
| **Off-White (Neutral)** | `#F8F9FA` | Subtle section backgrounds, card components to separate from pure white. |

**CSS Variables Setup:**
```css
:root {
  --primary-aqua: #00B4D8;
  --base-black: #121212;
  --base-white: #FFFFFF;
  --neutral-offwhite: #F8F9FA;
}