import React from "react"
import { Image, Icon } from "semantic-ui-react"
import styles from "../../../styles/GameManag.Fields.module.css"

const PaletteField = ({ field, selected, handleClick }) => {
  return (
    <>
      {field && (
        <Image
          src={field.imageSrc}
          className={`${styles[`rotate${field.rotation}${field.flip ? "flip" : ""}`]} ${styles.generatedField} ${selected===field._id ? styles.selected : ""}`}
          key={field.imageSrc}
          onClick={()=>handleClick(field._id)}
        />
      )}
    </>
  )
}
 
export default PaletteField