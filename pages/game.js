import React from "react"
import Characters from "../components/Game/Characters"
import CreateCharacter from "../components/Game/CreateCharacter"

const Game = ({ user }) => {
  const [inGame, setInGame] = React.useState(false)
  const [character, setCharacter] = React.useState(null)

  return (
    <>
    {inGame ? (
      <>
        you are in game with character {character}
      </>
    ) : (
      <>
        {(character>0 && character<=5) ? (
          <CreateCharacter slot={character} setChar={setCharacter} setInGame={setInGame}/>
          ):(
          <Characters user={user} setCharacter={setCharacter} />  
        )}
      </>
    )}
    </>
  )
}
 
export default Game