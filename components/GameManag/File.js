import React from "react"
import styles from "../../styles/GameManag.Fields.module.css"
import { Button, Image, Header, Modal, List, Icon } from "semantic-ui-react"
import cookie from "js-cookie"
import baseUrl from "../../utils/baseUrl"
import FieldUpdating from "./FieldUpdating"

const File = ({ setUpdating, file }) => {
  const [fields, setFields] = React.useState([
    {
      _id: null,
      imageSrc: file,
      rotation: 0,
      flip: false
    },
    {
      _id: null,
      imageSrc: file,
      rotation: 90,
      flip: false
    },
    {
      _id: null,
      imageSrc: file,
      rotation: 180,
      flip: false
    },
    {
      _id: null,
      imageSrc: file,
      rotation: 270,
      flip: false
    },
    {
      _id: null,
      imageSrc: file,
      rotation: 0,
      flip: true
    },
    {
      _id: null,
      imageSrc: file,
      rotation: 90,
      flip: true
    },
    {
      _id: null,
      imageSrc: file,
      rotation: 180,
      flip: true
    },
    {
      _id: null,
      imageSrc: file,
      rotation: 270,
      flip: true
    }
  ])
  const [fieldUpdating, setFieldUpdating] = React.useState(false)
  const [field, setField] = React.useState(null)
  const [loading, setLoading] = React.useState(true)
  
  React.useEffect(()=>{
    getFields()
  },[])

  const getFields = async() => {
    setLoading(true)
    const url = `${baseUrl}/api/field?imageSrc=${file}`
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
      setFields(fields.map(f=>{
        const isInDb = data.find(d=>{
          const isInDb = d.imageSrc === f.imageSrc && d.rotation === f.rotation && d.flip === f.flip
          return isInDb
        })
        return { ...f, _id: isInDb ? isInDb._id : null }
      }))
    }).catch(error => {
      console.log(error.message) // todo
    }).finally(()=>{
      setLoading(false)
    })
  }

  const addFieldToDb = async field => {
    const url = `${baseUrl}/api/field`
    const token = cookie.get("token")
    await fetch(url,{
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Authorization": token
      },
      body: JSON.stringify(field)
    }).then(async response => {
      if(!response.ok) {
        const er = await response.text()
        throw new Error(er)
      }
      return await response.json()      
    }).then(data => {
      getFields()
    }).catch(error => {
      console.log(error.message) // todo
    })
  }

  const removeFieldFromDb = async _id => {
    const url = `${baseUrl}/api/field?_id=${_id}`
    const token = cookie.get("token")
    await fetch(url,{
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        "Authorization": token
      }
    }).then(async response => {
      if(!response.ok) {
        const er = await response.text()
        throw new Error(er)
      }
      getFields()
    }).catch(error => {
      console.log(error.message) // todo
    })
  }

  const updateField = async field => {
    setFieldUpdating(true)
    setField(field)
  }

  const mapFields = () => fields.map(f=>
    <div key={JSON.stringify(f)} className={loading?"loading":""}>
      <Image
        className={`${styles[`rotate${f.rotation}${f.flip ? "flip" : ""}`]}`}
        src={file}
      />
      {
        f._id!==null ? ( // is in DB
          <>
            <Button.Group>
              <Modal
                closeIcon
                trigger={
                  <Button type="button" color="red" >
                    Delete from DB
                  </Button>
                }
                >
                <Modal.Header>
                  Are you sure?
                </Modal.Header>
                <Modal.Content>
                  <Image
                    className={`${styles[`rotate${f.rotation}${f.flip?`flip`:``}`]}`}
                    src={file}
                  />
                  <p>Do you want to delete this field from DB?</p>
                  <List>
                    <List.Item>Src: {f.imageSrc}</List.Item>
                    <List.Item>Flip: {f.flip ? "true" : "false"}</List.Item>
                    <List.Item>Rotation: {f.rotation}°</List.Item>
                  </List>
                </Modal.Content>                    
                <Modal.Actions>
                  <Button color="red" onClick={()=>removeFieldFromDb(f._id)}>
                    <Icon name="trash" /> Yes, delete it!
                  </Button>
                </Modal.Actions>
              </Modal>
              <Button.Or />
              <Button type="button" color="green" onClick={()=>updateField(f)}>
                Update
              </Button>
            </Button.Group>
          </>
        ) : ( // not in DB
          <>
            <Button
              type="button"
              inverted
              color="blue"
              onClick={()=>addFieldToDb(f)}
            >
              Add to DB
            </Button>
          </>
        )
      }
    </div>
  )

  return (
    <>
      { fieldUpdating ? (
          <>
            <FieldUpdating field={field} setFieldUpdating={setFieldUpdating} />
          </>
        ) : (
          <>
            <Button
              color='olive'
              icon='arrow left'
              label={{ basic: true, color: 'grey', pointing: 'left', content: "Back" }}
              onClick={()=>setUpdating(false)}
              type="button"
            />
            <Header>File {file}</Header>
            { mapFields() }
          </>
        )
      }
    </>
  )
}
 
export default File