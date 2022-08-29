import React from "react"
import Characters from "../components/Game/Characters"

const Game = ({ user }) => {
  const [inGame, setInGame] = React.useState(false)
  const [character, setCharacter] = React.useState()

  return (
    <>
    {inGame ? (
      <>
        you are in game with character {character}
      </>
    ) : (
      <>
        <Characters user={user} setCharacter={setCharacter} />
      </>
    )}
    </>
  )
}
 
export default Game