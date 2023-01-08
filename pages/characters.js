import React from "react"
import Router from "next/router"
import cookie from "js-cookie"
import Characters from "../components/Game/Characters"
import CreateCharacter from "../components/Game/CreateCharacter"
import baseUrl from "../utils/baseUrl"
import { setCharToken, unsetCharToken } from "../utils/character"

const Game = () => {
  const [character, setCharacter] = React.useState(null)
  const [slot, setSlot] = React.useState(null)
  const [error, setError] = React.useState("")

  React.useEffect(()=>{
    const charToken = cookie.get("charId")
    if(charToken) {
      unsetCharToken()
    }
  },[])

  React.useEffect(async ()=> {
    if(character) {
      await setGame(character)
      setSlot(null)
    }
  },[character])

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
      Router.push("/game")
    }).catch(error => {
      setError(error.message)
      // todo show error
    })
  }

  return (
    <>
      {(slot>0) ? (
        <CreateCharacter slot={slot} setSlot={setSlot} setChar={setCharacter} />
        ):(
        <Characters setSlot={setSlot} setChar={setCharacter} />  
      )}
    </>
  )
}
 
export default Game