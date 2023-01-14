import React from "react"
import styles from "../../../styles/GameManag.Fields.module.css"
import MapField from "./MapField"

const Map = ({ mapRef }) => {
  const mapData = () => {
    return mapRef.current.coords.map((row, rowIndex) =>(
      <div key={rowIndex} className={styles.mapRow}>
        {row.fields.map((col, colIndex) => (
          <MapField
            key={colIndex}
            col={col}
            colIndex={colIndex}
            rowIndex={rowIndex}
            mapRef={mapRef}
          />
        ))}
      </div>
    ))
  }

  return (
    <>
      <div className={styles.mapTable}>
        <div className={styles.mapWrapper}>
          {mapData()}
        </div>
      </div>
    </>
  )
}
 
export default Map