import React from "react"
import styles from "../../styles/GameManag.Fields.module.css"
import { Image } from "semantic-ui-react"

const GenerateMapField = ({ field }) => {
  return (
    <>
      <div className={styles.mapCol} key={Math.random()}>
        <Image className={`${styles.mapField} ${field.imageSrc==="img\\Map\\border.png" ? styles.border : ""} ${styles[`rotate${field.rotation}${field.flip ? "flip" : ""}`]}`} src={field.imageSrc} />
      </div>
    </>
  )
}
 
export default GenerateMapField