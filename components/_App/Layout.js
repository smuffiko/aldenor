import Head from "next/head"
import { Container } from "semantic-ui-react"
import Footer from "./Footer"
import HeadContent from "./HeadContent"
import Header from "./Header"

const Layout = ({ children, user }) => {
  return (
    <> 
      <Head>
        <HeadContent />
        <title>Aldenor - Founders of Aldenor</title>
      </Head>
      <div id="container">
        <div id="header"><Header user={user} /></div>
        <div id="body"><Container>{children}</Container></div>
        <div id="footer"><Footer /></div>
      </div>
    </>
  )
}
 
export default Layout