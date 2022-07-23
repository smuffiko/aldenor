import { Menu, Container } from "semantic-ui-react"

const Header = () => {
  return (
    <>
      <Menu
        color="black"
        inverted
      >
        <Container>
          <Menu.Item
            name='home'
          />
          <Menu.Item
            name='messages'
          />
          <Menu.Item
            name='friends'
          />
        </Container>
      </Menu>
    </>
  )
}
 
export default Header