# Design System: Editorial Heritage

## 1. Overview & Creative North Star
**Creative North Star: "The Modern Chronicler"**

This design system moves away from the generic "travel portal" aesthetic to embrace an editorial, high-end magazine feel. The Vagad region is a land of hidden architecture, lush landscapes, and deep history; the UI must reflect this by acting as a sophisticated storyteller rather than a utility grid. 

We break the "template" look through **Intentional Asymmetry** and **Tonal Depth**. By utilizing the high-contrast relationship between Saffron (`primary`) and the Warm Cream (`surface`), we create a sense of sun-drenched heritage. The system relies on white space as a structural element—using breathing room to guide the eye—rather than restrictive borders.

---

## 2. Colors & Surface Philosophy
The palette is rooted in the earth and spirit of Rajasthan, translated through a lens of premium modernism.

### The Palette
- **Primary (Saffron):** `#9a4601` (Base) | `#e07b39` (`primary_container`). Use for key calls to action and heritage highlights.
- **Secondary (Forest):** `#2c694e`. Used for nature-focused itineraries and ecological storytelling.
- **Backgrounds:** `#fff8f0` (`surface`) for day modes; `#1A1A1A` for high-impact hero sections.

### The "No-Line" Rule
To maintain a high-end editorial feel, **1px solid borders are prohibited** for sectioning. Structural boundaries must be defined through background shifts or white space:
- Use `surface_container_low` (`#faf3e9`) for subtle content grouping.
- Use `surface_container` (`#f4ede3`) to pull focus to a secondary content block.
- Transition from light surfaces to a `dark` section (`#1A1A1A`) to signal a major narrative shift (e.g., transitioning from "Places" to "Cultural History").

### Surface Hierarchy & Nesting
Treat the interface as physical layers of fine paper.
- **Base:** `surface` (`#fff8f0`).
- **Layer 1:** `surface_container_low` (`#faf3e9`) for the main content body.
- **Layer 2 (The Lift):** `surface_container_lowest` (`#ffffff`) for high-priority cards or "floating" itinerary modules.

### Glass & Gradient
To avoid a flat, "out-of-the-box" look:
- **Hero Glass:** Use semi-transparent `surface` colors with a `backdrop-blur` of 20px for navigation bars overlaying photography.
- **Signature Glow:** Apply a subtle linear gradient from `primary` (`#9a4601`) to `primary_container` (`#e07b39`) on main CTAs to give them a three-dimensional, "lit-from-within" quality.

---

## 3. Typography: Editorial Authority
We pair **Epilogue** (Display/Headline) with **Plus Jakarta Sans** (Body/Title) to balance heritage with modern legibility.

- **Display-LG (56px, Epilogue):** Reserved for hero titles. Use `-0.02em` letter spacing to feel "locked-in" and premium.
- **Headline-MD (28px, Epilogue):** For section headers. This is the "voice" of the region.
- **Title-LG (22px, Plus Jakarta Sans):** For card titles and itinerary names. Bold and welcoming.
- **Body-LG (16px, Plus Jakarta Sans):** The workhorse. Maintain a line height of `1.6` for long-form travel descriptions to ensure maximum readability.
- **Label-MD (12px, Plus Jakarta Sans):** All-caps with `0.1em` tracking for category tags (e.g., "TEMPLE", "WILDLIFE").

---

## 4. Elevation & Depth
Depth is achieved through **Tonal Layering**, not structural shadows.

- **The Layering Principle:** Place a `surface_container_lowest` card on a `surface_container_low` background. This creates a soft, natural lift that feels like physical paper.
- **Ambient Shadows:** Only use shadows for "floating" action elements (e.g., a sticky "Book Now" bar). Use a blur of `40px` at `6%` opacity, tinted with `#554339` (`on_surface_variant`) to mimic soft, warm sunlight.
- **Ghost Border Fallback:** If a border is required for accessibility, use `outline_variant` (`#dcc1b4`) at `20%` opacity. **Never use 100% opaque borders.**

---

## 5. Signature Components

### Cards (The "Vagadh Frame")
*   **Structure:** No borders. Use `surface_container_lowest` background.
*   **Spacing:** Use `spacing-5` (`1.7rem`) for internal padding.
*   **Visuals:** Images should have a subtle `xl` (`0.75rem`) corner radius.
*   **Content:** Forbid divider lines. Use `spacing-3` to separate the title from the metadata.

### Buttons (The "Saffron Path")
*   **Primary:** `primary` background with `on_primary` text. Use `full` roundedness for a modern, friendly feel.
*   **Secondary:** `surface_container_highest` background with `primary` text. No border.
*   **Interactions:** On hover, shift the background to a slightly darker tint; do not use "glow" effects.

### Navigation (The "Translucent Horizon")
*   Floating nav bar using Glassmorphism.
*   Background: `surface` at 80% opacity with `backdrop-filter: blur(12px)`.
*   Active state: A simple `primary` dot below the text, rather than a heavy underline.

### Destination Chips
*   Used for filtering regions.
*   Unselected: `surface_container_high` background.
*   Selected: `secondary` (`#2c694e`) background with `on_secondary` text.

---

## 6. Do’s and Don’ts

### Do
- **Do** use intentional asymmetry. Place a small caption offset from a large image to create visual interest.
- **Do** use the `24` (`8.5rem`) spacing token for major vertical gaps between different sections.
- **Do** treat photography as the primary UI element. The UI should "step back" and frame the images.

### Don't
- **Don't** use black (`#000000`) for text. Always use `on_surface` (`#1e1b16`) for a softer, premium feel.
- **Don't** use standard "Drop Shadows" on cards. Rely on tonal shifts (`surface` vs `surface_container`) to define shape.
- **Don't** use hard dividers. If you need to separate content, use a 24px vertical space or a change in background tone.
- **Don't** use generic iconography. Use thin-stroke, high-quality icons that match the `outline` token weight.