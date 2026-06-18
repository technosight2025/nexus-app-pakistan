# NEXUS — UI Coding & Design Rules

To ensure a cohesive and premium look and feel across the platform, all developers must adhere to the design guidelines documented below.

---

## 1. Aesthetic Direction: Industrial Premium & Clean SaaS

NEXUS is a robust event and business operating system. The visual design focuses on high structure, clarity, and professionalism.

*   **Clean SaaS Design:** The interface should look functional, modern, and uncluttered. Use precise alignments, clean layout columns, and uniform padding throughout.
*   **Odoo-Style Dashboards:** Dashboards should be designed for high data density, clear operations, and quick access. Focus on structured grid blocks, highly legible data tables, clean lists, and easily clickable action buttons.
*   **Stripe-Style Polish:** Emphasize details. Leverage typography hierarchy, crisp micro-interactions, subtle borders, high text-to-background contrast, and polished focus states.

---

## 2. Layout & Viewport Rules

*   **Mobile-First Design:** The platform is heavily used on-site by field workers, photographers, and venue coordinators.
    - All dashboard and database views must adapt to mobile viewports.
    - Ensure touch targets are at least `44px x 44px`.
    - Automatically swap desktop sidebars for bottom touch menus on smaller screen boundaries.
*   **Responsive Grids:** Organize items using flexbox or CSS grid configurations. Avoid absolute alignments or fixed component dimensions that can break on resizing.

---

## 3. Styling Restrictions & Prohibitions

To preserve a business-focused SaaS aesthetic, the following styling patterns are **strictly prohibited**:

*   **No Wedding-Theme Styling:** Do not style elements with romance, wedding, or celebratory motifs (e.g. hearts, floral accents, script fonts, bride/groom graphics). NEXUS is a professional B2B business operating system. Keep all layouts, copy, and icons strictly commercial and corporate.
*   **No Heavy Gradients:** Avoid loud, multi-color gradients. Use flat surface colors or very subtle single-tone shifts (e.g., transitioning between slate tones).
*   **No Large Shadows:** Do not use soft, floating shadows (e.g., `shadow-xl`, `shadow-2xl`). Rely on crisp `border-border` boundaries and low-offset shadows (`shadow-sm`) to define container depth.
*   **Minimal Glassmorphism:** Opaque and solid backgrounds are preferred for high contrast and readability. Limit backdrop-blur transparency to main floating headers only.
