import Head from "next/head"
import { Container } from "semantic-ui-react"
import Footer from "./Footer"
import HeadContent from "./HeadContent"
import Header from "./Header"

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <HeadContent />
        <title>Aldenor - Founders of Aldenor</title>
      </Head>
      <Header />
      <Container>{children}</Container>
      <Footer />
    </>
  )
}
 
export default Layout