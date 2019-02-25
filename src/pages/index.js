import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import CRUD from './../components/CRUD'

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <h1>Hi people</h1>
    <CRUD />
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
)

export default IndexPage
