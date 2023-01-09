import Link from "next/link"
import { Container, List, Icon } from "semantic-ui-react"

const Footer = () => {
  return (
    <Container textAlign="center">
      <List horizontal divided link size="small">
        <List.Item>
          <Link href='/contact'>
            Contact
          </Link>
        </List.Item>
        <List.Item>
          <Link href='/terms'>
            Terms
          </Link>
        </List.Item>
        <List.Item>
          <Link href='/privacy'>
            Privacy
          </Link>
        </List.Item>
        <List.Item>
          <Icon name="github"/>
          <Link href="https://github.com/smuffiko">smuffiko</Link>
        </List.Item>
      </List>
  </Container>
  )
}
 
export default Footer