import React from "react"
import { Image, Popup } from "semantic-ui-react"
import styles from "../../../styles/GameManag.Fields.module.css"

const PaletteField = ({ field, selected, handleClick }) => {
  return (
    <>
      {field && (
        <Popup
          content={
            <>
              <div>{field.imageSrc}</div>
              {field.flip ? <div>Flipped</div> : ""}
              <div>rotate {field.rotation}°</div>
              <Image
                className={`${styles[`rotate${field.rotation}${field.flip ? "flip" : ""}`]}`}
                src={field.imageSrc}
                size="big"
                style={{imageRendering:"pixelated"}}
              />
            </>
          }
          trigger={
            <Image
            src={field.imageSrc}
              className={`${styles[`rotate${field.rotation}${field.flip ? "flip" : ""}`]} ${styles.generatedField} ${selected===field._id ? styles.selected : ""}`}
              key={field.imageSrc}
              onClick={()=>handleClick(field._id)}
              style={{imageRendering:"pixelated"}}
            />
          }
        />
      )}
    </>
  )
}
 
export default PaletteField