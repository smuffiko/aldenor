import { Container, Message } from "semantic-ui-react"

const NotAuthorized = () => {
  return (<>
    <Container>
      <Message
        icon="x"
        error
        header="401 Error"
        content="You are not authorized to visit this page."
      />
    </Container>
  </>)
}
 
export default NotAuthorized