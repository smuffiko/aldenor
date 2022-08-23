import Router from "next/router"
import Link from "next/link"
import NProgress from "nprogress"
import { Menu, Container, Icon } from "semantic-ui-react"

const Header = ({ user }) => {
  Router.events.on("routeChangeStart", ()=> NProgress.start())
  Router.events.on("routeChangeComplete", ()=> NProgress.done())
  Router.events.on("routeChangeError", ()=> NProgress.done())

  const isLogged = Boolean(user)
  const isBan = user && user.role==="ban"
  const isUnUser = user && user.role==="unUser"
  const isUser = user && user.role==="user"
  const isMod = user && user.role==="mod"
  const isAdmin = user && user.role==="admin"
  const isRoot = user && user.role==="root"

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
          {!isLogged ? ( // not logged user
          <>
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
          </>) : (  // logged user
          <>  
            {!(isBan||isRoot) && (  // everyone logged except banned user and root can see /game
              <Link href="/game" passHref>
                <Menu.Item>
                  <Icon name="sign in"/>
                  Game
                </Menu.Item>
              </Link>
            )}
            {!(isBan||isUnUser) && (  // everyone logged except banned user and unconfirmed user can see /shop
              <Link href="/shop" passHref>
              <Menu.Item>
                <Icon name="sign in"/>
                Shop
              </Menu.Item>
              </Link>
            )}
            {/* everyone can see settings */}
            <Link href="/settings" passHref>
              <Menu.Item>
                <Icon name="sign in"/>
                Settings
              </Menu.Item>
            </Link>
            {!isRoot && ( // everyone logged except root can see tickets
              <Link href="/ticket" passHref>
              <Menu.Item>
                <Icon name="sign in"/>
                Ticket
              </Menu.Item>
              </Link>
            )}
            {isAdmin && ( // only admin can see admin tools
              <Link href="/adminTools" passHref>
                <Menu.Item>
                  <Icon name="sign in"/>
                  Admin Tools
                </Menu.Item>
              </Link>
            )}
            {isRoot && ( // only root can see game & staff management
              <>
                <Link href="/gameManag" passHref>
                  <Menu.Item>
                    <Icon name="sign in"/>
                    Game Management
                  </Menu.Item>
                </Link>
                <Link href="/staffManag" passHref>
                  <Menu.Item>
                    <Icon name="sign in"/>
                    Staff Management
                  </Menu.Item>
                </Link>
              </>
            )}
            <Link href="/" passHref>
              <Menu.Item>
                <Icon name="sign in"/>
                Logout
              </Menu.Item>
            </Link>
          </>)}
        </Container>
      </Menu>
    </>
  )
}
 
export default Header