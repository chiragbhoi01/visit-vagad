# Visit Vagad

This is a [Next.js](https://nextjs.org) project integrated with [Appwrite](https://appwrite.io/) as a backend-as-a-service. It showcases dynamic content for destinations, events, food, hotels, and artisan products, managed via Appwrite databases and storage.

## Getting Started

First, ensure your Appwrite instance is set up and running, and your `.env` file is configured (see "Environment Variables" below).

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Appwrite Integration

This project uses Appwrite for:
-   **Databases:** Storing structured data for destinations, events, food, hotels, artisan products, and global settings.
-   **Storage:** Managing all media assets (images) in a single, consolidated bucket.
-   **Authentication:** (If implemented) User authentication and authorization.

### Key Changes Implemented:
-   **Single Media Bucket:** All images are now stored in one Appwrite storage bucket (`APPWRITE_BUCKET_ID_MEDIA`) for cost optimization and simpler management. Logical separation is achieved through file IDs and database relationships.
-   **Secure Environment Variables:** Environment variables are strictly separated into client-side (prefixed `NEXT_PUBLIC_`) and server-side variables, ensuring no secrets are exposed to the browser.
-   **Server Actions:** File uploads and deletions are handled securely via Next.js Server Actions, interacting directly with the Appwrite backend.

## Environment Variables

This project requires environment variables for both the Next.js frontend and interaction with your Appwrite backend.

A `.env` file is expected in the project root containing your Appwrite configuration. Refer to the `.env.production.example` file for a list of all required variables.

**Important:** For local development, populate your `.env` file. For production deployments (e.g., Vercel), configure these variables securely in your hosting provider's settings.

## Deployment

Detailed deployment instructions for both the Next.js frontend (on Vercel) and the Appwrite backend (self-hosted with Docker) can be found in `DEPLOYMENT.md`. This guide also includes a production go-live checklist and common deployment mistakes to avoid.

## Learn More

To learn more about Next.js and Appwrite, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
-   [Appwrite Docs](https://appwrite.io/docs) - explore Appwrite's features and APIs.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!