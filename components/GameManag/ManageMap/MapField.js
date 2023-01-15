import React from "react"
import styles from "../../../styles/GameManag.Fields.module.css"
import { Image } from "semantic-ui-react"
import cookies from "js-cookie"

const MapField = ({ col, fieldsRef, mapRef, colIndex, rowIndex }) => {
  const [field, setField] = React.useState(col.field)
  const handleClick = async ()=> {
    const newField = cookies.get("selected")
    const f = fieldsRef.current.find((i)=>i._id === newField)
    mapRef.current.coords[rowIndex].fields[colIndex].field = f
    setField(f)
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