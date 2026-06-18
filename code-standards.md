# NEXUS — Code Standards & Development Guidelines

This document details the code rules, architectural patterns, and formatting constraints that must be followed across the NEXUS repository.

---

## 1. Core Language Rules

*   **TypeScript Only:** All logic and component files must be written in TypeScript (`.ts` or `.tsx`). Pure JavaScript is strictly forbidden.
*   **No `any` Types:** Explicit `any` annotations are not allowed. Always declare precise types, interfaces, or type parameters. If a type is external or dynamic, use generic types or `unknown` with type assertions:
    ```typescript
    // Forbidden
    function handleData(payload: any) { ... }
    
    // Allowed
    function handleData(payload: Record<string, unknown>) { ... }
    ```

---

## 2. Reusable Component Pattern

*   **Atomic Primitives:** Generic UI assets (Buttons, Skeletons, Inputs, Modals) must reside inside [src/components/ui](file:///d:/Nexus-App-Pakistan/src/components/ui) and be kept fully reusable and presentation-focused.
*   **Props Constraints:** UI primitives must support standard accessibility properties, forwarding ref structures, and accept clean style override extensions via Tailwind merger wrappers (`cn(baseStyle, className)`).

---

## 3. Feature-Based Architecture

Files and folders are organized around distinct user capabilities or domain modules to prevent flat file bloat:

*   **Dashboard Features:** Views are isolated based on user modules (e.g., [src/components/dashboard/studio](file:///d:/Nexus-App-Pakistan/src/components/dashboard/studio) for photo selection/reviews, and [src/components/dashboard/venue](file:///d:/Nexus-App-Pakistan/src/components/dashboard/venue) for lead quotation tools).
*   **Marketplace Discovery:** UI search widgets, directory grids, and sliders are grouped by category (e.g., [src/components/venues](file:///d:/Nexus-App-Pakistan/src/components/venues), [src/components/rentals](file:///d:/Nexus-App-Pakistan/src/components/rentals)).
*   **Data Libs:** DB schemas and permission checkers are grouped under business domains (e.g., `src/lib/rbac`, `src/lib/subscriptions`, `src/lib/audit`).

---

## 4. Styling & Layout Standards

*   **Tailwind CSS Only:** All styling must be achieved using Tailwind utility classes.
*   **No Inline Styling:** Inline `style={{ ... }}` declarations are forbidden except for dynamically calculated parameters (e.g., coordinates, height transitions).
*   **Theme Tokens:** Use color, radius, and font variables from the theme registry. Do not hardcode raw hex values in styling classes:
    ```tsx
    // Forbidden
    <div className="bg-[#FAF7F2] rounded-[16px] text-[#1D1C17]" style={{ padding: '16px' }} />
    
    // Allowed
    <div className="bg-background rounded-lg text-foreground p-4" />
    ```

---

## 5. React Server Components (RSC) vs. Client Components

*   **Server Components by Default:** Next.js Server Components are the default pattern. Use them for static pages, headers, lists, and pages conducting initial database queries:
    - Minimizes client-side javascript bundles.
    - Accelerates search indexability for public marketplace items.
*   **Client Components Boundary:** Demarcate pages with `'use client'` only when they require:
    - Interactive states (`useState`, `useEffect`, `useRef`).
    - Form bindings and schema validators.
    - Browser contexts or event handlers.
    - Animations (Framer Motion container elements).
