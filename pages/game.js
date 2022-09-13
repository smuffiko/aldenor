import React from "react"
import cookie from "js-cookie"
import Characters from "../components/Game/Characters"
import CreateCharacter from "../components/Game/CreateCharacter"
import Play from "../components/Game/Play"
import baseUrl from "../utils/baseUrl"
import { setCharToken, unsetCharToken } from "../utils/character"
import { Message } from "semantic-ui-react"

const Game = () => {
  const [inGame, setInGame] = React.useState(false)
  const [character, setCharacter] = React.useState(null)
  const [firstRound, setFirstRound] = React.useState(true)
  const [slot, setSlot] = React.useState(null)
  const [play, setPlay] = React.useState(null)
  const [error, setError] = React.useState("")

  React.useEffect(async ()=>{
    const charToken = cookie.get("charId")
    if(charToken) {
      setError("")
      const url = `${baseUrl}/api/character?charToken=${charToken}`
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
      }).then(async data => {
        await setGame(data.character)
        .then(()=>setInGame(true))
      }).catch(error => {
        setError(error.message)
      })
    }
    if(firstRound) setFirstRound(!firstRound)
  },[])

  React.useEffect(async ()=> {
    if(character) {
      await setGame(character)
      setInGame(true)
      setSlot(null)
    }
  },[character])

  React.useEffect(()=>{
    if(!inGame) setCharacter(null)
  },[inGame])

  const setGame = async (char) => {
    setError("")
    const url = `${baseUrl}/api/character?_id=${char._id}`
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
      setCharToken(data.charToken)
      setPlay(data.character)
    }).catch(error => {
      setError(error.message)
      // todo show error
    })
  }

  return (
    <>
    {!firstRound && (
      <>
        <Message 
          error
          hidden={!error}
          content={error}
        />
        {inGame ? (
          <Play character={play} setInGame={setInGame} />
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
    )}
    </>
  )
}
 
export default Game