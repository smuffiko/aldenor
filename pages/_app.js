import "../styles/sass/index.scss"
import Layout from "../components/_App/Layout"
import { parseCookies, destroyCookie } from "nookies"
import { redirectUser } from "../utils/auth"
import baseUrl from "../utils/baseUrl"

function MyApp({ Component, pageProps }) {
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
  const { token, charId } = parseCookies(ctx)
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
      || ctx.pathname==="/ticket"
    )
      redirectUser(ctx,"/401")
  } else {
    //logged user
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
    }).catch(error => { 
      // 1) Throw out invalid token
      destroyCookie(ctx, 'token')
      // 2) Redirect to sign in
      redirectUser(ctx, "/signin")
    })

    // logged user but at pages confirm, signup, signin or lostPw
    if(
      ctx.pathname==="/confirm"
      || ctx.pathname==="/signup"
      || ctx.pathname==="/signin"
      || ctx.pathname==="/lostPw"
    ) redirectUser(ctx,"/401")

    if(charId===undefined) {
      // logged user but not logged via character
      // ban pages where you need charId
      if(
        ctx.pathname==="/adminTools"
        || ctx.pathname==="/game"
        || ctx.pathname==="/gameManag"
        || ctx.pathname==="/gameShop"
        || ctx.pathname==="/staffManag"
        || ctx.pathname==="/ticket"
      ) redirectUser(ctx,"/characters")
    } else {
      // logged user (in game) with character

      // user token is set but he is not in game, then destroy cookie charId
      if(!(
        ctx.pathname==="/adminTools"
        || ctx.pathname==="/game"
        || ctx.pathname==="/gameManag"
        || ctx.pathname==="/gameShop"
        || ctx.pathname==="/staffManag"
        || ctx.pathname==="/ticket")
      ) destroyCookie(ctx, 'charId')
      else {
        const url = `${baseUrl}/api/character?charToken=${charId}`
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
        }).then(async data => {
          pageProps.character = data.character

          // unUser or banned cant go shop
          if(
            (
              ctx.pathname==="/shop"
              || ctx.pathname==="/gameShop"
            ) && (
              pageProps.user.role === "unUser"
              || pageProps.user.role === "ban"
            )
          ) redirectUser(ctx,"/401")
          
          // only admin can go to adminTools
          if(
            ctx.pathname==="/adminTools"
            && pageProps.character.role!=="admin"
          ) redirectUser(ctx,"/401")

          // only root can go to gameManag and staffManag
          if(
            ( ctx.pathname==="/gameManag"
            || ctx.pathname==="/staffManag")
            && pageProps.character.role!=="root"
          ) redirectUser(ctx,"/401")

        }).catch(error => { 
          // 1) Throw out invalid token
          destroyCookie(ctx, 'token')
          destroyCookie(ctx, 'charId')
          // 2) Redirect to sign in
          redirectUser(ctx, "/signin")
        })
      }
    }
  }
  return { pageProps }
}

export default MyApp
