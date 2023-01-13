import React from "react"
import cookies from "js-cookie"
import { Button, Icon, Modal, Header } from "semantic-ui-react"
import baseUrl from "../../utils/baseUrl"
import { unsetCharToken } from "../../utils/character"

const DeleteCharacter = ({setInGame}) => {
  const [open, setOpen] = React.useState(false)

  const killCharacter = async () => {
    const charToken = cookies.get("charId")
    const url = `${baseUrl}/api/character?charToken=${charToken}`
    const token = cookies.get("token")
    await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        "Authorization": token
      }
    }).then(response => {
      if(response.ok) {
        // delete character token
        unsetCharToken()
        // return back to characters list
        setInGame(false)
      }
    })
  }

  return (
    <>

      <Modal
        basic
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        size='small'
        trigger={
          <Button icon labelPosition="left" color="red">
            <Icon name="trash" />
            Kill
          </Button>
        }
      >
        <Header icon>
          <Icon name="trash" />
          Kill character
        </Header>
        <Modal.Content>
          <p style={{textAlign:"center"}}>
            Do you want to kill your character? You can revieve it later for Coins.
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button basic color="yellow" inverted onClick={() => setOpen(false)}>
            <Icon name="arrow left" /> No, let it be alive
          </Button>
          <Button color="red" inverted onClick={() => killCharacter()}>
            <Icon name="trash" /> Yes, kill it!
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  )
}
 
export default DeleteCharacter