import cookies from "js-cookie"
import React from "react"
import { Input, Button } from "semantic-ui-react"
import baseUrl from "../../utils/baseUrl"

const GenerateMapInputs = ({ setLoading, setMap }) => {
  const [x, setX] = React.useState(10)
  const [y, setY] = React.useState(10)
  const [name, setName] = React.useState("")

  const generateNewMap = async (e) => {
    e.preventDefault()
    if(x>4 && y>4) {
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
        }).catch(error=>console.log(error.message)) // todo
      }).catch(error=>console.log(error.message) // todo
      ).finally(()=>{
        setLoading(false)
      })
    } else {
      console.log("no")
    }
  }

  const handleChangeY = event => {
    event.preventDefault()
    setY(event.target.value)
  }
  const handleChangeX = event => {
    event.preventDefault()
    setX(event.target.value)
  }
  const handleChangeName = event => {
    event.preventDefault()
    setName(event.target.value)
  }
  return (
    <>
      <Input type="number" style={{width:"7rem",margin:"0 5rem 0 0"}} value={y} onChange={handleChangeY} min={5} label="Cols"/>
      <Input type="number" style={{width:"7rem",margin:"0 5rem 0 0"}} value={x} onChange={handleChangeX} min={5} label="Rows"/>
      <Input style={{width:"10rem",margin:"0 8rem 0 0"}} value={name} onChange={handleChangeName} label="Map name"/>
      <Button onClick={generateNewMap} content="Generate new map" type="button"/>
    </>
  )
}

export default GenerateMapInputs