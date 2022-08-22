import { Container, Message } from "semantic-ui-react"

const NotFound = () => {
  return (<>
    <Container>
      <Message
        icon="x"
        error
        header="400"
        content="Sorry, your device is not currently supported."
      />
    </Container>
  </>)
}
 
export default NotFound