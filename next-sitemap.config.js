/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://omar-ibrahim.com',
    generateRobotsTxt: true, // (optional)
  generateIndexSitemap: false,
  sitemapSize: 1000,
    // ...other options
}
