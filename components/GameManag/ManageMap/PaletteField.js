import React from "react"
import { Image, Popup } from "semantic-ui-react"

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
                className={`rotate-${field.rotation}${field.flip ? "-flip" : ""}`}
                src={field.imageSrc}
                size="big"
                alt={field.imageSrc}
              />
            </>
          }
          trigger={
            <Image
              src={field.imageSrc}
              className={`rotate-${field.rotation}${field.flip ? "-flip" : ""} field ${selected===field._id ? "selected" : ""}`}
              key={field.imageSrc}
              onClick={()=>handleClick(field._id)}
              alt={field.imageSrc}
            />
          }
        />
      )}
    </>
  )
}
 
export default PaletteField