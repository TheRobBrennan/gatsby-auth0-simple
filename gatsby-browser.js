// ./gatsby-browser.js
import React from "react"
import { silentAuth } from "./src/utils/auth"

// We are going to wrap the application's root element to implement all of the logic necessary for calling silentAuth

// KNOWN ISSUE: If you used Google to sign in to your application, this will not work in development mode. Silent auth does not work with the Google test keys provided by Auth0 for development. To fix this, please see the instructions at https://auth0.com/docs/connections/social/google
class SessionCheck extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
    }
  }

  handleCheckSession = () => {
    this.setState({ loading: false })
  }

  componentDidMount() {
    silentAuth(this.handleCheckSession)
  }

  render() {
    return (
      this.state.loading === false && (
        <React.Fragment>{this.props.children}</React.Fragment>
      )
    )
  }
}

export const wrapRootElement = ({ element }) => {
  return <SessionCheck>{element}</SessionCheck>
}