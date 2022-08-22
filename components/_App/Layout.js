import Head from "next/head"
import { Container, Message } from "semantic-ui-react"
import Footer from "./Footer"
import HeadContent from "./HeadContent"
import Header from "./Header"
import Cookie from "./Cookie"
import { BrowserView, MobileView } from "react-device-detect"

const Layout = ({ children, user }) => {
  return (
    <> 
      <Head>
        <HeadContent />
        <title>Aldenor - Founders of Aldenor</title>
      </Head>
      <div id="container">
        <MobileView>
          <Message
            icon="x"
            error
            header="Oops!"
            content="Sorry, your device is not currently supported."
          />
        </MobileView>
        <BrowserView>
          <div id="header"><Header user={user} /></div>
          <div id="body"><Container>{children}</Container></div>
          <div id="footer"><Footer /></div>
        </BrowserView>
      </div>
      <Cookie />
    </>
  )
}
 
export default Layout