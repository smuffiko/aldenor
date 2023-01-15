import React from "react"
import styles from "../../../styles/GameManag.Fields.module.css"
import MapField from "./MapField"
import cookies from "js-cookie"
import baseUrl from "../../../utils/baseUrl"

const Map = ({ mapRef }) => {
  const fieldsRef = React.useRef([])

  React.useEffect(()=>{
    const getFields = async() => {
      const url = `${baseUrl}/api/fields?map=true`
      const charToken = cookies.get("charId")
      await fetch(url,{
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "Authorization": charToken
        }
      }).then(async response => {
        if(!response.ok) {
          const er = await response.text()
          throw new Error(er)
        }
        return await response.json()      
      }).then(data => {
        fieldsRef.current = data
      }).catch(error => {
        console.log(error.message) // todo
      })
    }
    getFields()
  },[])

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
            fieldsRef={fieldsRef}
          />
        ))}
      </div>
    ))
  }

  return (
    <>
      <div className={styles.mapTable}>
        <div className={styles.mapWrapper}>
          {fieldsRef.current!==undefined && mapData()}
        </div>
      </div>
    </>
  )
}
 
export default Map