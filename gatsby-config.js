module.exports = {
  siteMetadata: {
    title: "sheetpoetry.xyz",
    siteUrl: "https://sheetpoetry.xyz",
    description: "This is a GraphQL API to generate poems from randomly selected cells on a Google spreadsheet",
    repo: "https://github.com/piducancore/sheetpoetry.xyz",
  },
  plugins: [
    "gatsby-plugin-catch-links",
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        defaultLayouts: {
          default: require.resolve("./src/components/layout.js"),
        },
      },
    },
    "gatsby-plugin-theme-ui",
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `sheetpoetry.xyz`,
        short_name: `sheetpoetry`,
        start_url: `/`,
        background_color: `#FFFFFF`,
        theme_color: `#D90368`,
        display: `minimal-ui`,
        icon: `static/images/icon.svg`, // This path is relative to the root of the site.
      },
    },
  ],
};
