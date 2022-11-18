import '../styles/globals.css'
import "../styles/nprogress.css"
import Layout from "../components/_App/Layout"
import { parseCookies, destroyCookie } from "nookies"
import { redirectUser } from "../utils/auth"
import baseUrl from "../utils/baseUrl"

function MyApp({ Component, pageProps, user }) {
  return (
    <>
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
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

  if(!token) {
    // not logged user - ban these paths
    if(
      ctx.pathname==="/adminTools"
      || ctx.pathname==="/characters"
      || ctx.pathname==="/game"
      || ctx.pathname==="/gameManag"
      || ctx.pathname==="/gameShop"
      || ctx.pathname==="/settings"
      || ctx.pathname==="/shop"
      || ctx.pathname==="/staffManag"
    )
      redirectUser(ctx,"/401")
  } else {
    // logged user
    const url = `${baseUrl}/api/account`
    await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      }
    }).then(async response => {
      if(!response.ok) {
        const er = await response.text()
        throw new Error(er)
      }
      return await response.json()
    }).then(async user => {
      pageProps.user = user

      // logged user but at pages confirm, signup or signin
      if(
        ctx.pathname==="/confirm"
        || ctx.pathname==="/signup"
        || ctx.pathname==="/signin"
      ) redirectUser(ctx,"/401")

      // unUser or banned cant go shop
      if(
        (
          ctx.pathname==="/shop"
          || ctx.pathname==="/gameShop"
        ) && (
          user.role === "unUser"
          || user.role === "ban"
        )
      )

      // only admin can go to adminTools
      if(
        ctx.pathname==="/adminTools"
        && user.role!=="admin"
      ) redirectUser(ctx,"/401")

      // only root can go to gameManag and staffManag
      if(
        ( ctx.pathname==="/gameManag"
        || ctx.pathname==="/staffManag")
        && user.role!=="root"
      ) redirectUser(ctx,"/401")

    }).catch(error => { 
      // 1) Throw out invalid token
      destroyCookie(ctx, 'token')
      // 2) Redirect to sign in
      redirectUser(ctx, "/signin")
    })
  }
  return { pageProps, user: pageProps.user }
}

export default MyApp
