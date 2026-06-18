# NEXUS — UI Design Tokens

This document registers the core styling tokens, theme variables, and typography rules of the NEXUS visual design system.

---

## 1. Color Palette Tokens

The color theme is designed to evoke a luxury, premium aesthetic suited for high-end hospitality and celebratory events in Pakistan.

| Variable Name | Hex Code | System Function | Usage Example |
| :--- | :--- | :--- | :--- |
| **Background** | `#FAF7F2` | Page background color (Warm Ivory) | Base layout viewports |
| **Surface** | `#FFFFFF` | Core container background (Pure White) | Card layouts, dropdown overlays, dialog frames |
| **Primary** | `#0F5B3E` | Brand color (Deep Emerald Green) | Main action buttons, navigation icons |
| **Accent** | `#D9467A` | Highlight contrast color (Rose Pink) | Visual flags, badges, accent buttons |
| **Gold** | `#C9A227` | Premium accents (Festive Gold) | Pro tier elements, premium highlights |
| **Text** | `#1D1C17` | Primary typography color (Dark Charcoal) | Headers, active menu links, body text |
| **Secondary Text** | `#5E6460` | Muted typography color (Slate Gray) | Timestamps, form labels, captions |
| **Border** | `#E6E2DA` | Decorative borders and dividers (Sand) | Grids, input borders, dividing rules |

---

## 2. Typography Configurations

NEXUS uses custom type faces optimized for readable lists and layouts:

*   **Headings Font:** `Plus Jakarta Sans`
    - Used for display titles, landing page headlines, sidebar sections, and dialog headers.
*   **Body Font:** `Inter`
    - Standard font for form labels, descriptions, accounting tables, chat message bodies, and database rows.

---

## 3. Border Radii Standards

*   **Base Radius:** `16px` (`1rem`)
    - Used for parent workspace cards, visual dashboards, dialog grids, and dashboard viewports.
*   **Derived Scale Rules:**
    - Small (`sm`): `9.6px` (`calc(var(--radius) * 0.6)`) - buttons, status badges, tiny tabs.
    - Medium (`md`): `12.8px` (`calc(var(--radius) * 0.8)`) - input fields, image frames, nested boxes.
    - Large (`lg`): `16px` (`var(--radius)`) - standard containers, tables, lists.
    - Extra Large (`xl`): `22.4px` (`calc(var(--radius) * 1.4)`) - dialogue frames, select options dropdown.
