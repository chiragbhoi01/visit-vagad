// file: next.config.js
/** @type {import('next').NextConfig} */
const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
    // The 'reactStrictMode' is true by default and a good practice.
    // The app is now configured for a standard server-based deployment,
    // which is required for the internationalization features to work.
};

module.exports = withNextIntl(nextConfig);