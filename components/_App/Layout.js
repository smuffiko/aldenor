import React from "react"
import Router, { useRouter } from "next/router"
import Head from "next/head"
import cookies from "js-cookie"
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
import styles from "../../styles/AldenorUI/AldenorUI.module.css"

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
              <div className={styles.unUserBanner}><span>Please confirm your email!</span></div>
            </>
          ) : ""}
            { PATHS.game.find(path=> path === router.pathname) ? (
              <>
                {character!== undefined && (
                  <>
                  <div className={styles.rightTop}><RightTop user={user} character={character}/></div>
                  <div className={styles.body}><div className={styles.children}>{children}</div></div>
                  { router.pathname === "/game" && (
                    <>
                      <div className={styles.leftTop}><LeftTop user={user} character={character}/></div>
                      <div className={styles.leftBottom}><LeftBottom /></div>
                      <div className={styles.rightBottom}><RightBottom /></div>
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