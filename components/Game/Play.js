import { Button } from "semantic-ui-react"
import { unsetCharToken } from "../../utils/character"
import DeleteCharacter from "./DeleteCharacter"

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
      <DeleteCharacter setInGame={setInGame} />
      You are playing with character: {character.name}
    </>)
}
 
export default Play