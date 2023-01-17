import cookies from "js-cookie"
import React from "react"
import { Input, Button, Message } from "semantic-ui-react"
import baseUrl from "../../../utils/baseUrl"

const CreateMap = ({ setLoading, setMap }) => {
  const [x, setX] = React.useState(50)
  const [y, setY] = React.useState(50)
  const [name, setName] = React.useState("")
  const [error, setError] = React.useState("")
  const [disabled, setDisabled] = React.useState(true)

  React.useEffect(()=>{
    if(Boolean(name) && name.match(/^ *$/) === null) setDisabled(false)
    else setDisabled(true)
  },[name])

  const generateNewMap = async (e) => {
    e.preventDefault()
    setError("")
    if(x>=1 && y>=1 && x<=100 && y<=100) {
      setLoading(true)
      const charToken = cookies.get("charId")
      const url = `${baseUrl}/api/map`
      const payload = {
        name,
        x,
        y
      }
      await fetch(url,{
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "Authorization": charToken
        },
        body: JSON.stringify(payload)
      }).then(async response => {
        if(!response.ok) {
          const er = await response.text()
          throw new Error(er)
        }
        return await response.json()
      }).then(map=>{
        setMap(map)
      }).catch(error=>setError(error.message) // todo ?
      ).finally(()=>{
        setLoading(false)
      })
    } else {
      setError("Min: 1x1, Max: 100x100")
    }
  }

  const handleChangeY = event => {
    event.preventDefault()
    const { value } = event.target
    if(value<1) {
      setY(1)
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
    if(value<1) {
      setX(1)
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
      <Input type="number" style={{width:"7rem",margin:"0 5rem 0 0"}} value={y} onChange={handleChangeY} min={1} max={100} label="Cols"/>
      <Input type="number" style={{width:"7rem",margin:"0 5rem 0 0"}} value={x} onChange={handleChangeX} min={1} max={100} label="Rows"/>
      <Input style={{width:"10rem",margin:"0 8rem 0 0"}} value={name} onChange={handleChangeName} label="Map name"/>
      <Button onClick={generateNewMap} disabled={disabled} content="Generate new map" type="button"/>
    </>
  )
}
 
export default CreateMap