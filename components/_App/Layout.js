import React from "react"
import Router, { useRouter } from "next/router"
import NProgress from "nprogress"
import Head from "next/head"
import { Container, Message } from "semantic-ui-react"
import Footer from "./Footer"
import HeadContent from "./HeadContent"
import Header from "./Header"
import Cookie from "./Cookie"
import { isDesktop, isMobile, isSmartTV, isWearable, isConsole} from "react-device-detect"
import LeftTop from "./Corners/LeftTop"
import RightTop from "./Corners/RightTop"
import LeftBottom from "./Corners/LeftBottom"
import RightBottom from "./Corners/RightBottom"

const PATHS = {
  main: [
    "/401",
    "/404",
    "/",
    "/characters",
    "/confirm",
    "/contact",
    "/privacy",
    "/settings",
    "/shop",
    "/signup",
    "/signin",
    "/terms"
  ],
  game: [
    "/adminTools",
    "/game",
    "/gameManag",
    "/gameShop",
    "/ticket",
    "/staffManag"
  ]
}

const Layout = ({ children, user, character }) => {
  Router.events.on("routeChangeStart", ()=> NProgress.start())
  Router.events.on("routeChangeComplete", ()=> NProgress.done())
  Router.events.on("routeChangeError", ()=> NProgress.done())

  const [desktop, setDesktop] = React.useState()
  const [unsupported, setUnsupported] = React.useState()
  const router = useRouter()

  React.useEffect(()=>{
    setDesktop(isDesktop)
  },[setDesktop])

  React.useEffect(()=>{
    setUnsupported(isMobile || isSmartTV || isWearable || isConsole)
  },[setUnsupported])

  return (
    <> 
      <Head>
        <HeadContent />
        <title>Aldenor - Founders of Aldenor</title>
      </Head>
      <div id="container">
        {desktop && (
          <>
          {user ? user.role==="unUser" && (
            <>
              <div className="unuser-banner"><span>Please confirm your email!</span></div>
            </>
          ) : ""}
            { PATHS.game.find(path=> path === router.pathname) ? (
              <>
                {character!== undefined && (
                  <>
                  <div className="game-corner-r-t"><RightTop user={user} character={character}/></div>
                  <div className="game"><div>{children}</div></div>
                  { router.pathname === "/game" && (
                    <>
                      <div className="game-corner-l-t"><LeftTop user={user} character={character}/></div>
                      <div className="game-corner-l-b"><LeftBottom /></div>
                      <div className="game-corner-r-b"><RightBottom /></div>
                    </>
                  )}
                </>
                )}
              </>
            ) : (
              <>
                <div id="header"><Header user={user} /></div>
                <div id="body"><Container>{children}</Container></div>
                <div id="footer"><Footer /></div>
              </>
            )
          }
          </>
        )} 
        {unsupported && (
          <Message
            icon="x"
            error
            header="Oops!"
            content="Sorry, your device is not currently supported."
          />
        )}
      </div>
      {desktop && <Cookie />}
    </>
  )
}
 
export default Layout