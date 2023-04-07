import React from "react"
import { Form, Button, Header, Dropdown, Icon, Transition } from "semantic-ui-react"
import baseUrl from "../../../utils/baseUrl"
import cookies from "js-cookie"
import mongoose from "mongoose"
import AldenorMessage from "../../_App/AldenorUIComponents/AldenorMessage"
const { ObjectId } = mongoose.Types

const UpdatePoi = ({ poi, setUpdatePoi }) => {
  const [name, setName] = React.useState(poi.name)
  const [fields, setFields] = React.useState([])
  const [currentFields, setCurrentFields] = React.useState(poi.fields.map(f=>f._id))
  const [currentJobs, setCurrentJobs] = React.useState([])
  const [disabled, setDiasabled] = React.useState(true)
  const [saved, setSaved] = React.useState(false)

  React.useEffect(()=>{
    getFields()
  },[])

  React.useEffect(()=>{
    setDiasabled(name.trim().length==0)
  },[name, currentFields])

  const getFields = async () => {
    const url = `${baseUrl}/api/pois?map=${poi.mapId}`
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
      const newFields = data.map(f=>({key: f._id, value: f._id, text: `[${f.coords.x},${f.coords.y},${f.layer}]`}))
      setFields(newFields.concat(poi.fields.map(f=>({key: f._id, value: f._id, text: `[${f.coords.x},${f.coords.y},${f.layer}]`}))))
    }).catch(error => {
      console.log(error.mesage) // todo
    })

  }

  const handleChange = async event => {
    setName(event.target.value)
  }
  
  const handleChangeField = async (e, data)=>{
    setCurrentFields(data.value)
  }

  const handleSubmit = async () => {
    const url = `${baseUrl}/api/pois`
    const token = cookies.get("charId")
    const payload = {
      _id: poi._id,
      fields: currentFields.map(f=>({field: new ObjectId(f) })),
      name: name,
      jobs: currentJobs
    }
    await fetch(url,{
      method: "PUT",
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
      return await response.json()      
    }).then((data) => {
      setUpdatePoi(data.poi)
      setSaved(true)
      setTimeout(()=>setSaved(false), 3000)
    }).catch(error => {
      console.log(error.message) // todo
    })
  }

  return (
    <>
     <Button
        color='red'
        icon='arrow left'
        label={{ basic: true, color: 'grey', pointing: false , content: 'Back - Discard changes' }}
        onClick={()=> {
          setUpdatePoi(false)
        }}
        type="button"
      />
      <Header>Update POI {poi.name} </Header>
      <Form className="update-poi-form" onSubmit={handleSubmit}>
        <Form.Input
          label="POI Name"
          name="name"
          value={name}
          onChange={handleChange}
        />
        <Form.Field>
          <label>Fields</label>
          <Dropdown multiple selection options={fields} onChange={handleChangeField} value={currentFields} />
        </Form.Field>
        <Form.Field>
          <Button type="submit" disabled={disabled}>Update POI</Button>
          <Transition visible={saved} animation="fade" duration={500}>
            <AldenorMessage box="green">
              <Header><Icon name='check'/>Saved</Header>
            </AldenorMessage>
          </Transition>
        </Form.Field>
      </Form>
    </>
  )
}
 
export default UpdatePoi