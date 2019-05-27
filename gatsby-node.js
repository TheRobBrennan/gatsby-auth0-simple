// ./gatsby-node.js
// Implement the Gatsby API “onCreatePage”. This is
// called after every page is created.
exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions

  // Let's define a client-only route. This is where we can tap into
  // Gatsby's server-side build pipeline and customize how it works.

  // page.matchPath is a special key that's used for matching pages
  // only on the client.
  if (page.path.match(/^\/account/)) {
    // This means we should be able to use client-side navigation under any /account/* path
    //  e.g. localhost:8000/account/billing, localhost:8000/account/orders
    page.matchPath = "/account/*"

    // Update the page.
    createPage(page)
  }
}

// Ignore auth0-js during the server-side build since it relies on browser APIs like window
exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html") {
    /*
     * During the build step, `auth0-js` will break because it relies on
     * browser-specific APIs. Fortunately, we don’t need it during the build.
     * Using Webpack’s null loader, we’re able to effectively ignore `auth0-js`
     * during the build. (See `src/utils/auth.js` to see how we prevent this
     * from breaking the app.)
     */
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /auth0-js/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}