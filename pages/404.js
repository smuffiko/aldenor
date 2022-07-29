import { Container, Message } from "semantic-ui-react"

const NotFound = () => {
  return (<>
    <Container>
      <Message
        icon="x"
        error
        header="404"
        content="Page not found"
      />
    </Container>
  </>)
}
 
export default NotFound