# Production Deployment Guide for Visit Vagad

This guide provides the steps to deploy the Visit Vagad project to a production environment. It covers the backend (Appwrite) and frontend (Next.js).

## Part 1: Frontend Deployment (Vercel)

The frontend is a Next.js application and is optimized for deployment on Vercel.

### Step 1: Push to a Git Repository

Push your project code to a Git provider supported by Vercel (GitHub, GitLab, or Bitbucket).

### Step 2: Import Project on Vercel

1.  Log in to your Vercel account.
2.  Click **Add New...** > **Project**.
3.  Select the Git repository you just pushed your code to.
4.  Vercel will automatically detect that it's a Next.js project and configure the build settings. The default settings should be correct.

### Step 3: Configure Environment Variables

This is the most critical step. You must add all the environment variables from your `.env.production.example` file to Vercel's environment variable settings.

1.  In the Vercel project settings, navigate to **Settings** > **Environment Variables**.
2.  Add each variable from `.env.production.example` one by one.
    *   **Public Variables:** `NEXT_PUBLIC_APPWRITE_ENDPOINT`, `NEXT_PUBLIC_APPWRITE_PROJECT_ID`. These can be added as plain text.
    *   **Secret Variables:** All other variables (like `APPWRITE_API_KEY`, `APPWRITE_DATABASE_ID`, etc.) are secrets. When adding them, **ensure they are configured as "Secret" variables in Vercel.** This prevents them from being exposed to the browser.
3.  Make sure the **Production** environment is selected for all variables.

### Step 4: Deploy

1.  After configuring the environment variables, go to the **Deployments** tab.
2.  Trigger a new deployment for the `main` (or `master`) branch.
3.  Vercel will build and deploy your application. Once complete, you will be provided with a production URL.

---

## Part 2: Backend Deployment (Appwrite on Docker)

The Appwrite backend can be self-hosted on any Virtual Private Server (VPS) that supports Docker.

### Step 1: Get a VPS and Install Docker

