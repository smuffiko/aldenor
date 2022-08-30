import React from "react"
import cookie from "js-cookie"
import Characters from "../components/Game/Characters"
import CreateCharacter from "../components/Game/CreateCharacter"
import Play from "../components/Game/Play"
import baseUrl from "../utils/baseUrl"

const Game = () => {
  const [inGame, setInGame] = React.useState(false)
  const [character, setCharacter] = React.useState(null)
  const [slot, setSlot] = React.useState(null)
  const [play, setPlay] = React.useState(null)
  const [error, setError] = React.useState("")

  React.useEffect(async ()=> {
    if(character) {
      await setGame(character)
      setInGame(true)
      setSlot(null)
    }
  },[character])

  const setGame = async (char) => {
    setError("")
    const url = `${baseUrl}/api/character?_id=${char.character._id}`
    const token = cookie.get("token")
    await fetch(url,{
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "Authorization": token
      }
    }).then(async response => {
      if(!response.ok) {
        const er = await response.text()
        throw new Error(er)
      }
      return await response.json()      
    }).then(data => {
      setPlay(data)
    }).catch(error => {
      setError(error.message)
      // todo show error
    })
  }

  return (
    <>
    {inGame ? (
      <Play character={play} />
    ) : (
      <>
        {(slot>0 && slot<=5) ? (
          <CreateCharacter slot={slot} setSlot={setSlot} setChar={setCharacter} />
          ):(
          <Characters setSlot={setSlot} setChar={setCharacter} />  
        )}
      </>
    )}
    </>
  )
}
 
export default Game