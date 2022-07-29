import Link from "next/link"
import { Menu, Container, Icon } from "semantic-ui-react"

const Header = () => {
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
          <Link href="/" passHref>
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