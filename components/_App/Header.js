import Router from "next/router"
import Link from "next/link"
import NProgress from "nprogress"
import { Menu, Container, Icon } from "semantic-ui-react"
import { handleLogout } from "../../utils/auth"

const Header = ({ user }) => {
  Router.events.on("routeChangeStart", ()=> NProgress.start())
  Router.events.on("routeChangeComplete", ()=> NProgress.done())
  Router.events.on("routeChangeError", ()=> NProgress.done())

  const isLogged = Boolean(user)
  const isBan = user && user.role==="ban"
  const isUnUser = user && user.role==="unUser"
  const isUser = user && user.role==="user" // in case i will
  const isMod = user && user.role==="mod"   // need it anytime
  const isAdmin = user && user.role==="admin"
  const isRoot = user && user.role==="root"
  
  const isActive = route => route === Router.pathname

  return (
    <>
      <Menu
        color="black"
        inverted
      >
        <Container>
          <Link href="/" passHref>
            <Menu.Item header active={isActive("/")}>
              <Icon name="home"/>
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
            {!(isBan||isRoot) && (  // everyone logged except banned user and root can see /game
              <Link href="/game" passHref>
                <Menu.Item header active={isActive("/game")}>
                  <Icon name="game"/>
                  Game
                </Menu.Item>
              </Link>
            )}
            {!(isBan||isUnUser) && (  // everyone logged except banned user and unconfirmed user can see /shop
              <Link href="/shop" passHref>
              <Menu.Item header active={isActive("/shop")}>
                <Icon name="cart"/>
                Shop
              </Menu.Item>
              </Link>
            )}
            {/* everyone can see settings */}
            <Link href="/settings" passHref>
              <Menu.Item header active={isActive("/settings")}>
                <Icon name="settings"/>
                Settings
              </Menu.Item>
            </Link>
            {!isRoot && ( // everyone logged except root can see tickets
              <Link href="/ticket" passHref>
              <Menu.Item header active={isActive("/ticket")}>
                <Icon name="help"/>
                Ticket
              </Menu.Item>
              </Link>
            )}
            {isAdmin && ( // only admin can see admin tools
              <Link href="/adminTools" passHref>
                <Menu.Item header active={isActive("/adminTools")}>
                  <Icon name="settings"/>
                  Admin Tools
                </Menu.Item>
              </Link>
            )}
            {isRoot && ( // only root can see game & staff management
              <>
                <Link href="/gameManag" passHref>
                  <Menu.Item header active={isActive("/gameManag")}>
                    <Icon name="settings"/>
                    Game Management
                  </Menu.Item>
                </Link>
                <Link href="/staffManag" passHref>
                  <Menu.Item header active={isActive("/staffManag")}>
                    <Icon name="settings"/>
                    Staff Management
                  </Menu.Item>
                </Link>
              </>
            )}
            <Menu.Item header onClick={handleLogout}>
                  <Icon name="log out" />
              Logout
            </Menu.Item>
          </>)}
        </Container>
      </Menu>
    </>
  )
}
 
export default Header