import '../styles/globals.css'
import "../styles/nprogress.css"
import Layout from "../components/_App/Layout"
import Cookie from '../components/_App/Cookie'
import { parseCookies, destroyCookie } from "nookies"
import { redirectUser } from "../utils/auth"
import { BrowserView, MobileView } from "react-device-detect"
import { Message } from "semantic-ui-react"

function MyApp({ Component, pageProps }) {
  
  return (
    <>
      <BrowserView>
        <Layout {...pageProps}>
          <Component {...pageProps} />
        </Layout>
        <Cookie />
      </BrowserView>
      <MobileView>
        <Message
          icon="x"
          error
          header="Oops!"
          content="Sorry, your device is not currently supported."
        />
      </MobileView>
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
  
  const pageProps = {}
  const { token } = parseCookies(ctx)

  return { pageProps }
}

export default MyApp
