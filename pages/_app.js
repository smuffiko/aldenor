import '../styles/globals.css'
import "../styles/nprogress.css"
import Layout from "../components/_App/Layout"

function MyApp({ Component, pageProps }) {
  return (
    <Layout {...pageProps}>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
