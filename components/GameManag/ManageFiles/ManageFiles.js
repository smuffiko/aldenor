import React from "react"
import Fields from "./Fields"
import baseUrl from "../../../utils/baseUrl"
import styles from "../../../styles/GameManag.Fields.module.css"
import { Button, Header, Image } from "semantic-ui-react"
import cookie from "js-cookie"

const ManageFiles = ({ setUpdatingFiles, updatingFiles }) => {  
  const [files, setFiles] = React.useState([]) // git files
  const [fields, setFields] = React.useState([]) // DB 
  const [updating, setUpdating] = React.useState(false)
  const [file, setFile] = React.useState(null) // updating this file

  React.useEffect(()=>{
    searchFiles()
    if(!updating) setFile(null)
  },[updating])

  const searchFiles = async()=> {
    const charToken = cookie.get("charId")
    await fetch (`${baseUrl}/api/fields`,{
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "Authorization": charToken
      }
    }).then(async response => {
      if(!response.ok) {
        const er = await response.text()
        throw new Error(er)
      }
      return await response.json()      
    }).then(data => {
      setFiles(data.files)
      setFields(data.fields)
    }).catch(error => {
      console.log(error.message) // todo
    })
  }

  const searchNewFiles = async()=> {
    const charToken = cookie.get("charId")
    const dir = "img\\Map"
    await fetch (`${baseUrl}/api/files?dir=${dir}`,{
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "Authorization": charToken
      }
    }).then(async response => {
      if(!response.ok) {
        const er = await response.text()
        throw new Error(er)
      }
    }).catch(error => {
      console.log(error.message) // todo
    })
  }

  const updateField = src => {
    setUpdating(true)
    setFile(src)
  }

  const mapFiles = ()=> (
    <Image.Group>
    {files.map(file => 
      <Image
        className={fields.find(f=>file.slice(7)===f.imageSrc) ? styles.fieldSet : styles.fieldUnset }
        src={file.slice(7)}
        key={file}
        onClick={()=>updateField(file.slice(7))}
      />
    )}
    </Image.Group>
  )

  return (
    <>
      <>
      {updating ? (
        <>
          <Fields setUpdating={setUpdating} file={file} />
        </>
      ) : (
        <>
          {baseUrl==="http://localhost:3000" && (<Button content="Update files" onClick={()=>searchNewFiles()} />)}
          <Header>Files:</Header>
          { files && mapFiles() }
        </>
      )}
      </>
    </>
  )
}
 
export default ManageFiles