import React from "react"
import styles from "../../styles/GameManag.Fields.module.css"
import { Image } from "semantic-ui-react"
import baseUrl from "../../utils/baseUrl"
import cookies from "js-cookie"

const GenerateMapField = ({ col, newField, mapRef, colIndex, rowIndex }) => {
  const [field, setField] = React.useState(col.field)
  console.log("rendering .... ")

  const handleClick = async ()=> {
    const url = `${baseUrl}/api/map`
    const charToken = cookies.get("charId")
    const payload = {
      newField,
      oldField: col
    }
    await fetch(url, {
      method: "PUT",
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
    }).then(data => {
      mapRef.current.coords[colIndex].fields[rowIndex].field = data
      setField(data)
    }).catch(error=>console.log(error.message)) // todo? idk
  }

  return (
    <>
      <div className={styles.mapCol} key={Math.random()} onClick={()=>handleClick()}>
        <Image className={`${styles.mapField} ${field.imageSrc==="img\\Map\\border.png" ? styles.border : ""} ${styles[`rotate${field.rotation}${field.flip ? "flip" : ""}`]}`} src={field.imageSrc} />
      </div>
    </>
  )
}
 
export default GenerateMapField