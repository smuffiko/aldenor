import React from "react"
import Head from "next/head"
import { Container, Message } from "semantic-ui-react"
import Footer from "./Footer"
import HeadContent from "./HeadContent"
import Header from "./Header"
import Cookie from "./Cookie"
import { BrowserView, MobileView, isMobile } from "react-device-detect"

const Layout = ({ children, user, mobile }) => {

  return (
    <> 
      <Head>
        <HeadContent />
        <title>Aldenor - Founders of Aldenor</title>
      </Head>
      <div id="container">
        {mobile ? (
          <Message
            icon="x"
            error
            header="Oops!"
            content="Sorry, your device is not currently supported."
          />
        ) : (
          <>
            <div id="header"><Header user={user} /></div>
            <div id="body"><Container>{children}</Container></div>
            <div id="footer"><Footer /></div>
          </>
        )}
      </div>
      <Cookie />
    </>
  )
}

export const getServerSideProps = async(ctx)=> {
  const UA = ctx.req.headers['user-agent']
  const mobile = Boolean(UA.match(
    /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
  ))

  return { props: { mobile: mobile }}
}
 
export default Layout