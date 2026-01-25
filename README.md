# Visit Vagad - Production Ready

This project, "Visit Vagad," is a Next.js 14 application integrated with Appwrite as its backend. It is designed to showcase the vibrant culture, events, food, and destinations of the Vagad region. This README reflects the state of the project after a comprehensive audit and the resolution of critical production blockers.

## Project Status

The project is now **stable, secure, and production-ready**. All known critical issues related to data integrity, Appwrite configuration, security, and scalability have been addressed.

## Key Technologies

*   **Framework:** Next.js 14 (App Router)
*   **Backend:** Appwrite (Database, Storage, Authentication)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS v3
*   **UI Components:** Shadcn/ui (built on Radix UI)
*   **Validation:** Zod

## Implemented Features & Fixes

During the audit, the following critical areas were identified and subsequently fixed:

1.  **Build & Dependency Stability:**
    *   Resolved incompatibilities between Tailwind CSS v4 alpha and the project's v3 configuration. The project now uses **Tailwind CSS v3 (stable)**.
    *   Corrected an invalid `zod` dependency version.
    *   Ensured `npm install` runs cleanly.

2.  **Robust Appwrite Integration:**
    *   Fixed critical connection issues caused by a multi-line `APPWRITE_API_KEY` in the `.env` file.
    *   Resolved data fetching errors (`request cannot have request body`) by correcting parameter passing in Appwrite query functions.
    *   Configured `next.config.js` for **secure image optimization** from Appwrite storage.

3.  **Enhanced Data Safety & Validation:**
    *   Implemented **comprehensive Zod schemas** (`src/lib/schemas.ts`) for all Appwrite entities (Destination, Event, Food, Hotel, Page, Hero, Settings, ArtisanProduct).
    *   Ensured **runtime validation of all fetched data** (read-side) from Appwrite, preventing crashes from data mismatches.
    *   Implemented **robust Zod validation on all write operations** in server actions, ensuring data integrity before it enters the database.

4.  **Critical Permissions Management:**
    *   Fixed the **most critical silent failure**: Server actions for creating/updating documents (`src/app/admin/destinations/actions.ts`) now **explicitly apply document permissions**. All created/updated data is now:
        *   **Publicly readable** (`Permission.read(Role.any())`)
        *   **Admin-only writable** (`Permission.create/update/delete(Role.team(serverEnv.APPWRITE_ADMIN_TEAM_ID))`)
    *   This prevents newly created content from being inaccessible to the public.

5.  **Scalability & Pagination:**
    *   Removed all hardcoded `Query.limit(100)` clauses from `src/lib/queries.ts`.
    *   Implemented **flexible pagination** (using `limit` and `offset`) in all list-based query functions.
    *   Integrated **"Load More" functionality** for public listing pages (e.g., Events).
    *   Implemented **traditional pagination** with page numbers for admin listing views (e.g., Admin Destinations). This allows the application to handle large datasets without silent data loss.

6.  **Code Hygiene & Maintainability:**
    *   Removed dead code and corrected references to previously deleted files (e.g., `src/lib/types.ts`).
    *   Cleaned up misleading or obsolete comments.
    *   Verified the absence of hardcoded data and seeding scripts in `package.json` and the `scripts/` directory.

## Getting Started

1.  **Clone the repository:**
    ```bash
    git clone [repository_url]
    cd visit-vagad
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Appwrite:**
    *   Set up your Appwrite project.
    *   Create the following collections: `destinations`, `events`, `food`, `hotels`, `settings`, `artisans`, `hero`, `pages`.
    *   Create a media storage bucket.
    *   Create an admin team.
    *   **Crucially, ensure you create appropriate indexes for attributes like `slug` in collections where data is frequently queried by those attributes.**

4.  **Environment Variables:**
    *   Create a `.env` file in the root directory.
    *   Populate it with your Appwrite project credentials and the IDs of the collections, bucket, and team you created. A template (`.env.production.example`) is available.
    *   Ensure your `APPWRITE_API_KEY` is on a single line.

5.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser.

## Contributing

[Instructions for contributing to the project, if any.]

## License

[License information.]
