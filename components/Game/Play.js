import { Button, Icon } from "semantic-ui-react"
import { unsetCharToken } from "../../utils/character"

const Play = ({ character, setInGame }) => {
  const logoutChar = () => {
    setInGame(false)
    unsetCharToken()
  }
  return (
    <>
      <Button
        color='olive'
        icon='arrow left'
        label={{ basic: true, color: 'grey', pointing: 'left', content: 'Back' }}
        onClick={()=>logoutChar()}
        type="button"
      />
      You are playing with character: {character.name}
    </>)
}
 
export default Play