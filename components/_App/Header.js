import Router from "next/router"
import Link from "next/link"
import { Menu, Container, Icon } from "semantic-ui-react"
import { handleLogout } from "../../utils/auth"
import AldenorIcon from "./AldenorUIComponents/AldenorIcon"

const Header = ({ user }) => {
  const isLogged = Boolean(user)
  
  const isActive = route => route === Router.pathname

  return (
    <>
      <Menu
        color="black"
        inverted
        className="navbar-bg"
      >
        <Container className="navbar">
          <Link href="/" passHref>
            <Menu.Item header active={isActive("/")}>
              <AldenorIcon name="tower" size="nm" color="white"/>
              Home
            </Menu.Item>
          </Link>
          {!isLogged ? ( // not logged user
          <>
            <Link href="/signup" passHref>
              <Menu.Item header active={isActive("/signup")}>
                <Icon name="signup"/>
                Sign Up
              </Menu.Item>
            </Link>
            <Link href="/signin" passHref>
              <Menu.Item header active={isActive("/signin")}>
                <Icon name="sign in"/>
                Sign In
              </Menu.Item>
            </Link>
          </>) : (  // logged user
          <>
            {/* everyone logged can log to the game via character (even banned user, they can make ticket with their nickname) */}  
            <Link href="/characters" passHref>
              <Menu.Item header active={isActive("/characters")}>
              <AldenorIcon name="sword" size="nm" color="white"/>
                Play
              </Menu.Item>
            </Link>
            {/* everyone can see shop */}
            <Link href="/shop" passHref>
              <Menu.Item header active={isActive("/shop")}>
              <AldenorIcon name="crystal" size="nm" color="white"/>
                Shop
              </Menu.Item>
            </Link>
            {/* everyone can see settings */}
            <Link href="/settings" passHref>
              <Menu.Item header active={isActive("/settings")}>
              <AldenorIcon name="settings" size="nm" color="white"/>
                Settings
              </Menu.Item>
            </Link>
            {/* everyone logged in can log out, ofc */}
            <Menu.Item header onClick={handleLogout}>
              <AldenorIcon name="logout" size="nm" color="white"/>
              Logout
            </Menu.Item>
          </>)}
        </Container>
      </Menu>
    </>
  )
}
 
export default Header