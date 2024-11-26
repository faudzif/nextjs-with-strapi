module.exports = ({ env }) => ({
  seo: {
    enabled: true,
  },
  "rest-cache": {
    config: {
      provider: {
        name: "memory", // Use in-memory caching
        options: {
          max: 500, // Maximum number of items to cache (optional)
          maxAge: 60000, // Cache expiration time in milliseconds (optional)
        },
      },
      strategy: {
        contentTypes: [
          {
            contentType: "api::article.article", // The content type to cache (adjust as needed)
            maxAge: 3600, // Cache duration in seconds
            hitpass: false, // Whether to bypass cache on cache hit (optional)
          },
          {
            contentType: "api::global.global",
            maxAge: 3600,
            hitpass: false,
          },
          {
            contentType: "api::rides-and-attraction.rides-and-attraction",
            maxAge: 3600,
            hitpass: false,
          },
          {
            contentType: "api::page.page",
            maxAge: 3600,
            hitpass: false,
          },
        ],
      },
    },
  },
});