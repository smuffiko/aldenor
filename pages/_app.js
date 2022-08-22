import '../styles/globals.css'
import "../styles/nprogress.css"
import Layout from "../components/_App/Layout"
import Cookie from '../components/_App/Cookie'
import { parseCookies, destroyCookie } from "nookies"
import { redirectUser } from "../utils/auth"
import { isMobile } from "react-device-detect"
import baseUrl from "../utils/baseUrl"

function MyApp({ Component, pageProps }) {
  
  return (
    <>
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
      <Cookie />
    </>
  )
}

MyApp.getInitialProps = async({ ctx })=> { 
  // wrong url -> redirect to aldenor.vercel.app
  if(ctx.req) {
    const host = ctx.req.headers.host
    if(process.env.NODE_ENV === "production"
      && host !== "aldenor.vercel.app"
    ) redirectUser(ctx, "https://aldenor.vercel.app")
  }

  // isMobile = redirect to not supported device (todo later)
  if(isMobile && ctx.pathname!=="/400") {
    redirectUser(ctx, `${baseUrl}/400`)
  }
  
  const pageProps = {}
  const { token } = parseCookies(ctx)

  return { pageProps }
}

export default MyApp
