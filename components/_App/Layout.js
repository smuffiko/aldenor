import React from "react"
import Head from "next/head"
import { Container, Message } from "semantic-ui-react"
import Footer from "./Footer"
import HeadContent from "./HeadContent"
import Header from "./Header"
import Cookie from "./Cookie"
import { isDesktop, isMobile, isSmartTV, isWearable, isConsole} from "react-device-detect"
import LeftTop from "./LeftTop"
import RightTop from "./RightTop"
import LeftBottom from "./LeftBottom"
import RightBottom from "./RightBottom"
import uiStyles from "../../styles/AldenorUI/AldenorUI.module.css"


const Layout = ({ children, user }) => {
  const [desktop, setDesktop] = React.useState()
  const [unsupported, setUnsupported] = React.useState()

  /**
  * 0 = basic
  * 1 = test Tesak's layout
  */
  const testLayout = 1

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
            {testLayout === 1 ? (
              <>
                <div className={uiStyles.leftTop}><LeftTop /></div>
                <div className={uiStyles.rightTop}><RightTop /></div>
                <div className={uiStyles.body}>body</div>
                <div className={uiStyles.leftBottom}><LeftBottom /></div>
                <div className={uiStyles.rightBottom}><RightBottom /></div>
              </>
            ) : testLayout === 0 && (
              <>
                <div id="header"><Header user={user} /></div>
                <div id="body"><Container>{children}</Container></div>
                <div id="footer"><Footer /></div>
              </>
            )}
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