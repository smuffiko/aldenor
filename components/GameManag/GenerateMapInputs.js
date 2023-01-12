import cookies from "js-cookie"
import React from "react"
import { Input, Button, Message } from "semantic-ui-react"
import baseUrl from "../../utils/baseUrl"

const GenerateMapInputs = ({ setLoading, setMap }) => {
  const [x, setX] = React.useState(10)
  const [y, setY] = React.useState(10)
  const [name, setName] = React.useState("")
  const [error, setError] = React.useState("")

  const generateNewMap = async (e) => {
    e.preventDefault()
    setError("")
    if(x>=5 && y>=5 && x<=100 && y<=100) {
      setLoading(true)
      const url = `${baseUrl}/api/map?border=true`
      await fetch(url,{
        method: "GET",
        headers: {
          "Content-type": "application/json"
        }
      }).then(async response => {
        if(!response.ok) {
          const er = await response.text()
          throw new Error(er)
        }
        return await response.json()
      }).then(border => {
        const newMap = new Array( y )
        for(var i = 0; i < y; i++) {
          newMap[i] = new Array( x )
          for(var j = 0; j < x; j++) {
            newMap[i][j] = border
          }
        }
        return newMap
      }).then(async map=>{
        const charToken = cookies.get("charId")
        const url = `${baseUrl}/api/map`
        await fetch(url,{
          method: "POST",
          headers: {
            "Content-type": "application/json",
            "Authorization": charToken
          },
          body: JSON.stringify({map, name})
        }).then(async response => {
          if(!response.ok) {
            const er = await response.text()
            throw new Error(er)
          }
          return await response.json()
        }).then(map=>{
          setMap(map)
        }).catch(error=>setError(error.message)) 
      }).catch(error=>setError(error.message) // todo ?
      ).finally(()=>{
        setLoading(false)
      })
    } else {
      setError("Min: 5x5, Max: 100x100")
    }
  }

  const handleChangeY = event => {
    event.preventDefault()
    const { value } = event.target
    if(value<5) {
      setY(5)
      return
    }
    if(value>100) {
      setY(100)
      return
    }
    setY(value)
  }
  const handleChangeX = event => {
    event.preventDefault()
    const { value } = event.target
    if(value<5) {
      setX(5)
      return
    }
    if(value>100) {
      setX(100)
      return
    }
    setX(value)
  }
  const handleChangeName = event => {
    event.preventDefault()
    setName(event.target.value)
  }
  return (
    <>
      { error && 
        <Message
          icon="x"
          error
          header="Oops!"
          content={error}
        />
      }
      <Input type="number" style={{width:"7rem",margin:"0 5rem 0 0"}} value={y} onChange={handleChangeY} min={5} max={100} label="Cols"/>
      <Input type="number" style={{width:"7rem",margin:"0 5rem 0 0"}} value={x} onChange={handleChangeX} min={5} max={100} label="Rows"/>
      <Input style={{width:"10rem",margin:"0 8rem 0 0"}} value={name} onChange={handleChangeName} label="Map name"/>
      <Button onClick={generateNewMap} content="Generate new map" type="button"/>
    </>
  )
}

export default GenerateMapInputs