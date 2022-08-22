import React from "react"
import Head from "next/head"
import { Container, Message } from "semantic-ui-react"
import Footer from "./Footer"
import HeadContent from "./HeadContent"
import Header from "./Header"
import Cookie from "./Cookie"
import { isBrowser } from "react-device-detect"


const Layout = ({ children, user }) => {
  const [browser, setBrowser] = React.useState()
  React.useEffect(()=>{
    setBrowser(isBrowser)
  },[setBrowser])
  return (
    <> 
      <Head>
        <HeadContent />
        <title>Aldenor - Founders of Aldenor</title>
      </Head>
      <div id="container">
        {browser ? (
          <>
            <div id="header"><Header user={user} /></div>
            <div id="body"><Container>{children}</Container></div>
            <div id="footer"><Footer /></div>
          </>
        ) : (
          <Message
            icon="x"
            error
            header="Oops!"
            content="Sorry, your device is not currently supported."
          />
        )}
      </div>
      {browser && <Cookie />}
    </>
  )
}
 
export default Layout