// src/pages/account.js
import React from "react"
import { Router } from "@reach/router"
import { Link } from "gatsby"

const Home = () => <p>Home</p>
const Settings = () => <p>Settings</p>
const Billing = () => <p>Billing</p>

const Account = () => (
  <>
    <nav>
      <Link to="/account">Home</Link>{" "}
      <Link to="/account/settings">Settings</Link>{" "}
      <Link to="/account/billing">Billing</Link>{" "}
    </nav>
    <Router>
      <Home path="/account" />
      <Settings path="/account/settings" />
      <Billing path="/account/billing" />
    </Router>
  </>
)

export default Account