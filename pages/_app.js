import '../styles/globals.css'
import "../styles/nprogress.css"
import Layout from "../components/_App/Layout"
import Cookie from '../components/_App/Cookie'

function MyApp({ Component, pageProps }) {
  
  return (
    <>
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
      <Cookie />
    </>
  )
}

export default MyApp

export const getServerSideProps = async()=> {


  return { pageProps: { } }
}
