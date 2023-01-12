import React from "react"
import styles from "../../styles/GameManag.Fields.module.css"
import MapField from "./MapField"

const GeneratedMap = ({ map }) => {
  return (
    <>
      <div className={styles.mapTable}>
        <div className={styles.mapWrapper}>
        {
          map?.coords?.map((field,i) => {
            return (
              <div className={styles.mapRow} key={Math.random()}>
                {
                  field.map((f,j) => 
                    <MapField field={f._id } key={j}/>
                  )
                }
                <div className={styles.wrap}></div>
              </div>
            )
          })
        }
        </div>
      </div>
    </>
  )
}
 
export default GeneratedMap