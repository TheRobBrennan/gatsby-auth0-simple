// src/utils/auth.js
import auth0 from "auth0-js"
import { navigate } from "gatsby"

const isBrowser = typeof window !== "undefined"

const auth = isBrowser
  ? new auth0.WebAuth({
      domain: process.env.AUTH0_DOMAIN,
      clientID: process.env.AUTH0_CLIENTID,
      redirectUri: process.env.AUTH0_CALLBACK,
      responseType: "token id_token",
      scope: "openid profile email",
    })
  : {}

  const tokens = {
    accessToken: false,
    idToken: false,
    expiresAt: false,
  }

  let user = {}

  export const isAuthenticated = () => {
    if (!isBrowser) {
      return;
    }

    return localStorage.getItem("isLoggedIn") === "true"
  }

  export const login = () => {
    if (!isBrowser) {
      return
    }

    auth.authorize()
  }

  const setSession = (cb = () => {}) => (err, authResult) => {
    if (err) {
      navigate("/")
      cb()
      return
    }

    if (authResult && authResult.accessToken && authResult.idToken) {
      let expiresAt = authResult.expiresIn * 1000 + new Date().getTime()
      tokens.accessToken = authResult.accessToken
      tokens.idToken = authResult.idToken
      tokens.expiresAt = expiresAt
      user = authResult.idTokenPayload
      localStorage.setItem("isLoggedIn", true)
      navigate("/account")
      cb()
    }
  }

  export const handleAuthentication = () => {
    if (!isBrowser) {
      return;
    }

    auth.parseHash(setSession())
  }

  export const getProfile = () => {
    return user
  }

  // When the user refreshes the page, the isLoggedFlag in local storage indicates they are logged in, but we do not have any user profile or token information available. Storing these credentials in local storage is bad practice. We do have a checkSession function we can use from Auth0 that will check if a user is logged in and return valid tokens and user profile information for use in the application without requiring user interaction. Neat, huh?
  export const silentAuth = callback => {
    if (!isAuthenticated()) return callback()
    auth.checkSession({}, setSession(callback))
  }

  export const logout = () => {
    localStorage.setItem("isLoggedIn", false)
    auth.logout()
  }