1.  Provision a VPS from a cloud provider (e.g., DigitalOcean, Linode, AWS Lightsail, Hetzner). A server with 2 CPU cores and 4GB of RAM is a good starting point.
2.  Follow your provider's instructions to SSH into your server.
3.  Install Docker and Docker Compose. You can follow the [official Docker installation script](https://docs.docker.com/engine/install/ubuntu/#install-using-the-convenience-script).

### Step 2: Install and Configure Appwrite

1.  On your server, run the official Appwrite installation command:
    ```bash
    docker run -it --rm \
        --volume /var/run/docker.sock:/var/run/docker.sock \
        --volume "$(pwd)"/appwrite:/usr/src/code/appwrite:rw \
        --entrypoint="install" \
        appwrite/appwrite:1.5.7
    ```
    This will create a `docker-compose.yml` file and an `.env` file in a new `appwrite` directory.

2.  **Configure for Production:** `cd` into the `appwrite` directory and edit the `.env` file:
    *   Find the `_APP_ENV` variable and make sure it is set to `production`.
      ```
      _APP_ENV=production
      ```
    *   It is recommended to disable open-source telemetry for production environments. Find `_APP_OPEN_SOURCE_TELEMETRY` and set it to `disabled`.
      ```
      _APP_OPEN_SOURCE_TELEMETRY=disabled
      ```

### Step 3: Run Appwrite

1.  From within the `appwrite` directory, start the Appwrite services in the background:
    ```bash
    docker-compose up -d
    ```
2.  The first run may take a few minutes to download all the container images. You can check the status with `docker-compose ps`.

### Step 4: Initial Appwrite Setup & CORS

1.  Navigate to your server's IP address in a web browser. You will see the Appwrite console sign-up page. Create your admin account.
2.  Create a new Project, naming it "Visit Vagad" or similar.
3.  **Crucial for Security:** Go to your new project's settings page. Under **Platforms**, add a **New Web Platform**.
    *   **Name:** Vercel App
    *   **Hostname:** Your Vercel production domain (e.g., `visit-vagad-prod.vercel.app` or your custom domain).
    *   This step is essential for CORS. It tells Appwrite to only accept API requests from your deployed frontend.

### Step 5: Gather IDs and Secrets

You will now find all the IDs and secrets needed for your Next.js frontend's environment variables inside your new Appwrite project console.
*   **Project ID:** On the settings page.
*   **Database ID, Collection IDs, Bucket IDs:** Create these according to your application's needs. The IDs you choose must match the ones you set in the Vercel environment variables.
*   **API Key:** Go to the **API Keys** section and create a new key. Give it the necessary scopes (e.g., `databases.read`, `documents.read`, etc.).
*   **Team ID:** Go to the **Teams** section, create an "Admins" team, and get its ID.

Populate the Vercel environment variables with these new values.

---

## Part 3: Production Go-Live Checklist

Before announcing your site to the world, run through this checklist on your production URLs.

### Appwrite Configuration
- [ ] **Environment:** Appwrite `_APP_ENV` is set to `production`.
- [ ] **CORS:** The production frontend URL (e.g., `www.visitvagad.com`) is listed as a web platform in the Appwrite project settings.
- [ ] **Admin Team:** An 'Admins' team exists and its ID is correctly set in the Vercel `APPWRITE_ADMIN_TEAM_ID` environment variable.
- [ ] **Email/SMTP:** Appwrite's email service is configured for password resets and other user-facing emails (if applicable).

### Appwrite Permissions
- [ ] **Collections:** Double-check the permissions for each collection. Most should be **Public Read** and **Admin-Only** for write operations (create, update, delete).
- [ ] **Buckets:** Double-check permissions for each storage bucket. Most should be **Public Read** and **Admin-Only** for write operations.

### Vercel Configuration
- [ ] **Public Variables:** `NEXT_PUBLIC_APPWRITE_ENDPOINT` and `NEXT_PUBLIC_APPWRITE_PROJECT_ID` are correct.
- [ ] **Secret Variables:** All `APPWRITE_*` secret keys and IDs are present and marked as "Secret".
- [ ] **Redeployed:** The Vercel project has been redeployed after the final environment variables were set.

### Functional Testing
- [ ] **Admin Access:** Can you log in as an admin user on the production site?
- [ ] **CRUD Operations:** As an admin, can you create, read, update, and delete a destination?
- [ ] **Public Data:** Do the public-facing pages (destinations, events, etc.) load and display data correctly for a logged-out user?
- [ ] **Image Uploads:** As an admin, can you upload an image, and does it display correctly on the public site?

### Domain & DNS
- [ ] **Custom Domain:** (If applicable) Your custom domain is correctly pointed to your Vercel deployment.
- [ ] **Appwrite Hostname Update:** If you added a custom domain, have you updated the hostname in the Appwrite project's web platform settings?

---

## Part 4: Common Deployment Mistakes to Avoid

- **Committing Secret Keys:** Never commit your `.env.production.local` file or any other file containing secrets to your Git repository. Use the `.gitignore` file to prevent this. Secrets should only be stored in your deployment platform's secure environment variable manager (like Vercel).
- **Mismatched Environment Variables:** A typo in an environment variable name between your Vercel settings and your Appwrite setup is a common source of errors. Double-check every variable.
- **Incorrect CORS Configuration:** Forgetting to add your Vercel production URL (and any custom domain) to the Appwrite project's "Platforms" list is the #1 cause of "Network Error" or "Failed to fetch" issues in the browser console.
- **Insufficient Appwrite Permissions:** If your site is missing data that you know exists, the cause is often overly restrictive permissions on an Appwrite collection or storage bucket. Ensure "Role: Any" has "Read" access for public content.
- **Forgetting to Redeploy on Vercel:** When you change an environment variable in the Vercel dashboard, it does **not** apply to existing deployments. You must trigger a new deployment to have the new variables take effect.
- **Using `localhost` in Production:** Ensure that all environment variables, especially `NEXT_PUBLIC_APPWRITE_ENDPOINT` and `APPWRITE_ENDPOINT`, point to your public, production Appwrite server URL, not `http://localhost/v1`.
