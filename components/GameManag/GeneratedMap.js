import React from "react"
import styles from "../../styles/GameManag.Fields.module.css"
import GenerateMapField from "./GenerateMapField"

const GeneratedMap = ({ mapRef, newField }) => {
  return (
    <>
      <div className={styles.mapTable}>
        <div className={styles.mapWrapper}>
        {mapRef.current.coords.map((row, rowIndex) =>(
          <div key={rowIndex} className={styles.mapRow}>
            {row.fields.map((col, colIndex) => (
              <GenerateMapField
                newField={newField}
                col={col}
                colIndex={colIndex}
                rowIndex={rowIndex}
                key={colIndex}
                mapRef={mapRef}
              />
            ))}
          </div>
        ))}
        </div>
      </div>
    </>
  )
}
 
export default GeneratedMap