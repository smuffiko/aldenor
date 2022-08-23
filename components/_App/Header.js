import Router from "next/router"
import Link from "next/link"
import NProgress from "nprogress"
import { Menu, Container, Icon } from "semantic-ui-react"

const Header = ({ user }) => {
  Router.events.on("routeChangeStart", ()=> NProgress.start())
  Router.events.on("routeChangeComplete", ()=> NProgress.done())
  Router.events.on("routeChangeError", ()=> NProgress.done())

  

  return (
    <>
      <Menu
        color="black"
        inverted
      >
        <Container>
          <Link href="/" passHref>
            <Menu.Item>
              <Icon name="home"/>
              Home
            </Menu.Item>
          </Link>
          <Link href="/signup" passHref>
            <Menu.Item>
              <Icon name="signup"/>
              Sign Up
            </Menu.Item>
          </Link>
          <Link href="/signin" passHref>
            <Menu.Item>
              <Icon name="sign in"/>
              Sign In
            </Menu.Item>
          </Link>
        </Container>
      </Menu>
    </>
  )
}
 
export default Header