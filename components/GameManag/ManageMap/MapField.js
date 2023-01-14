import React from "react"
import styles from "../../../styles/GameManag.Fields.module.css"
import { Image } from "semantic-ui-react"
import baseUrl from "../../../utils/baseUrl"
import cookies from "js-cookie"

const MapField = ({ col, mapRef, colIndex, rowIndex }) => {
  const [field, setField] = React.useState(col.field)
  const handleClick = async ()=> {
    const url = `${baseUrl}/api/map`
    const charToken = cookies.get("charId")
    const newField = cookies.get("selected")
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
      //update the field in the mapRef only
      mapRef.current.coords[rowIndex].fields[colIndex].field = data
      setField(data)
    }).catch(error=>console.log(error.message)) 
  }

  return (
    <>
      <div className={styles.mapCol} key={Math.random()} onClick={()=>handleClick()}>
        <Image className={`${styles.mapField} ${field.imageSrc==="img\\Map\\border.png" ? styles.border : ""} ${styles[`rotate${field.rotation}${field.flip ? "flip" : ""}`]}`} src={field.imageSrc} />
      </div>
    </>
  )
}
 
export default MapField