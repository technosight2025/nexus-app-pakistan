---
name: nexus-ui-ux-standards
description: >-
  Guidelines and architectural constraints for developing and maintaining the
  UI/UX design standards in the Nexus app.
---

# Nexus UI/UX Standards

## Overview
This skill outlines the strict design philosophy and UI/UX requirements for the Nexus platform. All new features and visual updates must adhere to these standards to ensure a cohesive, high-conversion user experience.

## Workflow Rules

### 1. Design Philosophy
- **Minimalist & Clean**: Avoid visual clutter. Use ample whitespace.
- **Mobile-First**: Design for small screens first, then progressively enhance for desktop.

### 2. Color Palette & Aesthetics
- **Professional Aesthetic**: Use a clean, modern, and professional color palette.
- **High-Contrast Text**: When placing text over background images, ALWAYS use a high-contrast dark overlay (40-50% black/dark tint) to ensure text pops and is fully readable.

### 3. Typography
- **Sans-Serif Fonts**: Use clean, highly readable sans-serif fonts (e.g., Inter, Roboto, Outfit) over browser defaults.
- **Hierarchy**: Maintain clear visual hierarchy between headings, subheadings, and body text.

### 4. Conversion Focus (CTAs)
- **Singular Focus**: Every major feature section (such as the Hero section, Budget Tracker, or Memories Gallery) MUST feature a clear, singular Primary Call to Action (CTA).
- **Visibility**: Ensure CTAs stand out visually and guide the user toward the next step.

### 5. Responsiveness Testing
- **Mandatory Viewports**: All components must be tested for and cleanly support:
  - `390px` width (standard mobile)
  - `1440px` width (standard desktop)

## Common Mistakes
- Neglecting the dark overlay on image backgrounds, resulting in unreadable white text.
- Having multiple conflicting primary CTAs in the same section.
- Forgetting to test layouts on the `390px` mobile breakpoint.
