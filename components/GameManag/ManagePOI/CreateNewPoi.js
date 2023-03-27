import React from "react"
import { Button, Dropdown, Form } from "semantic-ui-react"
import baseUrl from "../../../utils/baseUrl"
import cookies from "js-cookie"

const CreateNewPoi = ({ getPoiList }) => {
  // { key: 'x', text: 'y', value: 'z' }
  const [maps, setMaps] = React.useState([])
  const [fields, setFields] = React.useState([])
  const [jobs, setJobs] = React.useState([])
  const [currentMap, setCurrentMap] = React.useState("")
  const [currentFields, setCurrentFields] = React.useState([])
  const [currentJobs, setCurrentJobs] = React.useState([])
  const [disabled, setDisabled] = React.useState(true)
  const [name, setName] = React.useState("")

  React.useEffect(()=>{
    getMaps()
    getJobs()
  },[])

  React.useEffect(()=>{ // every change map update its fields
    setFields([])
    if (maps.length!==0) getFields()
  },[currentMap])

  React.useEffect(()=>{
    // I need to check name, fields
    // I don't need to check map and jobs = I need to set map to set fields, so it is not possible to have fields but not map. Jobs can be empty array.
    name.length === 0 ? setDisabled(true) : currentFields.length === 0 ? setDisabled(true) : setDisabled(false)
  },[currentFields, name])

  const getMaps = async () => {
    const url = `${baseUrl}/api/maps`
    const token = cookies.get("charId")
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
      setMaps(data.map(m=>({key: m._id, value: m._id, text: m.name})))
    }).catch(error => {
      console.log(error.mesage) // todo
    })
  }

  const getFields = async () => {
    const url = `${baseUrl}/api/pois?map=${currentMap}`
    const token = cookies.get("charId")
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
      setFields(data.map(f=>({key: f._id, value: f._id, text: `[${f.coords.x},${f.coords.y},${f.layer}]`})))
    }).catch(error => {
      console.log(error.mesage) // todo
    })
  }

  const getJobs = async () => {
    // todo
  }

  const handleChangeMap = async (e, data)=>{
    setCurrentMap(data.value)
    setCurrentFields([])
  }

  const handleChangeField = async (e, data)=>{
    setCurrentFields(data.value)
  }

  const handleSubmit = async ()=>{
    const url = `${baseUrl}/api/pois`
    const token = cookies.get("charId")
    const payload = {
      fields: currentFields,
      name: name,
      jobs: currentJobs
    }
    await fetch(url,{
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Authorization": token
      },
      body: JSON.stringify(payload)
    }).then(async response => {
      if(!response.ok) {
        const er = await response.text()
        throw new Error(er)
      }
      return await response.text()      
    }).then(() => {
      setCurrentFields([])
      setName("")
      getFields()
      getPoiList()
    }).catch(error => {
      console.log(error.message) // todo
    })
  }

  return (
    <>
      <h2>Create new POI</h2>
      <p>Players can see POI name. It should be unique, but it doesn't need to be unique.</p>
      <p>Fields coords: [x, y, layer]</p>
      <Form className="create-poi-form" onSubmit={handleSubmit}>
        <Form.Input
          label="POI name"
          type="text"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />
        <Form.Field>
          <label>Map</label>
        <Dropdown selection options={maps} onChange={handleChangeMap} value={currentMap}/>
        </Form.Field>
        <Form.Field>
          <label>Fields</label>
          <Dropdown multiple selection options={fields} onChange={handleChangeField} value={currentFields} />
        </Form.Field>
        <Form.Field>
          <label>Jobs</label>
          <Dropdown multiple selection options={jobs}/>
        </Form.Field>
        <Form.Field>
          <Button type="submit" disabled={disabled}>Create POI</Button>
        </Form.Field>
      </Form>
    </>
  )
}
 
export default CreateNewPoi