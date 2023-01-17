import React from "react"
import styles from "../../../styles/Game.MapBackground.module.css"
import { Image } from "semantic-ui-react"

const MapField = ({ map, x, y, character }) => {
  const [field, setField] = React.useState(map.coords.filter(f=>f.coords.x === x && f.coords.y === y))

  const handleClick = ()=>{
    console.log("clicked",field)
  }

  return (
    <>
      <div className={styles.mapCol} key={Math.random()} onClick={()=>handleClick()} >
        {field?.map((f,i)=>{
          return <Image key={i} style={{zIndex: f.layer, pointerEvents:"none"}} className={`${styles.mapField} ${f.imageSrc==="img\\Map\\border.png" ? styles.border : ""} ${styles[`rotate${f.rotation}${f.flip ? "flip" : ""}`]}`} src={f.imageSrc}></Image>
        })
        }
      </div>
    </>
  )
}
 
export default MapField