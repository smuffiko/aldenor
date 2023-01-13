import React from "react"
import styles from "../../styles/GameManag.Fields.module.css"
import GenerateMapField from "./GenerateMapField"

const GeneratedMap = ({ map, mapRef }) => {
  

  return (
    <>
      <div className={styles.mapTable}>
        <div className={styles.mapWrapper}>
        {mapRef.current.map((row, rowIndex) => (
          <div key={rowIndex} className={styles.mapRow}>
            {row.map((col, colIndex) => (
              <GenerateMapField field={col._id} key={colIndex}/>
            ))}
          </div>
        ))}
        </div>
      </div>
    </>
  )
}
 
export default GeneratedMap